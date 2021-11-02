/* Global Variables */

// Create a new date instance dynamically with JS
//let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async ( url = '') => {
    const res = await fetch(url);

    try {
        const data = await stringify(res);
        console.log(data);
    } catch(error) {
      console.log("error", error);
      }
  }

postData("/");