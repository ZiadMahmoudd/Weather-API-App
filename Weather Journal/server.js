// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Initialize all route with a callback function

// POST Route

app.post('/addData', (req, res) => {
   projectData.date = req.body.date;
   projectData.temp = req.body.temp;
   projectData.content = req.body.content;
   res.send(projectData);
});

// GET Route

app.get('/allData', (req, res) => {
   res.send(projectData);
});
// listen to the server port

app.listen(port, () => {
   console.log(`your server is runing now in server ${port}`);
});
