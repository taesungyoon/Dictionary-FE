import React from 'react';
import Autocomplete from './Autocomplete';

const Content = ({
  inpWord,
  setInpWord,
  displayedWord,
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
        <p>English Dictionary</p>
        <h1>BITS</h1>
        <button className="sign-up-button">Sign Up</button>
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
              <h3 className="result-word">{wordData.lemma}</h3>
              {/* Audio will be put here later */}
            </div>
            <div className="meaning">
              <p className="result-definition">{wordData.definition}</p>
              <p>Synonyms: {wordData.synonyms && wordData.synonyms.split(', ').join(', ')}</p>
              <p>Antonyms: {wordData.antonyms && wordData.antonyms.split(', ').join(', ')}</p>
            </div>
          </div>
        )}
      </div>
      <footer className="footer">© 2023 Bitsdictionary.com</footer>
    </div>
  );
};

export default Content;