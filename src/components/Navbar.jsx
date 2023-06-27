import React, { useEffect, useRef } from "react";

const NavBar = ({ currentPage, onButtonClick }) => {
  const topStoriesRef = useRef(null);

  useEffect(() => {
    topStoriesRef.current.focus();
  }, []);

  return (
    <div className="nav-cont">
      <h1 className="nav-heading">Hacker News Clone</h1>
      <div className="btn-portion">
        <button
          onClick={() => onButtonClick("top stories")}
          className="nav-btn"
          id={currentPage === "top stories" ? "active-btn" : ""}
          ref={topStoriesRef}
        >
          Top Stories
        </button>
        <button
          onClick={() => onButtonClick("new stories")}
          className="nav-btn"
          id={currentPage === "new stories" ? "active-btn" : ""}
        >
          New Stories
        </button>
        <button
          onClick={() => onButtonClick("past stories")}
          className="nav-btn"
          id={currentPage === "past stories" ? "active-btn" : ""}
        >
          Past Stories
        </button>
      </div>
      <button className="login-btn">Login</button>
    </div>
  );
};

export default NavBar;
