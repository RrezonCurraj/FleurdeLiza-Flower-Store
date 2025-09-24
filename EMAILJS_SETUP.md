# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form functional.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```
Subject: Neue Kontaktanfrage von {{from_name}}

Hallo {{to_name}},

Sie haben eine neue Kontaktanfrage erhalten:

Name: {{from_name}}
E-Mail: {{from_email}}

Nachricht:
{{message}}

---
Diese Nachricht wurde über das Kontaktformular Ihrer Website gesendet.
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `abc123def456`)

## Step 5: Update Configuration

1. Open `lib/emailConfig.ts`
2. Replace the placeholder values with your actual credentials:

```typescript
export const emailConfig = {
  serviceId: "your_service_id_here",
  templateId: "your_template_id_here",
  publicKey: "your_public_key_here",
};
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Go to your contact form
3. Fill out and submit the form
4. Check your email for the message

## Troubleshooting

- Make sure all IDs and keys are correct
- Check that your email service is properly configured
- Verify that the template variables match the form data
- Check the browser console for any error messages

## Free Tier Limits

- 200 emails per month
- Perfect for small businesses and personal projects
- Upgrade to paid plans for higher limits
