# MyClarifyr Waitlist Landing Page

A clean, modern, student-friendly landing page for collecting waitlist signups.

## 🚀 Features

- **Modern Design**: Beautiful gradient backgrounds, smooth animations, and responsive layout
- **Google Sheets Integration**: Automatically saves emails to your Google Sheet
- **Mobile Responsive**: Works perfectly on all devices
- **Email Validation**: Client-side validation for email addresses
- **No Backend Required**: Static HTML/CSS/JS with Google Sheets as database

## 📁 Files

- `index.html` - Main landing page
- `style.css` - Styling and animations
- `script.js` - Form handling and Google Sheets integration
- `google-apps-script.js` - Google Apps Script code (for Google Sheets)
- `SETUP_GUIDE.md` - Step-by-step setup instructions

## 🎯 Quick Start

### Option 1: Test Locally (Without Google Sheets)

1. Open `index.html` in your browser
2. The page will work, but emails will only be stored in browser localStorage

### Option 2: Connect to Google Sheets (Recommended)

Follow the complete setup guide in `SETUP_GUIDE.md`

**Quick Summary:**
1. Create a Google Sheet
2. Add Apps Script code
3. Deploy as Web App
4. Copy the URL to `script.js`

## 📋 Sections Included

1. **Hero Section** - Eye-catching headline with CTAs
2. **What is MyClarifyr?** - Product explanation
3. **How It Works** - 3-step process
4. **Who Is It For?** - Target audience
5. **Why People Will Love It** - Benefits
6. **Waitlist Form** - Email collection
7. **Footer** - Links and tagline

## 🎨 Customization

### Change Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Add your own colors */
}
```

### Change Text

Edit the content directly in `index.html`

### Change Fonts

Replace the Google Fonts link in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

## 📱 Responsive Design

The page is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Privacy & Security

- Email validation prevents invalid submissions
- Duplicate emails are automatically rejected
- All data stored securely in your Google account
- No third-party services (except Google Sheets)

## 📊 Viewing Your Waitlist

Simply open your Google Sheet to see all collected emails with timestamps!

## 🚀 Deployment

You can deploy this to:
- **GitHub Pages** (Free)
- **Netlify** (Free)
- **Vercel** (Free)
- Any static hosting service

Just upload all files and you're done!

## 📧 Support

For issues or questions, refer to `SETUP_GUIDE.md`

---

**Built with ❤️ for learners**
