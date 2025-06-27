import React, { useRef, useState } from 'react';
import mammoth from 'mammoth';

interface FileUploadProps {
  onFileUpload: (text: string, fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    try {
      let text = '';
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (file.type === 'text/plain' || file.type === 'text/markdown' || file.type === 'application/json') {
        text = await file.text();
      } else {
        throw new Error(`Bestandstype niet ondersteund: ${file.type}`);
      }
      onFileUpload(text, file.name);
    } catch (err) {
      console.error("Fout bij het lezen van het bestand:", err);
      setError(err instanceof Error ? err.message : "Kon het bestand niet lezen.");
    }

    // Reset de file input zodat dezelfde file opnieuw gekozen kan worden
    event.target.value = '';
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt,.md,.json,.docx"
      />
      <button
        onClick={handleClick}
        className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
        title="Upload .txt, .md, .json, or .docx bestanden om de kennisbank uit te breiden."
      >
        Upload Kennisbank
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;