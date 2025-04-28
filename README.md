
# Chat With PDF using LangChain and FastAPI

## Project Overview

This project enables users to upload PDF files and ask questions about their contents. The backend is powered by **FastAPI** and uses **LangChain** for AI-driven question answering. The frontend is developed with **React**, **Next.js**, and **Tailwind CSS** to provide a seamless and responsive user interface.

The application allows users to upload a PDF, preview it, and interact with an AI-powered chatbot that answers questions based on the content of the uploaded PDF. The chatbot leverages **LangChain** for handling the natural language processing tasks.

## Technologies Used

### Backend
- **FastAPI** - A modern, fast web framework for building APIs with Python 3.7+.
- **LangChain** - A framework that simplifies building and deploying language model-based applications.
- **Python** - Programming language used for backend development.
- **Uvicorn** - ASGI server to run the FastAPI application.
- **OpenAI API** or **Custom Model API** - Language model API for processing natural language queries.

### Frontend
- **React.js** - JavaScript library for building user interfaces.
- **Next.js** - React framework for building server-side rendered applications.
- **Tailwind CSS** - A utility-first CSS framework for designing modern UIs.
- **Material UI** - A popular React component library for building user-friendly interfaces.
- **Axios** - Promise-based HTTP client for making API requests.

## Folder Structure

### Backend Folder Structure (FastAPI)
```
/backend
├── app/
│   ├── api/                   # API routes and logic
│   │   ├── endpoints/         # Endpoints for each functionality
│   │   │   ├── upload.py      # /upload_pdf endpoint for uploading PDFs
│   │   │   └── query.py       # /ask endpoint for querying uploaded PDFs
│   │   └── api_router.py      # Router to combine all API routes
│   ├── core/                  # Core configurations and utilities
│   │   ├── config.py          # Environment variables, CORS setup
│   │   └── utils.py           # Utility functions (e.g., for saving files, text extraction)
│   ├── services/              # Backend services for processing PDFs
│   │   ├── document_processor.py  # Service to process PDF content
│   │   ├── indexer.py         # Indexing PDFs for query processing
│   │   └── qa_engine.py       # Service for querying indexed PDFs
│   ├── models/                # Pydantic models for request/response validation
│   │   └── schemas.py         # Request and response schemas
│   ├── main.py                # FastAPI app entry point
│   └── qa_engine.py           # Query processing, LangChain integration
├── storage/                   # File storage
│   └── uploaded_files/        # Directory to store uploaded PDFs
├── requirements.txt           # List of backend dependencies
├── .env                       # Environment variables (API keys, secrets)
├── README.md  
```

### Frontend Folder Structure (React / Next.js)
```
/frontend
├── components/                # UI components for the application
│   ├── ChatBox.tsx            # Chat component for asking questions
│   ├── PdfPreview.tsx         # Component to preview uploaded PDF
│   ├── FileUploader.tsx       # Component to handle PDF uploads
│   └── Navbar.tsx             # Navigation bar component
├── pages/                     # Pages of the app
│   └── index.tsx              # The main page of the app
├── hooks/                     # Custom hooks
│   ├── useFileUpload.ts       # Hook to handle file upload logic
│   └── useChat.ts             # Hook to handle chat logic
├── lib/                       # Utility functions (for API calls)
│   └── api.ts                 # API functions for backend communication
├── constants/                 # Constants (e.g., default messages)
│   └── messages.ts            # Default prompts and centralized error messages
├── styles/                    # Global and local CSS
│   └── globals.css            # Global styles
├── App.css                    # Main application styles
├── App.tsx                    # Main application component
├── index.css                  # Main CSS for the app
└── main.tsx                   # Entry point for React app
```

## Installation and Setup

### Prerequisites
- Python 3.7+
- Node.js 14+
- npm or yarn

### Backend Setup (FastAPI)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/chat-with-pdf-langchain-fastapi.git
   cd chat-with-pdf-langchain-fastapi/backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scriptsctivate`
   ```

3. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI backend server:
   ```bash
   uvicorn main:app --reload
   ```

5. The backend will be running at `http://localhost:8000`.

### Frontend Setup (React / Next.js)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/chat-with-pdf-langchain-fastapi.git
   cd chat-with-pdf-langchain-fastapi/frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Run the Next.js development server:
   ```bash
   npm run dev
   ```

4. The frontend will be running at `http://localhost:3000`.

## Usage

1. Open the application in your browser.
2. Upload a PDF file through the **Upload PDF** button.
3. Once the file is uploaded, interact with the bot to ask questions related to the content of the PDF.
4. The bot will respond based on the contents of the uploaded document using AI-powered responses.

## Contributing

1. Fork the repository.
2. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Added new feature"
   ```
4. Push your changes:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- FastAPI: https://fastapi.tiangolo.com/
- LangChain: https://langchain.readthedocs.io/en/latest/
- OpenAI: https://openai.com/
