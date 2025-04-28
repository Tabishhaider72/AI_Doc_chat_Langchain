# app/utils.py

import os
from PyPDF2 import PdfReader

def save_uploaded_file(file, destination):
    with open(destination, "wb") as buffer:
        buffer.write(file.file.read())

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text
