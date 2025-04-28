# app/core/config.py

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Google Gemini API Key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Storage paths
UPLOAD_DIR = "storage/uploaded_files"
INDEX_DIR = "storage/vector_index"

# Frontend CORS Origins
ALLOWED_ORIGINS = [
    "http://localhost:5173", 
]

# App Settings
APP_NAME = "PDF-QA FastAPI Backend"
APP_VERSION = "1.0.0"
