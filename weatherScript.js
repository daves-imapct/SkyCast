const apiKey = "d1b79762577f69a6dad52d061b027282";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-container input");
const searchBtn = document.querySelector(".search-container button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherInfo = document.querySelector(".weather-info");
const weatherBackground = document.querySelector(".weather");
// const forecastIcon = document.querySelector(".forecast-img")

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "flex";
            document.querySelector(".main").style.display = "none";
            weatherBackground.style.background = "black"
        } else {
            const data = await response.json();


            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity-value").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind-speed-value").innerHTML = data.wind.speed + "km/h";
            document.querySelector(".pressure-value").innerHTML = data.main.pressure + "hPa";
            document.querySelector(".visibility-value").innerHTML = data.visibility+ "m";
            weatherInfo.innerHTML = data.weather[0].description;
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/icons/day/cloudy.png";
                weatherBackground.style.background = "url(./images/background/day/cloudy.jpg)";
                weatherBackground.style.backgroundSize = "cover";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/icons/day/rainy.png";
                weatherBackground.style.background = "url(./images/background/day/rainy.jpg)";
                weatherBackground.style.backgroundSize = "cover";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/icons/day/clear.png";
                weatherBackground.style.background = "url(./images/background/day/clear.jpg)";
                weatherBackground.style.backgroundSize = "cover";
            }else if (data.weather[0].main == "Snow") {
                weatherIcon.src = "images/icons/day/snowy.png";
                weatherBackground.style.background = "url(./images/background/day/snowy.jpg)";
                weatherBackground.style.backgroundSize = "cover";
            }else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/icons/day/mist.png";
                weatherBackground.style.background = "url(./images/background/day/mist.jpg)";
                weatherBackground.style.backgroundSize = "cover";
            }else if(data.weather[0].main == "Haze") {
                weatherIcon.src = "images/icons/day/haze.png";
                weatherBackground.style.background = "url(./images/background/day/haze.jpg)";
                weatherBackground.style.backgroundSize = "cover";
            }

            document.querySelector(".main").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "flex";
        document.querySelector(".main").style.display = "none";
        weatherBackground.style.background = "black";
    }
}
// Function to fetch weather data for a specific city and time of day
function getDailyForecasts1(apiKey, city, preferredTime,index) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const dailyForecasts = {};

      data.list.forEach(forecast => {
        // Extract the date (without the time)
        const date = forecast.dt_txt.split(' ')[0];

        // Select a forecast time (e.g., 12:00 PM)
        if (forecast.dt_txt.includes(preferredTime)) {
          dailyForecasts[date] = forecast;
        }
      });

      // Convert the dailyForecasts object to an array
      const filteredForecasts = Object.values(dailyForecasts);

        const forecast = filteredForecasts[index];
        if (forecast) {
          const date = forecast.dt_txt.split(' ')[0];
          const temp = forecast.main.temp;
          const description = forecast.weather[0].description;

          // Update HTML elements for days 2, 3, 4, and 5
          document.getElementById(`date${index + 1}`).textContent = date;
          document.getElementById(`temp${index + 1}`).textContent = `${temp}°C`;
          document.getElementById(`desc${index + 1}`).textContent = description;

          document.getElementById(`desc${index + 1}`).style.textTransform="Capitalize"
          document.getElementById(`desc${index + 1}`).style.marginTop="10px"

          const forecastIcon = document.getElementById(`icon${index + 1}`);
            if (forecast.weather[0].main == "Clouds") {
                forecastIcon.src = "images/icons/day/cloudy.png";
            } else if (forecast.weather[0].main == "Rain") {
                forecastIcon.src = "images/icons/day/rainy.png";
            } else if (forecast.weather[0].main == "Clear") {
                forecastIcon.src = "images/icons/day/clear.png";
            } else if (forecast.weather[0].main == "Snow") {
                forecastIcon.src = "images/icons/day/snowy.png";
            } else if (forecast.weather[0].main == "Mist") {
                forecastIcon.src = "images/icons/day/mist.png";
            } else if (forecast.weather[0].main == "Haze") {
                forecastIcon.src = "images/icons/day/haze.png";
            }
        }
    })

  }
  
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
    getDailyForecasts1(apiKey,searchBox.value.trim() , preferredTime = '12:00:00',0);
    getDailyForecasts1(apiKey,searchBox.value.trim() , preferredTime = '12:00:00',1);
    getDailyForecasts1(apiKey,searchBox.value.trim() , preferredTime = '12:00:00',2);
    getDailyForecasts1(apiKey,searchBox.value.trim() , preferredTime = '12:00:00',3);
    getDailyForecasts1(apiKey,searchBox.value.trim() , preferredTime = '12:00:00',4);
});
