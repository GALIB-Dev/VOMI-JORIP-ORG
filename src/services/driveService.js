const { google } = require('googleapis');
const credentials = {
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
};

const drive = google.drive({ version: 'v3', auth: new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/drive.file']
)}); 