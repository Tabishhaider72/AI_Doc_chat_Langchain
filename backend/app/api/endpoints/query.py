from fastapi import APIRouter
from pydantic import BaseModel
from app.services.query_engine import query_index

router = APIRouter()

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str

@router.post("/ask", response_model=QueryResponse)
async def query_pdf(data: QueryRequest):
    answer = await query_index(data.question)
    return QueryResponse(answer=answer)
