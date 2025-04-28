# app/models/schemas.py

from pydantic import BaseModel
from typing import List, Optional

# Upload response model
class UploadResponse(BaseModel):
    message: str
    filename: str

# Query request model
class QueryRequest(BaseModel):
    question: str

# Query response model
class QueryResponse(BaseModel):
    answer: str
    source_documents: Optional[List[str]] = None  # Filenames from which answer was derived
