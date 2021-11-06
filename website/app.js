/* Global Variables */
let weatherData;
let locationHistory;
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "e1bbf5369528306233184a0bc1aa8b26";
const locationData = {
  zipCode: "",
  country: "au"

};

// Create a new date instance dynamically with JS
const storeAndGet = () => {
  createLocationData();
  sendLocationData("/newWeatherEntry", locationData);
  fetchWeatherData(locationData.zipCode, locationData.country);
  getStoredLocationData("/locationDataHistory");
  //updateRecentEntry();

}

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

const createLocationData = () => {
  const zipCode = document.getElementById("zip").value;
  if (!zipCode.match("[0-9]+")) {
    console.log("Invalid Zipcode/Postcode, Please Only Input Numbers");
  } else {
    locationData.zipCode = zipCode;

  }

}

const fetchWeatherData = async (zipCode, country) => {
  const res = await fetch("http://" + baseURL + zipCode + "," + country + "&appid=" + apiKey); // the "//" forces the fetch to search WWW, otherwise it goes through localhost

      try {
          weatherData = await res.json();
          console.log(weatherData);
          return weatherData;

      } catch(error) {
          console.log("error", error);

      }

}

const getStoredLocationData = async (url) => {
  const res = await fetch(url);

  try {
    locationHistory = res.json();
    console.log(newData);
    return newData;

  } catch(error) {
    console.log("error", error);

  }

}

/* const updateRecentEntry = () => {
  const dateDiv = document.getElementById("date")
  dateDiv.innerText = weatherData.

} */