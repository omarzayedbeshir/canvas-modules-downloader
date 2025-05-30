function createDownloadButton() {
  if (document.getElementById("canvas-download-all-files")) return;

  const button = document.createElement("button");
  button.id = "canvas-download-all-files";
  button.textContent = "Download All Files";
  button.style = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 10000;
    padding: 10px 16px;
    background-color: #0073e6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  `;

  const note = document.createElement("div");
  note.textContent = "Not all files may download. Please review afterward.";
  note.style = `
    position: fixed;
    top: 160px;
    right: 20px;
    z-index: 10000;
    background: #fff3cd;
    color: #856404;
    padding: 8px 12px;
    border: 1px solid #ffeeba;
    border-radius: 4px;
    font-size: 12px;
    max-width: 200px;
  `;

  button.addEventListener("click", async () => {
    const attachmentClassPattern = /^Attachment_(\d{5,})$/;
    const fileIds = [];

    document.querySelectorAll('[class]').forEach(el => {
      el.classList.forEach(cls => {
        const match = cls.match(attachmentClassPattern);
        if (match) fileIds.push(match[1]);
      });
    });

    const urlMatch = window.location.href.match(/courses\/(\d+)/);
    if (!urlMatch) {
      alert("❌ Course ID not found in URL.");
      return;
    }
    const courseId = urlMatch[1];
    const baseUrl = window.location.origin;

    if (fileIds.length === 0) {
      alert("❗ No downloadable files found on this page.");
      return;
    }

    const delay = 10000;

    for (const fileId of fileIds) {
      const downloadUrl = `${baseUrl}/courses/${courseId}/files/${fileId}/download?download_frd=1`;
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log(`Download triggered for File ID: ${fileId}`);
      await new Promise(res => setTimeout(res, delay));
    }

    alert("✅ Download process finished.\nSome files may not have downloaded.");
  });

  document.body.appendChild(button);
  document.body.appendChild(note);
}

createDownloadButton();