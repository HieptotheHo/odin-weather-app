import "./style.css";

import Icon from "./assets/photos/64x64/day/113.png";

async function getDataByLocation(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=3bddd841d668473992d161244240704&q=${location}&days=6`,
    {
      mode: "cors",
    }
  );
  return response;
}
await getDataByLocation("ho chi minh");
const searchBar = document.querySelector("form>input");
const todayContainer = document.querySelector("#today");
const forecastContainer = document.querySelector("#forecast");
const loader = document.querySelector("#loader");
document.querySelector("form").addEventListener("submit", async (e) => {
  const card = document.createElement("div");
  card.classList.add("card");

  e.preventDefault();
  const location = searchBar.value;
  loader.showModal();
  await getDataByLocation(location)
    .then((response) => response.json())
    .then((data) => {
      todayContainer.innerHTML = ``;
      forecastContainer.innerHTML = ``;
      const { current } = data;
      const { forecast } = data;

      card.innerHTML = `
      <div class="date">
        <p>${current.last_updated.split(" ")[0]}</p>
      </div>
      <div class="demonstration">
        <img src="${current.condition.icon}" alt="" />
      </div>
      <div class="detail">
        <div class="temp des">
          <p>Temperature</p>
          <p>${current.temp_c}</p>
        </div>
        <div class="humidity des">
          <p>Humidity</p>
          <p>${current.humidity}</p>
        </div>
        <div class="uv des">
          <p>UV</p>
          <p>${current.uv}</p>
      `;
      todayContainer.appendChild(card);
      forecast.forecastday.forEach((forecastDay) => {
        const forecastCard = document.createElement("div");
        forecastCard.classList.add("card");
        forecastCard.innerHTML = `
      <div class="date">
        <p>${forecastDay.date}</p>
      </div>
      <div class="demonstration">
        <img src="${forecastDay.day.condition.icon}" alt="" />
      </div>
      <div class="detail">
        <div class="temp des">
          <p>Temperature</p>
          <p>${forecastDay.day.maxtemp_c}</p>
        </div>
        <div class="humidity des">
          <p>Humidity</p>
          <p>${forecastDay.day.avghumidity}</p>
        </div>
        <div class="uv des">
          <p>UV</p>
          <p>${forecastDay.day.uv}</p>
      `;
        forecastContainer.appendChild(forecastCard);
      });
    });
  loader.close();
});
