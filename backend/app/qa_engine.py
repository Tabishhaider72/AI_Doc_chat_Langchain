# app/qa_engine.py

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from app.core.config import INDEX_DIR
import os

# Generate and load the conversational chain for answering queries
def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not
    provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
    Context:\n {context}\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    
    return chain


# Process user query against uploaded PDFs
def process_query(query: str):
    # Load vector index
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.load_local(INDEX_DIR, embeddings)

    # Search the document using similarity search
    docs = vector_store.similarity_search(query)

    # Get conversational chain for generating answer
    chain = get_conversational_chain()

    # Generate answer from documents
    response = chain(
        {"input_documents": docs, "question": query}, return_only_outputs=True
    )

    return response["output_text"], [doc.metadata['source'] for doc in docs]
