
const searchCity = () => {
    let cityName = document.querySelector('input[type="search"]');
    cityName.addEventListener('search', function(){
        let uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=b6da07b586c74f894574df86a71eb5f5`
        fetch(uri, { mode: "cors"})
            .then(res => {
                !res.ok ? res.statusText : Error(res.status)
                return res.json();
            })
            .then(data => { data
                let city = document.getElementById("city").innerText = data.name;
                let temp = document.getElementById("temp").innerText = data.main.temp;
                let weather = document.getElementById("weather").innerText = data.weather[0].main; 
                return data;
            })
            .catch(error => error)
    })
};
searchCity();

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}