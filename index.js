const cities = ['Abuja', 'Kano','Ibadan','Jos','Lagos', 'Port Harcourt','Kogi','Enugu', 'Anambra', 'Kaduna','Bauchi'];
let currentIndex = 0;

const API_KEY = '27d6263a9d692c31b3d799fc002fa955';

const cityName = document.getElementById('city-name');
const temp = document.getElementById('temperature');
const desc = document.getElementById('description');
const iconEl = document.getElementById('weather-icon')
const timeInfo = document.getElementById('time');
const cityCounter = document.getElementById('city-counter');
const video = document.getElementById('background-video');
const forecastContainer = document.getElementById('forecast');

// Change background video based on condition
function setVideo(condition) {
  let videoSrc = 'weatherVideos/sunny.mp4';
  const lower = condition.toLowerCase();

  if (lower.includes("rain")) videoSrc = "weatherVideos/rainy.mp4";
  else if (lower.includes("cloud")) videoSrc = "weatherVideos/sunny.mp4";
  else if (lower.includes("sunrise")) videoSrc = "weatherVideos/sunrise.mp4";
  else if (lower.includes("clear")) videoSrc = "weatherVideos/sunny.mp4";
  else if (lower.includes("sunset")) videoSrc = "weatherVideos/sunset.mp4";
  else if (lower.includes("thunderstorm")) videoSrc = "weatherVideos/thunderstorm.mp4";
  else if (lower.includes("mist") || lower.includes("fog")) videoSrc = "weatherVideos/fog.mp4";

  video.src = videoSrc;
  video.load();
  video.play();
}

async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    // cw
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const time = new Date().toLocaleString();
    const iconCode = data.weather[0].icon
     iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt = description;

    // ui
    cityName.textContent = city;
    temp.textContent = `${temperature}°C`;
    desc.textContent = description;
    timeInfo.textContent = time;
    cityCounter.textContent = `${currentIndex + 1} of ${cities.length}`;

    // bv
    setVideo(description);


  } catch (err) {
    cityName.textContent = 'Error fetching weather';
    console.error(err);
  }
}

// Buttons
document.getElementById('prev-btn').onclick = () => {
  currentIndex = (currentIndex - 1 + cities.length) %  cities.length;
  fetchWeather(cities[currentIndex]);
};

document.getElementById('next-btn').onclick = () => {
  currentIndex = (currentIndex + 1) % cities.length;
  fetchWeather(cities[currentIndex]);
};

// Initial load
fetchWeather(cities[currentIndex]);