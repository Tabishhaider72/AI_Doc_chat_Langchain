// src/services/api.js

const API_BASE = 'http://localhost:8000'; // Base URL only

export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/upload`, {   // 🔥 /upload
    method: 'POST',
    body: formData,
  });
  return response.json();
}

export async function askQuestion(question) {
  const response = await fetch(`${API_BASE}/query`, {    // 🔥 /query
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  return response.json();
}
