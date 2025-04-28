// src/components/UploadButton.jsx

import { useRef, useState } from 'react';
import { uploadPDF } from '../services/api';
import handIcon from '../assets/hand.png';
import addIcon from '../assets/add.png';

function UploadButton({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      await handleUpload(droppedFile);
    } else {
      alert('Please drop a PDF file only.');
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      await handleUpload(selectedFile);
    } else {
      alert('Please select a PDF file only.');
    }
  };

  const handleUpload = async (file) => {
    try {
      await uploadPDF(file);
      onUploadSuccess(file.name, file); // ✅ pass only file name and file
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <div
      style={{
        border: '2px dashed #aaa',
        padding: '40px',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '10px',
        backgroundColor: isDragging ? '#f0f8ff' : '#fafafa',
        borderColor: isDragging ? '#007bff' : '#aaa',
        transition: 'all 0.3s ease',
      }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img src={handIcon} alt="Drag and Drop" style={{ width: '50px', marginBottom: '10px' }} />
      <p style={{ fontSize: '16px', color: '#555' }}>
        Drag and drop your PDF here
      </p>

      <button
        onClick={handleButtonClick}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          border: '2px solid #007bff',
          borderRadius: '8px',
          background: 'transparent',
          color: '#007bff',
          fontSize: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#007bff';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#007bff';
        }}
      >
        <img src={addIcon} alt="Upload" style={{ width: '20px' }} />
        Upload PDF
      </button>

      <input
        type="file"
        accept="application/pdf"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default UploadButton;
