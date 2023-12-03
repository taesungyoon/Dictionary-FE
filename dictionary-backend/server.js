const express = require('express');
const cors = require('cors'); // Enable CORS for your frontend

const app = express();
const port = 3001; // You can choose any available port

app.use(cors()); // Enable CORS for all routes

// Dummy data as a placeholder. Replace this with your actual database logic.
const searchResults = [
  { id: 1, lemma: 'Example', synonyms: 'Sample, Model', antonyms: 'Opposite, Counterpart', definition: 'An instance illustrating a rule or method' },
  // Add more dummy data as needed
];

const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'C:/Users/Tung Do/my-dictionary-app/public/index.html'));

});


app.get('/search', (req, res) => {
  // Simulate a delay to mimic a real API call
  setTimeout(() => {
    const searchTerm = req.query.term.toLowerCase();
    const filteredResults = searchResults.filter(result => result.lemma.toLowerCase().includes(searchTerm));
    res.json(filteredResults);
  }, 500); // Delay in milliseconds
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
