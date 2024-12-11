import React, { useState } from 'react';

function FileUploader({ onUpload }) {
  const [file, setFile] = useState(null); 
  const [fileName, setFileName] = useState(""); 
  const [jsonData, setJsonData] = useState(null); 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(selectedFile.name); 
    setFile(selectedFile); 
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result); 
          setJsonData(json);  
          onUpload(json);
        } catch (error) {
          alert('Invalid JSON file. Please upload a valid JSON.');
        }
      };
      reader.readAsText(file); 
    } else {
      alert('Please choose a file to upload.');
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: 30, borderRadius: "1px", width: "auto", margin: "20px auto" }}>
      <h2 style={{ fontSize: "25px", textAlign: "left" }}>Upload a JSON File</h2>
      <form onSubmit={handleFileSubmit}>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ padding: "0px", borderRadius: "5px", marginRight: "10px" }}
        />
        <button type="submit">Upload</button>
      </form>
      
    </div>
  );
}

export default FileUploader;
