class GoogleDriveService {
  async uploadFile(token, file) {
    try {
      const metadata = {
        name: `property-${Date.now()}-${file.name}`,
        mimeType: file.type,
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      // Upload file
      const uploadResponse = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const data = await uploadResponse.json();

      // Make file public
      const shareResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files/${data.id}/permissions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: 'reader',
            type: 'anyone',
          }),
        }
      );

      if (!shareResponse.ok) {
        throw new Error('Failed to make file public');
      }

      // Get the webViewLink
      const fileResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files/${data.id}?fields=webViewLink`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!fileResponse.ok) {
        throw new Error('Failed to get file link');
      }

      const fileData = await fileResponse.json();
      return fileData.webViewLink;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('ছবি আপলোড ব্যর্থ হয়েছে');
    }
  }
}

export const googleDriveService = new GoogleDriveService();