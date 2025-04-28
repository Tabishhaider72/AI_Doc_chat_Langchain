# app/services/indexer.py
from llama_index import VectorStoreIndex, Document, ServiceContext, StorageContext, load_index_from_storage
from llama_index.embeddings.langchain import LangchainEmbedding
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from llama_index.vector_stores import ChromaVectorStore
from llama_index.storage.storage_context import StorageContext
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import chromadb

INDEX_DIR = "storage/vector_index"

# Setup Google Embeddings
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
embedding_model = LangchainEmbedding(embeddings)

def chunk_text(text: str) -> list:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    return splitter.split_text(text)

async def add_document_to_index(text: str, source_path: str):
    os.makedirs(INDEX_DIR, exist_ok=True)

    chunks = chunk_text(text)

    # Convert each chunk into a Document
    documents = [Document(text=chunk, metadata={"source": source_path}) for chunk in chunks]

    # Setup Chroma Vector Store
    chroma_client = chromadb.Client()
    chroma_collection = chroma_client.get_or_create_collection(name="pdf_index")

    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)

    service_context = ServiceContext.from_defaults(embed_model=embedding_model)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    index = VectorStoreIndex.from_documents(
        documents,
        service_context=service_context,
        storage_context=storage_context
    )

    index.storage_context.persist(persist_dir=INDEX_DIR)
