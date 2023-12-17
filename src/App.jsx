import React, { useState, useEffect } from 'react';
import Content from './Content';
import './App.css';

const Dictionary = () => {
  const [inpWord, setInpWord] = useState('');
  const [displayedWord, setDisplayedWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inpWord.length > 1) {
      fetch(`/autocomplete/${inpWord}`) 
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [inpWord]);
  
  const handleSearchWord = (wordToSearch) => {
    setIsLoading(true);
    setError('');
    setDisplayedWord(wordToSearch);
  
    fetch(`/search/${wordToSearch}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Word not found in the database.');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the API returns an object with lemma, synonyms, antonyms, and definitions
        setWordData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setWordData(null);
        setError(error.message);
        setIsLoading(false);
      });
  };


  const onSelectSuggestion = (suggestion) => {
    setInpWord(suggestion);
    handleSearchWord(suggestion); 
  };

  return (
    <Content
      inpWord={inpWord}
      setInpWord={setInpWord}
      displayedWord={displayedWord}
      wordData={wordData}
      error={error}
      isLoading={isLoading}
      handleSearchWord={handleSearchWord}
      suggestions={suggestions}
      onSelectSuggestion={onSelectSuggestion}
    />
  );
};
export default Dictionary;

