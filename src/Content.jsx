import React from 'react';

// fetch the varaible from the app.jsx
const Content = ({
  inpWord,
  setInpWord,
  displayedWord,
  wordData,
  handleAudioPlay,
  audioUrl,
  allSynonyms,
  allAntonyms,
  error,
  isLoading,
  handleSearchWord
}) => {
    return (
        <div className="dictionary-app">
          <header className="header">
            <p>English Dictionary</p>
            <h1>BITS</h1>
            <button className="sign-up-button">Sign Up</button>
          </header>
    
          <form className="search-box" onSubmit={handleSearchWord}>
            <input
              type="text"
              value={inpWord}
              onChange={(e) => setInpWord(e.target.value)} // Keeping the result word the same no change
              placeholder="Type a word"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
    
          <div className="todays-sentence-section">
            <div className="todays-sentence">
              <h2>Today's Sentence</h2>
              <p>This is today's sentence. Lorem ipsum dolor sit amet.</p>
            </div>
            <button className="go-to-ielts-book">Go to IELTS Book</button>
          </div>
    
          <div className="search-results-container">
            {error && <div className="error">{error}</div>}
            {wordData && (
              <div className="search-results-box">
                <div className="result-header">
                  <h3 className="result-word">{displayedWord}</h3>
                  {wordData.phonetics[0] && wordData.phonetics[0].audio && (
                    <button
                    className="audio-button"
                    onClick={handleAudioPlay}
                    disabled={!audioUrl}
                  >
                    🔊
                  </button>
                  )}
                  
                </div> 
                {wordData.meanings.map((meaning, index) => (
                  <div key={index} className="meaning">
                    <h4>{meaning.partOfSpeech}</h4>
                    {meaning.definitions.map((definition, defIndex) => (
                      <div key={defIndex}>
                        <p className="result-definition">{definition.definition}</p>
                        {definition.example && (
                          <p className="result-example">Example: {definition.example}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="synonyms-antonyms-container">
                  <p>Synonyms: {allSynonyms.length ? allSynonyms.join(', ') : 'None'}</p>
                  <p>Antonyms: {allAntonyms.length ? allAntonyms.join(', ') : 'None'}</p>
                </div>
              </div>
            )}
          </div>
    
          <footer className="footer">
            &#169; 2023 Bitsdictionary.com
          </footer>
        </div>
      );
    };
    
export default Content;