import React, { useState } from 'react';
import Content from './Content';
import './App.css';

const Dictionary = () => {
  const [inpWord, setInpWord] = useState('');
  const [displayedWord, setDisplayedWord] = useState('');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchWord = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setDisplayedWord(inpWord);

    fetch(`/search/${inpWord}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Word not found in the database.');
        }
        return response.json();
      })
      .then(data => {
        const newData = {
          lemma: data.lemma,
          meanings: [{
            definitions: [{ definition: data.definition }],
            synonyms: data.synonyms ? data.synonyms.split(', ') : [],
            antonyms: data.antonyms ? data.antonyms.split(', ') : []
          }]
        };
        setWordData(newData);
        setIsLoading(false);
      })
      .catch(error => {
        setWordData(null);
        setError(error.message);
        setIsLoading(false);
      });
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
    />
  );
};

export default Dictionary;

