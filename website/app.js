/* Global Variables */

// Create a new date instance dynamically with JS

const url = "/fakeAPI";

const getData = async (url) => {
    const res = await fetch(url);

    try {
        const data = await res.json();
        console.log(data);
    } catch(error) {
      console.log("error", error);
      }
  }