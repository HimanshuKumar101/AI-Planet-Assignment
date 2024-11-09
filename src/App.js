//Importing Dependencies
import React, { useState } from "react";
import { askQuestion, uploadFile } from "./api/api";
import { CiCirclePlus } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import CompanyLogomain from "./assets/CompanyLogomain.png";
import userlogo from "./assets/userlogo.png";
import aiplanetlogo from "./assets/aiplanetlogo.png";

//Setting Up Component State
function App() {
  const [documentId, setDocumentId] = useState(null); //Stores the ID of the uploaded PDF document from the backend.
  const [fileName, setFileName] = useState(""); //Stores the name of the uploaded file.
  const [question, setQuestion] = useState(""); //Stores the current question input by the user.
  const [submittedQuestion, setSubmittedQuestion] = useState(""); //Holds the last submitted question to display alongside the answer.
  const [answer, setAnswer] = useState(""); //Stores the answer returned by the backend.
  const [isModalOpen, setIsModalOpen] = useState(false);

  //handleUpload Function
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsModalOpen(true);

      try {
        const response = await uploadFile(file);
        setDocumentId(response.documentId);
        console.log("Document ID set:", response.documentId);
      } catch (error) {
        console.error("Failed to upload file:", error);
        alert("Failed to upload file. Please try again.");
      }
    }
  };

  //handleQuestionSubmit Function
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!documentId) {
      alert("Please upload a document first.");
      return;
    }

    const response = await askQuestion(documentId, question);
    setAnswer(response.answer);
    setSubmittedQuestion(question); // Save the submitted question to display
    setQuestion(""); // Clear the question input field
  };

  const Modal = ({ onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">File Uploaded</h2>
        <p className="text-gray-700 font-inter text-14px font-500 leading-[21px] underline decoration-skip-ink-none">
          You have successfully uploaded: <strong>{fileName}</strong>
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-white">
      {/* Navbar */}
      <div className="flex justify-between items-center h-[77px] fixed w-full px-6 bg-white shadow-md">
        {/* Company Logo */}
        <div className="flex items-center">
          <img src={CompanyLogomain} alt="Company Logo" className="w-32 h-12" />
        </div>

        {/* Upload Section */}
        <div className="flex items-center gap-2">
          {fileName && (
            <div className="flex items-center gap-2">
              <div className="border border-green-500 rounded-lg px-2.5 py-3 flex items-center justify-center">
                <IoDocumentOutline className="text-green-500 w-4 h-4" />
              </div>
              <p className="font-inter text-[14px] font-semibold leading-[21px] truncate text-green-500 hidden sm:block">
                {fileName}
              </p>
            </div>
          )}

          <label className="flex justify-center items-center gap-2 cursor-pointer border border-black w-auto h-[39px] rounded-lg py-2 px-3">
            <CiCirclePlus className="text-xl text-gray-600" />

            <p className="font-inter text-14px font-500 leading-[21px] text-gray-600 hidden sm:block">
              Upload PDF
            </p>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Bottom Input */}
      <form
        onSubmit={handleQuestionSubmit}
        className="absolute bottom-8 left-[112px] w-[1218px] h-[56px] p-4 sm: items-center"
      >
        {/* Question Input */}
        <div className="relative left-[112px] ">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Send a message..."
            className="font-inter text-14px font-500 leading-[21px] w-full p-3 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />

          <button
            type="submit"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            <LuSendHorizonal className="w-[22px] h-[22px] opacity-100 cursor-pointer" />
          </button>
        </div>
      </form>

      {/* Display Answer */}
      {answer && (
        <div className="absolute w-[1208px] h-[231px] top-[138px] left-[169px]">
          {/* Question Div */}
          <div className="flex items-start gap-2 mb-4">
            <img src={userlogo} alt="User Logo" className="w-[40px] h-[40px]" />
            <p className="text-[#1B1F2A] font-inter text-15px font-500 leading-[21px] w-full p-4 rounded-md">
              {submittedQuestion} {/* Display the submitted question */}
            </p>
          </div>

          {/* Answer Div */}
          <div className="flex items-start gap-2">
            <img
              src={aiplanetlogo}
              alt="AI Planet Logo"
              className="w-10 h-10"
            />
            <p className="text-[#1B1F2A] font-inter text-15px font-500 leading-[21px] w-full p-4 rounded-md">
              {answer}
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
