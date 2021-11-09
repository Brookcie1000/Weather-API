// Setup empty JS object to act as endpoint for all routes
let projectData = {};

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
const storeLocationData = (req,res) => {
    console.log("=====================");
    console.log(`Client has sent data:`);
    console.log(req.body);
    projectData["date"] = req.body.main.date;
    projectData["temperature"] = req.body.main.temp;
    projectData["feeling"] = req.body.main.feeling;
    console.log(projectData);
    res.send("Data Stored");
}

const sendLocationData = (req,res) => {
    console.log("=====================");
    console.log("Client has requested location data.");
    res.send(projectData);
}

app.post("/newWeatherEntry", storeLocationData);
app.get("/weatherDataHistory", sendLocationData);