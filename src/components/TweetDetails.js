import React from "react";

function TweetDetails({ tweets }) {
  return (
    <div>
      {tweets.map((tweet, index) => (
        <p key={index}>{tweet.RawTweet}</p>
      ))}
    </div>
  );
}

export default TweetDetails;
