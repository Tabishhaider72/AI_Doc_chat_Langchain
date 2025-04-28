# app/services/query_engine.py
from llama_index import load_index_from_storage, StorageContext
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.retrievers import VectorIndexRetriever
from llama_index.prompts import PromptTemplate
import os

INDEX_DIR = "storage/vector_index"

def load_vector_index():
    storage_context = StorageContext.from_defaults(persist_dir=INDEX_DIR)
    index = load_index_from_storage(storage_context)
    return index

async def query_index(question: str) -> str:
    index = load_vector_index()

    retriever = VectorIndexRetriever(
        index=index,
        similarity_top_k=5
    )

    qa_template = PromptTemplate(
        "Answer the question based on the context below. "
        "If the answer is not found, say 'Answer not found in the context.'\n\n"
        "Context:\n{context_str}\n\nQuestion:\n{query_str}\n\nAnswer:"
    )

    query_engine = RetrieverQueryEngine(
        retriever=retriever,
        text_qa_template=qa_template
    )

    response = query_engine.query(question)
    return str(response)
