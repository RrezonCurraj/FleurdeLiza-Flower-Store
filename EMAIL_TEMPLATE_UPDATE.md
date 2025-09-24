# Update Email Template for Reply-To Functionality

## Current Issue

When you reply to contact form emails, they go to info@fleurdeliza.ch instead of the customer.

## Solution

Update your EmailJS template to include the customer's email in the Reply-To field.

## Steps to Fix

### 1. Go to EmailJS Dashboard

- Visit: https://dashboard.emailjs.com/admin/templates
- Find your template: `template_4k0zxy8`

### 2. Update Template Settings

In the template editor, add this to the **Advanced Settings** or **Headers** section:

```
Reply-To: {{from_email}}
```

### 3. Alternative: Update Template Content

Or add this line at the top of your email content:

```
Reply-To: {{from_email}}

Hallo Fleur de Liza Team,

Sie haben eine neue Kontaktanfrage über Ihre Website erhalten:

Name: {{from_name}}
E-Mail: {{from_email}}

Nachricht:
{{message}}

---
Diese Nachricht wurde über das Kontaktformular von fleurdeliza.ch gesendet.
```

## Result

After this update:

- ✅ Customer fills form → Email sent to info@fleurdeliza.ch
- ✅ You reply → Email goes directly to customer's email
- ✅ Customer receives your reply in their inbox

## Test

1. Update the template in EmailJS
2. Test the contact form
3. Reply to the email you receive
4. Check that the reply goes to the customer's email
