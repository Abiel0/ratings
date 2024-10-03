const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors({
    origin: true, // Allow any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'], // Allow more headers
    credentials: true // Allow cookies
}));

app.use(express.json());

let ratings = {
    totalStars: 0,
    totalRatings: 0
};

app.get('/ratings', (req, res) => {
    res.json(ratings);
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve the HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/ratings', (req, res) => {
    const { rating } = req.body;
    if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
        ratings.totalStars += rating;
        ratings.totalRatings += 1;
        res.json({ message: 'Rating added successfully', ratings });
    } else {
        res.status(400).json({ message: 'Invalid rating' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});