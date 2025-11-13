# Proximo Detail AI Agent

This project implements a free-first AI agent that replies to Yelp messages forwarded to your business email.
It uses Pipedream (Gmail watcher) -> Vercel-hosted Node.js webhook -> SendGrid for outgoing mail -> Supabase for logging.

## What’s included
- Auto-reply + escalation via SendGrid
- Supabase logging (messages table)
- Pipedream integration guide
- Ready to deploy on Vercel

## Quick start
1. Create a Supabase project (free) and create a `messages` table with columns:
   - id (uuid, default: uuid_generate_v4())
   - name (text)
   - email (text)
   - message (text)
   - reply (text)
   - sentiment (text)
   - created_at (timestamp with time zone, default: now())

2. Create accounts & keys:
   - SendGrid (verify sender)
   - Vercel (to deploy)
   - Pipedream (to forward Gmail -> webhook)

3. Set environment variables in Vercel (see .env.example).

4. Deploy to Vercel (import this repo) and configure Pipedream to POST to:
   `https://<YOUR-VERCEL-URL>/webhook/message`

## Pipedream recipe
See pipedream/README-PIPEDREAM.md for step-by-step.

## Notes
- LLM integration is optional; keep `LLM_ENDPOINT` blank to use built-in templates.
- Supabase service role key has elevated privileges; keep it secret.
