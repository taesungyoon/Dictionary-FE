// App.js

import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function DictionaryApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Replace this with the actual URL of your backend API
      const apiUrl = 'http://localhost:3001/search';


      const response = await axios.get(apiUrl, {
        params: {
          term: searchTerm,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="dictionary-app">
      {/* Header with yellow stripe */}
      <div className="header">
        <div className="yellow-stripe"></div>
        <div>
          
          <p>English Dictionary</p>
          <h1>BITS</h1>
          <button className="sign-up-button">Sign Up</button>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      
      {/* Today's Sentence and Go to IELTS Book section */}
      <div className="todays-sentence-section">
        {/* Today's Sentence box */}
        <div className="todays-sentence">
          <h2>Today's Sentence</h2>
          {/* Add the content of today's sentence here */}
          <p>This is today's sentence. Lorem ipsum dolor sit amet.</p>
        </div>

        {/* Go to IELTS Book button */}
        <button className="go-to-ielts-book">Go to IELTS Book</button>
      </div>

      

      {/* Display Search Results Component */}
      <SearchResults searchResults={searchResults} />


      {/* About Us section */}
      <div className="about-section">
  <div className="options">
    <button>About Us</button>
    <button>Contact Us</button>
    <button>Terms & Privacy</button>
    <button>Q&A</button>
    <button>IELTS</button>
    <button>TOEIC</button>
    <button>My Vocab</button>
    <button>History</button>
  </div>
  {/* Add content or functionality here */}
</div>
    </div>
    
  );
}

function SearchResults({ searchResults }) {
  return (
    <div className="search-results-container">
      {searchResults.map((result) => (
        <div key={result.id} className="search-results-box">
          <div className="result-header">
            <div className="result-word">{result.lemma}</div>
            <button className="audio-button" onClick={handleAudioClick}>
              <i className="fas fa-volume-up"></i>
            </button>
          </div>
          <div className="result-synonyms">Synonyms: {result.synonyms}</div>
          <div className="result-antonyms">Antonyms: {result.antonyms}</div>
          <div className="result-definition">{result.definition}</div>
        </div>
      ))}
    </div>
  );
}



function handleAudioClick() {
  // Implement audio functionality here
  console.log('Audio button clicked');
}



function App() {
  return (
    <div className="App">
      <DictionaryApp />

      {/* Footer */}
      <footer className="footer">
        &#169; 2023 Bitsdictionary.com
      </footer>
    </div>
  );
}

export default App;
