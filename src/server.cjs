const express = require("express");

const app = express();
const port = 3000;
    
app.use(express.json()); // Parses HTTP requests in JSON format
    
// Send a GET request to localhost:3000/ (aka root)
app.get('/userData', (req, res) => {

    // Send the HTTP response "Hello World!" to the root
    res.send('Hello World!');
});
    
// Start the server and log "Server listening on port 3000" on port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});