const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;
    
app.use(express.json()); // Parses HTTP requests in JSON format
    
// Send a GET request to localhost:3000/userData
app.get('/userData', (req, res) => {

    // Send the HTTP response "Hello World!"
    res.send(fetchData());
});
    
// Start the server and log "Server listening on port 3000" on port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

async function fetchData() {
    try {

        // Send a GET request to localhost:3000/userData
        const response = await fetch("http://localhost:3000/userData");

        // If the response is not 200 (OK), throw an HTTP error
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status.toString());
        }

        // Parse the response as JSON and store it in the data variable
        const data = await response.json();

        // Log the data
        console.log(data);

    // Catch any errors
    } catch(e) {

        // Log the error
        console.error("Error: " + e);
    };

    // Return the data, which should be an object containing the username and password inputted
    return data;
};

function queryToDatabase() {
    // Define user as the user object returned from fetchData()
    const user = fetchData();

    // Create a connection to the mySQL database
    const connection = mysql.createConnection({
        host: "localhost",
        database: "users"
    });

    // Connect to the database and log "Connected to database!" if successful. Otherwise, throw an error
    connection.connect(function(e) {
        if (e) throw e;
        console.log("Connected to database!");
    });


    try {
        // Define the query in the query object
        const query = `INSERT INTO user_data (username, password) VALUES (${user.username}, ${user.password});`;

        // Execute the query and log "Query executed successfully!" if successful and close the connection.
        connection.query(query);
        console.log("Query executed successfully!");
        connection.end();

    // Catch any errors
    } catch (e) {
        
        // Log the error
        console.error("Error: " + e);
    };
}