Pipedream (Gmail -> webhook) quick guide:

1. Create a Pipedream account.
2. New Workflow -> Trigger: Gmail -> New Email
   - Connect the Gmail account that receives Yelp forwarded messages.
3. Add a Filter step: if subject contains 'Yelp' or the email body contains 'New message from Yelp'.
4. Add an HTTP Request action:
   - Method: POST
   - URL: https://<YOUR-VERCEL-URL>/webhook/message
   - JSON body:
     {
       "fromName": "{{steps.trigger.event.headers.from}}",
       "fromEmail": "{{steps.trigger.event.headers.reply-to}}",
       "text": "{{steps.trigger.event.text}}",
       "source": "Yelp"
     }
5. Save & deploy the workflow.
6. Test by forwarding a Yelp message to the Gmail account.
