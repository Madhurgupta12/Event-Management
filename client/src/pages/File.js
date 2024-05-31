import axios from 'axios';
import React, { useState, useEffect } from 'react';

const File = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allImage, setAllImage] = useState(null);
    const userId = localStorage.getItem("userId");
  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:4000/get-files", {
      params: { userId: userId }
    });
    console.log(result.data.data);
    setAllImage(result.data.data);
  };
  

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("userId", userId); // Include userId
    console.log(formData);
    console.log(title);
    console.log(file);
  
    const result = await axios.post(
      "http://localhost:4000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
  };
  
  const showPdf = (pdf) => {
    window.open(`http://localhost:4000/files/${pdf}`, "_blank", "noreferrer");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">File Upload</h1>
      <form className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md" onSubmit={submitImage}>
        <h4 className="text-lg font-semibold mb-4">Upload PDF in React</h4>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="w-full max-w-sm mt-8">
        <h4 className="text-lg font-semibold mb-4">Uploaded PDFs:</h4>
        <div className="space-y-4">
          {allImage == null ? (
            <p>No PDFs uploaded yet</p>
          ) : (
            allImage.map((data) => (
              <div key={data._id} className="p-4 bg-white rounded-lg shadow-md">
                <h6 className="text-md font-medium mb-2">Title: {data.title}</h6>
                <button
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => showPdf(data.pdf)}
                >
                  Show PDF
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default File;
