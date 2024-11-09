import axios from "axios"; //send requests to the backend API.

//Defining the API URL
const API_URL = "http://localhost:5000/api/pdf";

//uploadFile Function
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${API_URL}/upload`, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

//askQuestion Function
export const askQuestion = async (documentId, question) => {
  if (!documentId) {
    throw new Error("documentId is missing");
  }

  const response = await axios.post(`${API_URL}/ask`, { documentId, question });
  return response.data;
};
