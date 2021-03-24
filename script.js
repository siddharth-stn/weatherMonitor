const apiKey = "3c9e099138215f726c813cea590d15e0";

function meterPerSecToKmPerHr (mPerS) {
  return ((mPerS * 18)/5);
}


const getWetherData = async (cityName) => {
  const dataBody = await fetch(
    `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`,
    { mode: "cors" }
  );
  if (dataBody.status >= 200 && dataBody.status <= 299) {
    const dataBodyJson = await dataBody.json();
    return dataBodyJson
  } else {
    console.log(dataBody.status, dataBody.statusText)
    alert("Can't find city name in the database. Please try again.");
  }
};

const goBtn = document.getElementById("goBtn");
const inputBox = document.getElementById("location");
const displayDiv = document.getElementById("display");


goBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const cityName = inputBox.value;
  const response = getWetherData(cityName);
  response.then((data) => {
    //console.log(data.main.temp, data.weather[0].description, data.wind.speed);
    const tempP = document.getElementById("showTemp");
    const cloudsP = document.getElementById("showClouds");
    const windsP = document.getElementById("showWind");

    tempP.innerText  = data.main.temp + " deg cel";
    cloudsP.innerText  = data.weather[0].description;
    windsP.innerText  = meterPerSecToKmPerHr(data.wind.speed).toFixed(2) + " km/hr";
  }); 
});




