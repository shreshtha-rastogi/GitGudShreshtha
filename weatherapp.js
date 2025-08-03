document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");

  const apiKey = "becb21dba5064e97a50200058252307"; // User-provided API key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert("City not found. Try again.");
        return;
      }

      const weatherResult = document.getElementById("weatherResult");
      const additionalInfo = document.getElementById("additionalInfo");

      weatherResult.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p><img class="icon" src="${data.current.condition.icon}" alt="Weather icon"> ${data.current.condition.text}</p>
        <p>Temperature: ${data.current.temp_c} °C</p>
        <p>Feels like: ${data.current.feelslike_c} °C</p>
      `;

      additionalInfo.innerHTML = `
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind: ${data.current.wind_kph} kph from ${data.current.wind_dir}</p>
        <p>UV Index: ${data.current.uv}</p>
        <p>Last Updated: ${data.current.last_updated}</p>
      `;
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    });
});
