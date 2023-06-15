import React from "react";

const Navbar = () => {
  return (
    <div className="nav-cont">
      <h1 className="nav-heading">Hacker News Clone</h1>
      <div className="btn-portion">
        <button className="nav-btn">New</button>
        <button className="nav-btn">Past</button>
        <button className="nav-btn">Comments</button>
        <button className="nav-btn">Show</button>
        <button className="nav-btn">Jobs</button>
      </div>
      <button className="login-btn">Login</button>
    </div>
  );
};

export default Navbar;
