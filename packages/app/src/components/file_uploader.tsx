"use client";

import React, { ChangeEvent } from "react";

interface FileUploaderProps {
  onFileUpload: (url: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      onFileUpload(fileUrl);
    }
  };

  return (
    <div>
      <input
        placeholder="파일업로드"
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;
