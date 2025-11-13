import { replyTemplates } from "../templates/replyTemplates.js";

export async function generateReply(name, text) {
  const lower = (text || '').toLowerCase();

  // Intent shortcuts
  if (/price|cost|how much|rate/.test(lower)) {
    return replyTemplates.pricing(name);
  }
  if (/hour|open|when do you|business hours/.test(lower)) {
    return replyTemplates.hours(name);
  }
  if (/location|where|address|zip|zip code/.test(lower)) {
    return replyTemplates.location(name);
  }
  if (/book|reserve|appointment|schedule/.test(lower)) {
    return replyTemplates.booking(name);
  }
  if (/clean|detail|interior|exterior|full detail/.test(lower)) {
    return replyTemplates.services(name);
  }

  // Fallback - template
  return replyTemplates.default(name);
}
