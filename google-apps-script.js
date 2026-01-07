// Google Apps Script for MyClarifyr Waitlist
// This script receives email submissions and stores them in Google Sheets

function doPost(e) {
    try {
        // Get the active spreadsheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse the incoming data
        const data = JSON.parse(e.postData.contents);
        const email = data.email;
        const feedback = data.feedback;
        const timestamp = data.timestamp || new Date().toISOString();

        const lastRow = sheet.getLastRow();

        // Handle feedback submission for existing user
        if (feedback) {
            if (lastRow > 1) {
                const range = sheet.getRange(2, 1, lastRow - 1, 1);
                const values = range.getValues();

                for (let i = 0; i < values.length; i++) {
                    if (values[i][0] === email) {
                        // Found the user, append feedback to Column D (index 4)
                        sheet.getRange(i + 2, 4).setValue(feedback);
                        return ContentService.createTextOutput(JSON.stringify({
                            'status': 'success',
                            'message': 'Feedback added successfully'
                        })).setMimeType(ContentService.MimeType.JSON);
                    }
                }
            }
            // If email not found but feedback provided, we could optionally add it as a new row
            // but the current logic assumes the user just signed up.
        }

        // Check if email already exists (for initial signup)
        let emailExists = false;
        if (lastRow > 1) {
            const existingEmails = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
            emailExists = existingEmails.some(row => row[0] === email);
        }

        if (emailExists) {
            return ContentService.createTextOutput(JSON.stringify({
                'status': 'duplicate',
                'message': 'Email already registered'
            })).setMimeType(ContentService.MimeType.JSON);
        }

        // Append the new email to the sheet (Email, Signup Timestamp, Date, Feedback Placeholder)
        sheet.appendRow([email, timestamp, new Date(), '']);

        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            'status': 'success',
            'message': 'Email added to waitlist'
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            'status': 'error',
            'message': error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function doGet(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const count = sheet.getLastRow() - 1; // Subtract header row

        return ContentService.createTextOutput(JSON.stringify({
            'status': 'success',
            'count': count
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            'status': 'error',
            'message': error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}
