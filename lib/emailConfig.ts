// EmailJS Configuration for Fleur de Liza
// Set up EmailJS at https://www.emailjs.com/ to send emails to info@fleurdeliza.ch

export const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_ad3416j",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_4k0zxy8",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "KGDxh_FKuPDkLCF1W",
};

// Instructions for Fleur de Liza setup:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an email service:
//    - Option A: Gmail (recommended) - use your info@fleurdeliza.ch with Gmail SMTP
//    - Option B: Custom SMTP with SiteGround settings:
//      * SMTP Server: mail.fleurdeliza.ch or smtp.fleurdeliza.ch
//      * Port: 587 (TLS) or 465 (SSL)
//      * Username: info@fleurdeliza.ch
//      * Password: your email password
// 3. Create an email template for contact form
// 4. Get your Service ID, Template ID, and Public Key
// 5. Replace the values above with your actual credentials
