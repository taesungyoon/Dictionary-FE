import React from 'react';
import Autocomplete from './Autocomplete';

const Content = ({
  inpWord,
  setInpWord,
  displayedWord,
  randomWord,
  wordData,
  error,
  isLoading,
  handleSearchWord,
  suggestions,
  onSelectSuggestion,
  searchHistory,
}) => {
  const onSubmitSearch = (event) => {
    event.preventDefault();
    handleSearchWord(inpWord);
  };

  const handleClickHistory = (term) => {
    setInpWord(term);
    handleSearchWord(term);
  };

  return (
    <div className="dictionary-app">
      <header className="header">
        <p>BITS <span>- English Dictionary</span></p>
        <button className="au-button"><a href="/Signup">Logout</a></button>
      </header>

      <form className="search-box" onSubmit={onSubmitSearch}>
        <Autocomplete
          suggestions={suggestions}
          value={inpWord}
          onChange={(value) => setInpWord(value)}
          onSelect={onSelectSuggestion}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {/* Display Search History */}


      <div className="cross-section">
        <div className='half-left-section'>
            <div className='history-section'>
              {searchHistory.length > 0 && (
              <div className="search-history-section">
                <h2>Search History</h2>
                <ul>
                  {searchHistory.map((term, index) => (
                    <li key={index} onClick={() => handleClickHistory(term)}>
                      {term}
                    </li>
                    ))}
                </ul>
              </div>
              )}
            </div>
        </div>
        <div className='half-right-section'>
          <h2>Search Results</h2>
          <div className="search-results-container">
            {error && <div className="error">{error}</div>}
            {wordData && (
              <div className="search-results-box">
                <div className="result-header">
                  <h3 className="result-word">{wordData.lemma}</h3>
                  {/* Audio will be put here later */}
                </div>
                <div className="meaning">
                  <p className="result-definition"><span>Definitions: </span>{wordData.definition}</p>
                  <p> <span className='syn'>Synonyms: </span>{wordData.synonyms && wordData.synonyms.split(', ').join(', ')}</p>
                  <p> <span className='ant'>Antonyms: </span> {wordData.antonyms && wordData.antonyms.split(', ').join(', ')}</p>
                </div>
              </div>
          )}
          </div>
          <br></br>
          <div className="todays-sentence">
          <h2>Today's Sentence</h2>
          {/* Check if randomWord is defined before trying to access its properties */}
          <p>{randomWord ? `${randomWord.lemma}: ${randomWord.definition}` : 'Loading...'}</p>
        </div>
        </div>
      </div>
      <footer className="footer">© 2023 Bitsdictionary.com</footer>
  </div>
  );
};

export default Content;