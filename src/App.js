import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import TopStories from './components/TopStories';
import NewStories from './components/NewStories';
import PastStories from './components/PastStories';


function App() {
  const [currentPage, setCurrentPage] = useState('top stories');

  let content;
  if (currentPage === 'top stories') {
    content = <TopStories />
  } else if (currentPage === 'new stories') {
    content = <NewStories />
  } else if (currentPage === 'past stories') {
    content = <PastStories />
  }

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <NavBar currentPage={currentPage} onButtonClick={handleButtonClick} />

      <div className="content-div">{content}</div>
    </div>
  );
}

export default App;
