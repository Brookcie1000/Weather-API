/* Global Variables */
let baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "e1bbf5369528306233184a0bc1aa8b26";
let country = "";
let zipCode = "";

// Create a new date instance dynamically with JS

const postData = async ( url = '', data = {})=>{
    console.log("postData has activated and sent:");
    console.log(data);
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
        const newData = await res.json();
        console.log("Server has responded and sent:");
        console.log(newData)
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}

  const getData = async (zipCode,country) => {
    console.log(baseURL + zipCode + "," + country + "&appid=" + apiKey);
    const res = await fetch("//" + baseURL + zipCode + "," + country + "&appid=" + apiKey);

        try {
            const weatherData = await res.json();
            console.log(weatherData);
            return weatherData;

        } catch(error) {
            console.log("error", error);

        }

  }

postData("/add",{test: "test text"});
getData("2088","au");