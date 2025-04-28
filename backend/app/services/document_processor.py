# app/services/document_processor.py
import fitz  # PyMuPDF
from app.services.indexer import add_document_to_index

async def process_document(file_path: str):
    text = extract_text_from_pdf(file_path)
    await add_document_to_index(text, file_path)

def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    return full_text
