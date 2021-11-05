/* Global Variables */
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "e1bbf5369528306233184a0bc1aa8b26";
const weatherData = {
  zipCode: "",
  country: "au"

};

// Create a new date instance dynamically with JS
const storeAndGet = () => {
  createLocationData();
  sendLocationData("/newWeatherEntry", weatherData);
  getLocationData();
  fetchWeatherData(weatherData.zipCode, weatherData.country);

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

  } catch(error) {
    console.log("error", error);
  }
}

const createLocationData = () => {
  const zipCode = document.getElementById("zip").value;
  if (!zipCode.match("[0-9]+")) {
    console.log("Invalid Zipcode/Postcode, Please Only Input Numbers");
  } else {
    weatherData.zipCode = zipCode;

  }

}

const fetchWeatherData = async (zipCode, country) => {
  const res = await fetch("http://" + baseURL + zipCode + "," + country + "&appid=" + apiKey); // the "//" forces the fetch to search WWW, otherwise it goes through localhost

      try {
          const weatherData = await res.json();
          console.log(weatherData);
          return weatherData;

      } catch(error) {
          console.log("error", error);

      }

}