//  to get curennt location
window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //  console.log(long, lat)

            const api1 = ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e2f884fa8a1ab0890b157b6631d78580`

            fetch(api1).then(weather1 => {
                return weather1.json();
            }).then(result);

            function result(weather1) {
                var temp0 = weather1.main.temp - 273;
                var temp1 = weather1.main.temp_max - 273;
                var temp2 = weather1.main.temp_min - 273;


                let city = document.querySelector('.location .city');
                city.innerText = `${weather1.name}, ${weather1.sys.country}`;

                let now = new Date();
                let date = document.querySelector('.location .date');
                date.innerText = dateBuilder(now);

                let temp = document.querySelector('.current .temp');
                temp.textContent = `${temp0.toFixed(1)}°c`;

                let weather_el = document.querySelector('.current .weather');
                weather_el.innerText = weather1.weather[0].main;

                let hilow = document.querySelector('.hi-low');
                hilow.textContent = `${temp1.toFixed(1)} °c / ${temp2.toFixed(1)} °c`;
            }
        })


    }
});

// search
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
const api = {
    key: "e2f884fa8a1ab0890b157b6631d78580",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    var temp2 = weather.main.temp - 273;
    var temp21 = weather.main.temp_max - 273;
    var temp22 = weather.main.temp_min - 273;


    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.textContent = `${temp2.toFixed(1)}°c`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.textContent = `${temp21.toFixed(1)} °c / ${temp22.toFixed(1)} °c`;
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