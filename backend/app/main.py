# app/main.py

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from app.utils import extract_text_from_pdf, save_uploaded_file
from app.core.config import UPLOAD_DIR, ALLOWED_ORIGINS
from app.models.schemas import UploadResponse, QueryRequest, QueryResponse
from app.qa_engine import process_query  # We'll define this in qa_engine.py

# FastAPI app initialization
app = FastAPI(title="PDF-QA FastAPI Backend", version="1.0.0")

# CORS setup to allow frontend to interact
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Endpoints
@app.post("/upload", response_model=UploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Save file
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        save_uploaded_file(file, file_location)

        # Extract text from PDF
        extracted_text = extract_text_from_pdf(file_location)

        # Process and index text
        # (We'll integrate with LangChain / LlamaIndex here)

        return UploadResponse(message="File uploaded and processed successfully", filename=file.filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/query", response_model=QueryResponse)
async def query_pdf(request: QueryRequest):
    try:
        # Process query and generate response using LangChain
        answer, source_documents = process_query(request.question)
        return QueryResponse(answer=answer, source_documents=source_documents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

