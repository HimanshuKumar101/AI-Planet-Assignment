
PDF Q&A Application
This application allows users to upload PDF files, extract the text content, and then ask questions based on the content of the document. The backend processes the PDF file, saves the content to a database, and interacts with Hugging Face’s Inference API to answer questions. The frontend allows users to upload PDFs and interact with the document content via questions.
Features
•	Upload PDF files.
•	Extract text content from PDFs.
•	Ask questions based on the content of the uploaded PDF.
•	Get answers using the Hugging Face Question Answering API.
Architecture
The application follows a typical full-stack structure:
•	Backend: Node.js server with Express.js, using MongoDB to store PDF document data.
•	Frontend: React.js frontend with a user-friendly interface that allows users to upload PDFs and interact with the document.
________________________________________
Requirements
•	Node.js (v14 or later)
•	MongoDB (or a MongoDB Atlas account for cloud database hosting)
•	API Key for Hugging Face's Inference API (for question-answering functionality)
________________________________________
Setup Instructions
1. Clone the Repository
Clone this repository to your local machine:
git clone <repository-url>
cd <project-folder>
2. Backend Setup
1.	Navigate to the backend folder:
cd backend
2.	Install dependencies:
Run the following command to install all required dependencies for the backend:
npm install
3.	Create a .env file:
In the backend folder, create a .env file and set the following environment variables:
MONGO_URI=your-mongodb-uri
HF_API_KEY=your-hugging-face-api-key
PORT = 5000
4.	Start the Backend Server:
For development, use nodemon to start the backend server:
npm run dev
This will start the backend server at http://localhost:5000.
________________________________________
3. Frontend Setup
1.	Navigate to the frontend folder:
cd frontend
2.	Install dependencies:
Run the following command to install the required dependencies for the frontend:
npm install
3.	Start the Frontend Development Server:
If using Vite:
npm run dev
This will start the frontend server at http://localhost:3000.
________________________________________
4. Running Both Servers Concurrently
1. Install concurrently as a dependency if you haven't already:
npm install concurrently --save-dev
2. Update the scripts section in package.json:
You can modify the scripts section to run the backend (server) and frontend (client) concurrently by adding the following entry:
{
  "scripts": {
    "start": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm run client\" \"npm run server\"",
    "client": "cd frontend && npm run dev",
    "server": "cd backend && npm run dev"
  }
}
Explanation:
•	npm run client: This will start the frontend by navigating into the frontend folder and running npm run dev (which should be defined in the frontend/package.json).
•	npm run server: This will start the backend by navigating into the backend folder and running npm run dev (which should be defined in the backend/package.json).
•	concurrently: This will run both commands (frontend and backend) concurrently in the same terminal window.
o	-n "client,server": This gives each process a label for better clarity in the terminal.
o	-c "bgBlue,bgYellow": This assigns color coding to the labels for easier identification (client gets blue, server gets yellow).
________________________________________
API Documentation
Backend Routes
The backend exposes the following API endpoints:
1. POST /api/pdf/upload
•	Description: Upload a PDF file to the server, extract the text content, and save it to the database.
•	Request Body: The file should be sent as a multipart/form-data payload.
•	Response:
o	200 OK: Returns the document ID and filename.
o	400 Bad Request: If no file is uploaded.
Example request:
POST /api/pdf/upload
Content-Type: multipart/form-data
File: [your-pdf-file]
Example response:
{
  "documentId": "some-unique-id",
  "filename": "example.pdf"
}
2. POST /api/pdf/ask
•	Description: Ask a question about the content of a document. The question and the document ID must be provided.
•	Request Body:
{
  "documentId": "some-unique-id",
  "question": "What is the summary of this document?"
}
•	Response:
o	200 OK: Returns the answer to the question.
o	400 Bad Request: If the document ID or question is missing.
Example request:
POST /api/pdf/ask
Content-Type: application/json
{
  "documentId": "some-unique-id",
  "question": "What is the main topic of the document?"
}
Example response:
{
  "answer": "The main topic of the document is artificial intelligence."
}
________________________________________
Frontend Usage
File Upload
The frontend provides a user interface for uploading PDF files. The uploaded file's content is extracted, stored in the database, and a unique document ID is returned.
1.	Upload a PDF file: Click on the "Upload PDF" button to select a file and upload it to the server.
2.	View the uploaded file details: After a successful upload, a modal will appear showing the filename.
Ask a Question
After uploading a PDF, you can ask questions related to the document's content:
1.	Submit a question: Enter your question in the input field and click the send button.
2.	View the answer: The answer will be displayed below your question once it's processed by the backend.
________________________________________
Troubleshooting
1. Hugging Face API Issues
•	Problem: The Hugging Face API may not provide appropriate answers or may return incomplete responses.
•	Solution: Hugging Face's API is slower and sometimes returns low-confidence answers (e.g., empty or meaningless responses). You may try OpenAI's API instead (if you have access).
2. Slow Response from Hugging Face API
•	Problem: The Hugging Face API can be slow, especially with larger documents.
•	Solution: Hugging Face has rate-limiting, and it may not respond immediately. If you encounter a delay, you may need to wait before making further requests. Alternatively, consider using OpenAI for faster responses.
3. OpenAI API Access
•	Problem: OpenAI's API is paid, and access is limited based on your account's usage limits.
•	Solution: If you are hitting rate limits or encountering API access issues, consider using Hugging Face's API instead or apply for an increased quota in your OpenAI account.
4. API Limitations
•	Problem: Hugging Face API may allow only two requests before requiring a wait time.
•	Solution: Hugging Face has a limit of two requests per session. After hitting the limit, you may need to wait for the session to reset before making more requests.
________________________________________
Conclusion
This PDF Question Answering application allows users to easily upload PDF files, extract text, and ask questions about the content of the documents. It uses cutting-edge AI APIs to provide answers, helping users retrieve information quickly from large text-based documents. The application supports integration with both Hugging Face and OpenAI APIs for question-answering.

