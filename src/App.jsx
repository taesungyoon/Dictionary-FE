import React, { useState } from 'react';
import Content from './Content';
import './App.css';

const Dictionary = () => {
  // search inputword
  const [inpWord, setInpWord] = useState('');

  // keeps the search result to stay the same no change.
  const [displayedWord, setDisplayedWord] = useState('');
  const [wordData, setWordData] = useState(null);

// fix the duplicate
  const [allSynonyms, setAllSynonyms] = useState([]);
  const [allAntonyms, setAllAntonyms] = useState([]);

// loading api
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

// audio api
  const [audioUrl, setAudioUrl] = useState('');


  const handleSearchWord = (event) => { 
    event.preventDefault(); 
    setIsLoading(true);
    setError('');
    setDisplayedWord(inpWord);
    fetch(`/search/${inpWord}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('implement a fault tolerance for words that are not found using database.');
        }
        return response.json();
      })
      .then(data => {
        const wordInfo = data[0];
        setWordData(wordInfo);
        
        const audioEntry = wordInfo.phonetics.find(phonetic => phonetic.audio);
    setAudioUrl(audioEntry ? audioEntry.audio : '');

    
        let synonyms = [];
        let antonyms = [];
        data[0].meanings.forEach(meaning => {
          if (meaning.synonyms) {
            synonyms.push(...meaning.synonyms);
          }
          if (meaning.antonyms) {
            antonyms.push(...meaning.antonyms);
          }
        });
      // srote an array of all the synonyms and anyonyms into 1 section in th output
        setAllSynonyms([...new Set(synonyms)]);
        setAllAntonyms([...new Set(antonyms)]);
        setIsLoading(false);
      })
      
      .catch(error => {
        setWordData(null);
        setAllSynonyms([]);
        setAllAntonyms([]);
        setError(error.message);
        setIsLoading(false);
      });
  };
  return (
    <Content
      inpWord={inpWord}
      setInpWord={setInpWord}
      displayedWord={displayedWord}
      audioUrl={audioUrl}
      handleAudioPlay={() => new Audio(audioUrl).play()}
      wordData={wordData}
      allSynonyms={allSynonyms}
      allAntonyms={allAntonyms}
      error={error}
      isLoading={isLoading}
      handleSearchWord={handleSearchWord}
    />
  );
};

export default Dictionary;
