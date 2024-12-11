import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import Dashboard from "./components/Dashboard";

function App() {
  const [tweetData, setTweetData] = useState(null);

  const handleFileUpload = (data) => {
    setTweetData(data);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fafafa", minHeight: "100vh", padding: "20px" }}>
      <FileUploader onUpload={handleFileUpload} />
      {tweetData && <Dashboard tweetData={tweetData} />}
    </div>
  );
}

export default App;
