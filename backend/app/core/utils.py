# app/utils.py

import os
from PyPDF2 import PdfReader
from app.core.config import UPLOAD_DIR

# Save uploaded PDF file
def save_uploaded_file(file, file_location: str):
    with open(file_location, "wb") as f:
        f.write(file.file.read())

# Extract text from the PDF using PyPDF2
def extract_text_from_pdf(pdf_path: str) -> str:
    text = ""
    pdf_reader = PdfReader(pdf_path)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text
