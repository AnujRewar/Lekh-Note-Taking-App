const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';
const UPLOAD_API_BASE = 'https://www.googleapis.com/upload/drive/v3';

export async function saveCanvasToDrive(accessToken, fileId, canvasJsonData, fileName) {
    const metadata = {
        name: fileName,
        mimeType: 'application/json',
        parents: fileId ? undefined : ['appDataFolder'] // Put in hidden appDataFolder if it's a new file
    };

    // Google Drive multipart upload format
    const multipartRequestBody =
        `--foo_bar_baz\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +    // meta data of file
        JSON.stringify(metadata) + `\r\n` +                         //actual content of file
        `--foo_bar_baz\r\n` +
        `Content-Type: application/json\r\n\r\n` +
        canvasJsonData + `\r\n` +
        `--foo_bar_baz--`;      //this is a boundary that tells that it is end of file

    const endpoint = fileId
        ? `${UPLOAD_API_BASE}/files/${fileId}?uploadType=multipart`
        : `${UPLOAD_API_BASE}/files?uploadType=multipart`;

    const method = fileId ? 'PATCH' : 'POST';  //PATCH -> update existing file
                                                      // POST ->Create a new file
    const response = await fetch(endpoint, {
        method: method,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/related; boundary=foo_bar_baz'
        },
        body: multipartRequestBody
    });

    if (!response.ok) {
        throw new Error(`Failed to sync to Google Drive: ${response.statusText}`);
    }

    return await response.json(); // Returns file metadata including the file ID
}

/**
 * Finds and loads a canvas note file from Google Drive by its file name
 */
export async function loadCanvasFromDrive(accessToken, fileName) {
    const query = encodeURIComponent(`name = '${fileName}' and 'appDataFolder' in parents and trashed = false`);
    const response = await fetch(`${DRIVE_API_BASE}/files?spaces=appDataFolder&q=${query}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!response.ok) return { fileId: null, content: null };

    const data = await response.json();
    if (data.files && data.files.length > 0) {
        const fileId = data.files[0].id;

        // Download the actual file text content
        const contentResponse = await fetch(`${DRIVE_API_BASE}/files/${fileId}?alt=media`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (contentResponse.ok) {
            const content = await contentResponse.text();
            return { fileId, content };
        }
    }
    return { fileId: null, content: null };
}