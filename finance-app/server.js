const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware for parsing JSON bodies

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
