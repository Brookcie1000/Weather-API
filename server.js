// Setup empty JS object to act as endpoint for all routes
let projectData = ["test1","test2"];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { nextTick } = require("process");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));


// Setup Server
const listening = () => {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
    
}

const port = 8000;
const server = app.listen(port, listening);

// Testing GET requests
const getWorked = (req,res) => {
    res.send(console.log("GET Worked from server!"));

}

app.get("/", getWorked);