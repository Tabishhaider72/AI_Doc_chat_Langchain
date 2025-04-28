
import fileIcon from '../assets/File.png'; 

function UploadedFileDisplay({ fileName }) {
  if (!fileName) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#28a745', fontSize: '16px' }}>
      <img 
        src={fileIcon} 
        alt="File" 
        style={{ width: '20px', height: '20px', border: '2px solid #28a745', borderRadius: '4px', background: 'transparent', padding: '5px 4px'}}
      />
      <span>{fileName}</span>
    </div>
  );
}

export default UploadedFileDisplay;
