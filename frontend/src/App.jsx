// src/App.jsx

import { useState } from 'react';
import UploadButton from './components/UploadButton';
import ChatBox from './components/ChatBox';
import MessageList from './components/MessageList';
import Navbar from './components/Navbar';

function App() {
  const [messages, setMessages] = useState([]);
  const [pdfFileUrl, setPdfFileUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleNewMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleUploadSuccess = (fileName, file) => {
    setUploadedFileName(fileName);
    const fileUrl = URL.createObjectURL(file);
    setPdfFileUrl(fileUrl);
  
    // 🛜 Add a welcome bot message
    setMessages([
      {
        type: 'answer',
        text: `Welcome aboard! You've successfully uploaded "${fileName}". Dive in and feel free to ask anything you want about it!`,
      },
    ]);
  };

  const handleReset = () => {
    setMessages([]);
    setPdfFileUrl(null);
    setUploadedFileName(null);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onReset={handleReset} uploadedFileName={uploadedFileName} />

      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Left Section: Chat */}
        <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <MessageList messages={messages} />
          </div>
          <ChatBox onNewMessage={handleNewMessage} />
        </div>

        {/* Right Section: Upload or Preview */}
        <div style={{ flex: 1, padding: '0', overflow: 'hidden' }}>
          {!pdfFileUrl ? (
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <UploadButton onUploadSuccess={handleUploadSuccess} />
            </div>
          ) : (
            <iframe
              src={pdfFileUrl}
              title="PDF Preview"
              width="100%"
              height="100%"
              style={{
                border: 'none',
              }}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
