import express from "express";
import bodyParser from "body-parser";
import sendgrid from "@sendgrid/mail";
import { generateReply } from "./ai/response.js";
import { saveMessage } from "./db/helpers.js";
import { validateEmail } from "./utils/email.js";

const app = express();
app.use(bodyParser.json());

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/webhook/message', async (req, res) => {
  try {
    // expected body: { fromName, fromEmail, text, source }
    const { fromName = '', fromEmail = '', text = '', source = 'email' } = req.body;

    if (!fromEmail || !text) {
      return res.status(400).json({ error: 'Missing required fields: fromEmail and text' });
    }
    if (!validateEmail(fromEmail)) {
      return res.status(400).json({ error: 'Invalid fromEmail' });
    }

    // generate reply
    const reply = await generateReply(fromName || 'there', text);

    // log to Supabase (best-effort, don't fail on logging)
    try {
      await saveMessage({ name: fromName, email: fromEmail, message: text, reply });
    } catch (err) {
      console.warn('Supabase logging failed (continuing):', err.message || err);
    }

    // send reply via SendGrid
    await sendgrid.send({
      to: fromEmail,
      from: process.env.BUSINESS_EMAIL,
      subject: `Re: Your message to Proximo Detail`,
      text: reply
    });

    // escalation for sensitive words
    const escPattern = /refund|sue|lawsuit|injury|danger|complain|angry|not satisfied/i;
    if (escPattern.test(text)) {
      try {
        await sendgrid.send({
          to: process.env.OWNER_EMAIL,
          from: process.env.BUSINESS_EMAIL,
          subject: `⚠️ Escalation - message from ${fromName || fromEmail}`,
          text: `Customer: ${fromName} <${fromEmail}>\n\nMessage:\n${text}\n\nAuto-reply:\n${reply}`
        });
      } catch (err) {
        console.warn('Escalation email failed:', err.message || err);
      }
    }

    return res.json({ ok: true, reply });
  } catch (err) {
    console.error('/webhook/message error', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Proximo Detail AI Agent is live.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
