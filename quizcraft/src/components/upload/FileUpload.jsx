// File upload input — accepts .txt and .pdf files
// Reads the file and passes the text content up to the parent

function FileUpload({ onFileRead }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // Read file as plain text

    reader.onload = (event) => {
      onFileRead(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Or upload a file (.txt or .pdf)
      </label>
      <input
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
      />
      <p className="text-xs text-gray-400">
        Note: For PDF files, make sure they are text-based and not scanned
        images.
      </p>
    </div>
  );
}

export default FileUpload;
