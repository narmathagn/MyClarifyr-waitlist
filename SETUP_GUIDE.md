# MyClarifyr Waitlist - Google Sheets Setup Guide

This guide will help you connect your landing page to Google Sheets to collect waitlist emails.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"MyClarifyr Waitlist"**
4. In the first row, add these headers:
   - **A1**: Email
   - **B1**: Timestamp
   - **C1**: Date Added

Your sheet should look like this:

```
| Email | Timestamp | Date Added |
|-------|-----------|------------|
```

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy the entire contents of `google-apps-script.js` file
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon) and name the project **"MyClarifyr Waitlist API"**

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: MyClarifyr Waitlist API
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to MyClarifyr Waitlist API (unsafe)**
   - Click **Allow**
7. **IMPORTANT**: Copy the **Web app URL** that appears
   - It will look like: `https://script.google.com/macros/s/AKfycbz.../exec`

## Step 4: Connect to Your Website

1. Open `script.js` in your code editor
2. Find this line at the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your Web app URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```
4. Save the file

## Step 5: Test Your Waitlist

1. Open `index.html` in your browser
2. Scroll to the waitlist section
3. Enter a test email address
4. Click **"Join the Waitlist"**
5. Check your Google Sheet - the email should appear!

## Troubleshooting

### Emails not appearing in Google Sheet?

1. **Check the URL**: Make sure you copied the complete Web app URL
2. **Check deployment**: Go to Apps Script → Deploy → Manage deployments
   - Make sure "Who has access" is set to **Anyone**
3. **Check browser console**: Press F12 and look for errors
4. **Re-deploy**: Try creating a new deployment in Apps Script

### "Something went wrong" error?

1. Make sure you authorized the script properly
2. Check that the Google Sheet is not deleted or renamed
3. Try re-deploying the Apps Script

## Viewing Your Waitlist

Simply open your Google Sheet anytime to see all collected emails!

You can:
- Sort by date
- Export to CSV
- Send bulk emails (using Google Sheets add-ons)
- Track waitlist growth

## Security Notes

- The script only accepts email addresses
- Duplicate emails are automatically prevented
- All data is stored securely in your Google account
- Only you have access to the Google Sheet

## Need Help?

If you encounter any issues, check:
1. The Web app URL is correct in `script.js`
2. The Apps Script is deployed with "Anyone" access
3. Your Google Sheet has the correct headers

---

**That's it! Your waitlist is now connected to Google Sheets! 🎉**
