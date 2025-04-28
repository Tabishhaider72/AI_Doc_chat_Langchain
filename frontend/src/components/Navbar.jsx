import ResetButton from './ResetButton';
import UploadedFileDisplay from './UploadedFileDisplay';
import logo from '../assets/logo.png'; 

function Navbar({ onReset, uploadedFileName }) {
  return (
    <nav
      style={{
        padding: '6px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img src={logo} alt="Logo" style={{ height: '40px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {uploadedFileName && <UploadedFileDisplay fileName={uploadedFileName} />}
        <ResetButton onReset={onReset} />
      </div>
    </nav>
  );
}

export default Navbar;
