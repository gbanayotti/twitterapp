import React, { useState } from "react";
import Dropdown from "./Dropdown"; 
import TweetVisualization from "./TweetVisualization"; 
import Legend from "./Legend"; 
import TweetDetails from "./TweetDetails";

function Dashboard({ tweetData }) {
  const [colorBy, setColorBy] = useState("Sentiment"); 
  const [selectedTweets, setSelectedTweets] = useState([]); 

  const handleColorByChange = (value) => {
    setColorBy(value); 
  };

  const handleTweetSelection = (tweet) => {
    if (selectedTweets.includes(tweet)) {
      setSelectedTweets(selectedTweets.filter((t) => t !== tweet));
    } else {
      setSelectedTweets([tweet, ...selectedTweets]);
    }
  };

  return (
    <div>
      <Dropdown colorBy={colorBy} setColorBy={handleColorByChange} />

      <Legend colorBy={colorBy} />

      <TweetVisualization
        data={tweetData}
        colorBy={colorBy}
        onTweetClick={handleTweetSelection} 
        selectedTweets={selectedTweets} 
      />

      <TweetDetails tweets={selectedTweets} />
    </div>
  );
}

export default Dashboard;
