import refreshIcon from '../assets/refresh.png';

function ResetButton({ onReset }) {
  const handleClick = () => {
    onReset();
  };

  return (
    <button 
      onClick={handleClick}
      style={{
        padding: '8px 16px',
        border: '2px solid #000',
        borderRadius: '8px',
        background: 'transparent',
        color: '#000',
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        cursor: 'pointer',
        transition: 'background 0.3s, color 0.3s',
        height: '40px', // Ensures button matches logo height
      }}
    >
      <img src={refreshIcon} alt="Reset" style={{ width: '20px', height: '20px' }} />
      Reupload PDF
    </button>
  );
}

export default ResetButton;
