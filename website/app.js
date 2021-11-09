/* Global Variables */
let weatherHistory;
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "e1bbf5369528306233184a0bc1aa8b26&units=metric";
const locationData = {
  zipCode: "",
  country: "au" //change this to use on different countries

};

// Runs when 'generate' is clicked.
const storeAndGet = () => {
  createLocationData();
  let weatherData = fetchWeatherData(locationData.zipCode, locationData.country);

}

// Sends the location data to the server to be stored.
const sendLocationData = async ( url = '', data = {})=>{
  const res = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
     // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

  try {
    const newData = await res;
    console.log("Server has stored the location data");
    return res;

  } catch(error) {
    console.log("error", error);
  }
}

// Create the data to be sent to the API and save to server.
const createLocationData = () => {
  const zipCode = document.getElementById("zip").value;
  if (!zipCode.match("[0-9]+")) {
    const zipDiv = document.getElementById("zip");
    zipDiv.value = "";
    zipDiv.placeholder = "Please input 4 digit zipcode (0-9)" //check for valid zip code
  } else {
    locationData.zipCode = zipCode;

  }

}

// Contacts the API weather and generates data based on zipcode.
const fetchWeatherData = async (zipCode, country) => {
  const res = await fetch("http://" + baseURL + zipCode + "," + country + "&appid=" + apiKey); // the "//" forces the fetch to search WWW, otherwise it goes through localhost

    try {
      weatherData = await res.json();
      const feelingsBox = document.getElementById("feelings");
      const dateDiv = document.getElementById("date");
      const tempDiv = document.getElementById("temp");
      const contentDiv = document.getElementById("content");
      weatherData.main.date = new Date(); //add in date to weatherData
      if (feelingsBox.value === "") { //Check that the 'feelings' box isn't empty
        feelingsBox.placeholder = "Please input a feeling.";
        feelingsBox.style = ""
       } else {
        weatherData.main.feeling = feelingsBox.value;
        dateDiv.innerHTML = "Date: " + weatherData.main.date.toLocaleDateString();
        tempDiv.innerHTML = "Current Temperature: " + weatherData.main.temp.toFixed() + " °C";
        contentDiv.innerHTML = `As of ${weatherData.main.date.toLocaleTimeString()} at ${weatherData.name} it's ${weatherData.main.temp.toFixed()} °C, with a high of ${weatherData.main.temp_max.toFixed()} °C and a low of ${weatherData.main.temp_min.toFixed()} °C. Is that why you're feeling ${feelingsBox.value.toLowerCase()}?`
        sendLocationData("/newWeatherEntry", weatherData);
        getStoredWeatherData("/weatherDataHistory");
        return weatherData;};
                  
      } catch(error) {
        const zipDiv = document.getElementById("zip");
        zipDiv.value = "";
        zipDiv.placeholder = "Please input 4 digit zipcode (0-9)" //spit out error and remind of valid zipcode if we get error from the API weather.
        console.log("error", error);

    }

}

// Return the stored data from the server, includes all past inputs of zipcodes and countries
const getStoredWeatherData = async (url) => {
  const res = await fetch(url);

  try {
    weatherHistory = res.json();
    console.log(`The server has sent your latest input`);
    return weatherHistory;

  } catch(error) {
    console.log("error", error);

  }

}