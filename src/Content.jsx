import React from "react";
import Autocomplete from "./Autocomplete";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // tabs styles

const Content = ({
  inpWord,
  setInpWord,
  randomWord,
  wordData,
  error,
  isLoading,
  handleSearchWord,
  suggestions,
  onSelectSuggestion,
  searchHistory,
  TOEFL,
  IELTS,
  handleClearHistory,
}) => {
  const blurResultDefinition = () => {
    var wordMeaning = document.getElementsByClassName("result-definition");
    var blurButton = document.getElementById("blurResultDefinitionButton");
    for (var i = 0; i < wordMeaning.length; i++) {
      if (wordMeaning[i].style.backgroundColor === "black") {
        wordMeaning[i].style.backgroundColor = "";
        blurButton.textContent = "Blur Definition";
      } else {
        blurButton.textContent = "Disable blurring";
        wordMeaning[i].style.backgroundColor = "black";
      }
    }
  };

  const onSubmitSearch = (event) => {
    event.preventDefault();
    handleSearchWord(inpWord);
  };

  const handleClickHistory = (term) => {
    setInpWord(term);
    handleSearchWord(term);
  };

  const handleClickIELTS = (lemma) => {
    handleSearchWord(lemma);
  };
  const handleClickTOEFL = (lemma) => {
    handleSearchWord(lemma);
  };

  return (
    <div className="dictionary-app">
      <header className="header">
        <a href="/" className="logo">
          <p>
            BITS <span>- English Dictionary</span>
          </p>
        </a>
        <div className="ath-buttons">
          <button className="au-button">
            <a href="/Login">Login</a>
          </button>
          <button className="au-button">
            <a href="/Signup">Signup</a>
          </button>
        </div>
      </header>

      <form className="search-box" onSubmit={onSubmitSearch}>
        <Autocomplete
          suggestions={suggestions}
          value={inpWord}
          onChange={(value) => setInpWord(value)}
          onSelect={onSelectSuggestion}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Display Main Tabs*/}
      <div className="cross-section">
        <div className="half-left-section">
          {/*Tabs */}
          <Tabs>
            <TabList className={"MainTabs"}>
              <Tab>Search History</Tab>
              <Tab>TOEFL</Tab>
              <Tab>IELTS</Tab>
            </TabList>
            <TabPanel>
              <div className="history-section">
                <div className="search-history-section">
                  <h2>Search History</h2>
                  <button className="au-button" onClick={handleClearHistory}>
                    Clear History
                  </button>
                  {searchHistory.length > 0 ? (
                    <ul>
                      {searchHistory.map((term, index) => (
                        <li
                          key={index}
                          onClick={() => handleClickHistory(term)}
                        >
                          {term}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul> No search history found.</ul>
                  )}
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              {/* Display TOEFL */}
              {TOEFL && TOEFL.length > 0 && (
                <div className="search-history-section">
                  <h2>TOEFL</h2>
                  <ul>
                    {TOEFL.map((lemma, index) => (
                      <li key={index} onClick={() => handleClickTOEFL(lemma)}>
                        {lemma}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {/* Display IELTS */}
              {IELTS && IELTS.length > 0 && (
                <div className="search-history-section">
                  <h2>IELTS</h2>
                  <ul>
                    {IELTS.map((lemma, index) => (
                      <li key={index} onClick={() => handleClickIELTS(lemma)}>
                        {lemma}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabPanel>
          </Tabs>
        </div>

        <div className="half-right-section">
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
                  <p className="result-definition">{wordData.definition}</p>
                  <p>
                    <span className="syn">
                      Synonyms:{" "}
                      {wordData.synonyms ? (
                        wordData.synonyms &&
                        wordData.synonyms.split(", ").join(", ")
                      ) : (
                        <p>"There's no matched synonyms"</p>
                      )}
                    </span>
                  </p>
                  <p>
                    <span className="ant">
                      Antonyms:{" "}
                      {wordData.antonyms ? (
                        wordData.antonyms &&
                        wordData.antonyms.split(", ").join(", ")
                      ) : (
                        <p>"There's no matched antonyms"</p>
                      )}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          <br></br>
          <div className="blur-buttons">
            <div class="blurTooltip">
              <button
                className="au-button"
                id="blurResultDefinitionButton"
                onClick={blurResultDefinition}
                data-tip="Blur Definition"
              >
                Blur Definition
              </button>{" "}
              <span class="blurTooltipText">
                For student who wants to memorize this word!
              </span>
            </div>
          </div>

          <div className="todays-sentence">
            <h2>Today's Sentence</h2>
            {/* Check if randomWord is defined before trying to access its properties */}
            <p>
              {randomWord
                ? `${randomWord.lemma}: ${randomWord.definition}`
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">© 2023 Bitsdictionary.com</footer>
    </div>
  );
};

export default Content;
