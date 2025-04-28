# app/api/endpoints/upload.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.utils import save_upload_file
from app.services.document_processor import process_document
import os

router = APIRouter()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    # Validate file
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    # Save file
    save_path = await save_upload_file(file)

    # Process file (extract text, chunk, etc.)
    await process_document(save_path)

    return {"message": "PDF uploaded and processed successfully!"}
