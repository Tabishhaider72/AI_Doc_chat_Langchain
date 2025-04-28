# app/api/api_router.py
from fastapi import APIRouter
from app.api.endpoints import upload, query

router = APIRouter()

# Register upload and query endpoints
router.include_router(upload.router, prefix="/upload", tags=["Upload"])
router.include_router(query.router, prefix="/query", tags=["Query"])
