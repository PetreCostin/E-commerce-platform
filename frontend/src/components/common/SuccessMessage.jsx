import './SuccessMessage.css';

const SuccessMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="success-message">
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="close-btn">
          ×
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
