import React, { useState, useEffect } from "react";
import he from "he";
import Parser from "html-react-parser";

const TopStories = () => {
  const [newsData, setNewsData] = useState([]);
  const [storyData, setStoryData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [commentsData, setCommentsData] = useState({});
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStoryData = async () => {
      const endIndex = startIndex + 10;
      const stories = await Promise.all(
        newsData.slice(startIndex, endIndex).map(async (itemId) => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`
          );
          const data = await response.json();
          return data;
        })
      );
      setStoryData(stories);
    };

    fetchStoryData();
  }, [newsData, startIndex]);

  const loadMoreStories = () => {
    setStartIndex((prevStartIndex) => prevStartIndex + 10);
  };

  const openStory = (url) => {
    window.open(url, "_blank");
  };

  const fetchComments = async (storyId) => {
    try {
      console.log("Fetching comments for story:", storyId);

      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
      );
      const story = await response.json();

      const commentIds = story.kids || [];
      console.log("Comment IDs:", commentIds);

      const comments = await Promise.all(
        commentIds.map(async (commentId) => {
          const commentResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
          );
          const commentData = await commentResponse.json();
          return commentData;
        })
      );

      console.log("Fetched comments:", comments);

      setCommentsData((prevCommentsData) => ({
        ...prevCommentsData,
        [storyId]: comments,
      }));
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
    toggleComments();
  };

  /************************** Toggle Comments **********************/

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="news-cont">
      <ul>
        {storyData.map((story, index) => (
          <li key={story.id} style={{ marginBottom: "20px" }}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => openStory(story.url)}
            >
              <span>{startIndex + index + 1}</span> {story.title}
            </div>
            <button onClick={() => fetchComments(story.id)}>
              {showComments ? "Open Comments" : "Close Comments"}
            </button>
            {commentsData[story.id] && commentsData[story.id].length > 0 && (
              <div
                style={{
                  height: !showComments ? "300px" : "0px",
                  overflow: "scroll",
                  backgroundColor: "aqua",
                }}
              >
                <h3>Comments:</h3>
                {commentsData[story.id].map((comment, index) => {
                  console.log("Rendering comment:", comment);

                  if (!comment || !comment.text) {
                    return null;
                  }

                  const decodedText = he.decode(comment.text);

                  return (
                    <div key={index}>
                      <p>By: {comment.by}</p>
                      <div>{Parser(decodedText)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={loadMoreStories}>Load More Stories</button>
    </div>
  );
};

export default TopStories;
