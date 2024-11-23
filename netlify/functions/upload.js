const { google } = require('googleapis');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { file } = JSON.parse(event.body);
    
    // Upload to Google Drive
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/drive.file']
    );

    const drive = google.drive({ version: 'v3', auth });
    const response = await drive.files.create({
      requestBody: {
        name: `property-${Date.now()}`,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
      },
      media: {
        mimeType: file.type,
        body: file
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        imageUrl: `https://drive.google.com/uc?id=${response.data.id}`
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Upload failed' })
    };
  }
}; 