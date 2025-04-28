// src/components/ChatBox.jsx

import { useState } from 'react';
import { askQuestion } from '../services/api';

function ChatBox({ onNewMessage }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    onNewMessage({ type: 'question', text: input });

    try {
      const response = await askQuestion(input);
      onNewMessage({ type: 'answer', text: response.answer });
    } catch (error) {
      onNewMessage({ type: 'error', text: 'Error getting answer' });
    }

    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Ask a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.input}
        aria-label="Chat input"
      />
      <button type="submit" style={styles.button}>Send</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ChatBox;
