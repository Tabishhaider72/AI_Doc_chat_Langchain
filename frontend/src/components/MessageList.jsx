// src/components/MessageList.jsx
import youAvatar from '../assets/you.png';
import botAvatar from '../assets/bot.png';

function MessageList({ messages }) {
  return (
    <div style={styles.container}>
      {messages.map((msg, idx) => (
        <div key={idx} style={styles.messageRow(msg.type)}>
          <img
            src={msg.type === 'question' ? youAvatar : botAvatar}
            alt={msg.type}
            style={styles.avatar}
          />
          <div style={styles.messageBubble(msg.type)}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    overflowY: 'auto',
    height: '100%',
  },
  messageRow: (type) => ({
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '15px',
    flexDirection: type === 'question' ? 'row-reverse' : 'row',
  }),
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '0 10px',
  },
  messageBubble: (type) => ({
    maxWidth: '70%',
    padding: '10px 15px',
    borderRadius: '20px',
    backgroundColor: type === 'question' ? '#4f46e5' : '#e5e7eb',
    color: type === 'question' ? '#fff' : '#000',
    fontSize: '16px',
    wordBreak: 'break-word',
  }),
};

export default MessageList;
