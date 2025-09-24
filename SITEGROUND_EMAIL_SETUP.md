# SiteGround Email Setup for Fleur de Liza

This guide will help you set up EmailJS to send contact form emails to `info@fleurdeliza.ch` on your SiteGround hosting.

## 🎯 Goal

Set up contact form to send emails directly to `info@fleurdeliza.ch`

## 📧 Step 1: EmailJS Account Setup

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 🔧 Step 2: Add Email Service (Choose One Option)

### Option A: Gmail SMTP (Recommended - Easier Setup)

1. In EmailJS dashboard → "Email Services" → "Add New Service"
2. Choose **"Gmail"**
3. **Important**: Use your SiteGround email credentials:
   - **Email**: `info@fleurdeliza.ch`
   - **Password**: Your SiteGround email password
4. Note down your **Service ID** (e.g., `service_abc123`)

### Option B: Custom SMTP (SiteGround Direct)

1. Choose **"Custom SMTP"**
2. Use these SiteGround settings:
   - **SMTP Server**: `mail.fleurdeliza.ch` or `smtp.fleurdeliza.ch`
   - **Port**: `587` (TLS) or `465` (SSL)
   - **Username**: `info@fleurdeliza.ch`
   - **Password**: Your SiteGround email password
   - **Security**: TLS (for port 587) or SSL (for port 465)
3. Test the connection
4. Note down your **Service ID**

## 📝 Step 3: Create Email Template

1. Go to "Email Templates" → "Create New Template"
2. **Template Name**: `Fleur de Liza Contact Form`
3. **Subject**: `Neue Kontaktanfrage von {{from_name}} - Fleur de Liza`
4. **Template Content**:

```
Hallo Fleur de Liza Team,

Sie haben eine neue Kontaktanfrage über Ihre Website erhalten:

Name: {{from_name}}
E-Mail: {{from_email}}

Nachricht:
{{message}}

---
Diese Nachricht wurde über das Kontaktformular von fleurdeliza.ch gesendet.
Zeitstempel: {{current_date}}
```

5. Save the template
6. Note down your **Template ID** (e.g., `template_xyz789`)

## 🔑 Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `abc123def456ghi789`)

## ⚙️ Step 5: Update Your Configuration

1. Open `lib/emailConfig.ts`
2. Replace the placeholder values:

```typescript
export const emailConfig = {
  serviceId: "your_service_id_here",
  templateId: "your_template_id_here",
  publicKey: "your_public_key_here",
};
```

## 🧪 Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Go to your contact form
3. Fill out and submit the form
4. Check `info@fleurdeliza.ch` for the email

## 🔍 Troubleshooting

### If emails don't arrive:

1. Check your SiteGround email settings
2. Verify SMTP credentials are correct
3. Check spam/junk folder
4. Test with Gmail SMTP option if Custom SMTP fails

### If you get authentication errors:

1. Double-check your email password
2. Try using Gmail SMTP instead of Custom SMTP
3. Verify the SMTP server address with SiteGround support

## 📊 Free Tier Limits

- **200 emails per month** (perfect for small business)
- **No credit card required**
- Upgrade to paid plans for higher limits

## 🎉 Success!

Once set up, every contact form submission will be sent directly to `info@fleurdeliza.ch` with the customer's name, email, and message!
