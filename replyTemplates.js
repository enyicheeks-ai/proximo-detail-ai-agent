export const replyTemplates = {
  greeting: (name) => `Hi ${name}, thanks for contacting Proximo Detail! How can we make your vehicle shine today?`,
  pricing: (name) => `Hi ${name}, our detailing services start at $75 for Exterior Detail and $120 for Full Detail (interior + exterior). Would you like me to check availability for a date?`,
  hours: (name) => `Hi ${name}, Proximo Detail is open Monday–Saturday 9:00 AM – 6:00 PM. We also offer mobile detailing appointments!`,
  location: (name) => `Hi ${name}, we're based in Houston, TX (serving 77063 and nearby). We offer mobile service within ~15 miles. Want us to check availability for your ZIP?`,
  booking: (name) => `Hi ${name}, great — I can reserve that for you. What date/time works best and do you prefer pickup or mobile service?`,
  services: (name) => `Hi ${name}, we offer exterior, interior, and full details, plus add-ons (headlight restoration, engine bay, odor removal). Which service are you interested in?`,
  complaint: (name) => `Hi ${name}, I'm sorry to hear that. I've flagged this for our manager and we'll follow up shortly to make it right.`,
  default: (name) => `Hi ${name}, thanks for reaching out to Proximo Detail! Could you tell me which service you're interested in (exterior, interior, or full detail) and what date you had in mind?`
};
