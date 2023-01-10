// Get neccessary elemnts from page
const app = document.querySelector('.weather-app');
const cityDate = document.querySelector('.date');
const cityTime = document.querySelector('.time');
const form = document.getElementById('location-input');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit-btn');
const cities = document.querySelectorAll('.city');

// Default city when the page loads
let cityInput = "london";

// Add click event listener to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // Change from default to clicked city
        cityInput = e.target.innerHTML;
        // Function to get and display all data from weather API
        fetchWeatherData();
        // Add opacity app
        app.getElementsByClassName.opacity = "0";
    });
})

// Add submit event listener to the form
form.addEventListener('submit', (e) => {
    // check if search box is empty
    if (search.value.length == 0) {
        alert('Please type in a city name')
    }else{
        // Change from default to search city
        cityInput = search.value; 
        // Function to get and display all data from weather API
        fetchWeatherData();
       // Remove all the text from search input
       search.value = "";
        // fade out the app
        app.getElementsByClassName.opacity = "0"
    }

        // prevents the default behaiviour of the form
        e.preventDefault();
});

//function that returns current time & date
function currentDate(timezoneIn, dtIn){
    let dateTime = new Date(dtIn*1000 + (timezoneIn*1000));
    // Convert into 24-hour format
    let hour = (dateTime.getHours() % 12) - 3;
    let ampm = hour >= 12 ? 'pm' : 'am';

    let weekday = dateTime.toLocaleString('default', {weekday: 'long'});
    let month = dateTime.toLocaleString('default', {month: 'short'}); 
    let date = dateTime.getDate();

    return weekday+', '+month+' '+date;
}

//get city time
const getTime = (timezone) => {
    const localTime = new Date().getTime()
    const localOffset = new Date().getTimezoneOffset() * 60000
    const currentUtcTime = localOffset + localTime
    const cityOffset = currentUtcTime + 1000 * timezone
    const cityTime = new Date(cityOffset).toTimeString().split(' ')
    return cityTime[0]
  }

//   get time of the day
  function isDay(timezoneIn, dtIn){
    let dateTime = new Date(dtIn*1000 + (timezoneIn*1000));
    // Convert into 24-hour format
    let hour = dateTime.getHours();
    const isDayTime = hour > 6 && hour < 20;
    if (isDayTime == false){
        return timeOfDay = 'night'
    }else{
        return timeOfDay = 'day'
    }
   
  }

  // api key
apik = "3045dd712ffe6e702e3245525ac7fa38"

// function that fetches and displays all data from the weather API
function fetchWeatherData(){
        /*Fetch the data and dynamically add 
    the city name with the template literals */
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityInput+'&appid='+apik+'&units=metric')
    
    // get the data in json format and convert to object
    .then(response => response.json())
    .then(result => weatherDetails(result))
}

function weatherDetails(data){
    let cod;
    if(data.cod == "404"){
        alert("city does not exist!")
    }else{
        // get details from js object
        const city = data.name;
        const {feels_like, humidity, temp} = data.main; 
        const wind = data.wind.speed;
        const {description, icon, id} = data.weather[0];
        const timezone = data.timezone;
        const dt = data.dt;

        // pass values to HTML element
        document.querySelector('.condition').innerHTML = description.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());;
        document.querySelector('.temp').innerHTML = Math.floor(temp) + "&#176;";
        document.querySelector('.feels').innerHTML = feels_like + "&#176;";
        document.querySelector('.humidity').innerHTML = humidity + '%';
        document.querySelector('.city-name').innerHTML = city;
        document.querySelector('.wind').innerHTML = wind + "km/hr";
        document.querySelector('.time').innerHTML = getTime(timezone);
        document.querySelector('.date').innerHTML = currentDate(timezone, dt);
        
        // get time of day from selected country
       timeOfDay = isDay(timezone, dt)
      // console.log(timeOfDay)
       
        //change background and icon by weather condition
        
        // clear
        if (id == 800){

            // set background to clear
            
            app.style.backgroundImage = `url(../dist/img/${timeOfDay}/clear.JPG)`;

            // set icon
            document.querySelector('.icon').innerHTML = `<img src="dist/img/icon/clear.svg">`

            // set search button
            if (timeOfDay == "night"){
                btn.style.background = "#fff"
                btn.style.color = "hsla(232, 100%, 74%, 1)"
            }
            
        }
        // thunderstorms
        else if(id >= 200 && id <= 232){
            
            // set background to thunder
            app.style.backgroundImage = `url(../dist/img/${timeOfDay}/thunder.JPG)`;

            // set icon
            document.querySelector('.icon').innerHTML = `<img src="dist/img/icon/thunderstorm.svg">`

            // set search button
            if (timeOfDay == "night"){
                btn.style.background = "#fff"
                btn.style.color = "hsla(232, 100%, 74%, 1)"
            }
        }
        // snow
        else if(id >= 600 && id <= 622){
            
            // set background to snow
            app.style.backgroundImage = `url(../dist/img/${timeOfDay}/snow.JPG)`;

            // set icon
            document.querySelector('.icon').innerHTML = `<img src="dist/img/icon/snow.svg">`

            // set search button
            if (timeOfDay == "night"){
                btn.style.background = "#fff"
                btn.style.color = "hsla(232, 100%, 74%, 1)"
            }
        }
        // fog
        else if(id >= 701 && id <= 781){
            
            // set background to fog
            app.style.backgroundImage = `url(../dist/img/${timeOfDay}/fog.JPG)`;

            // set icon
            document.querySelector('.icon').innerHTML = `<img src="dist/img/icon/fog.PNG">`

            // set search button
            if (timeOfDay == "night"){
                btn.style.background = "#fff"
                btn.style.color = "hsla(232, 100%, 74%, 1)"
            }
        }
        // clouds
        else if(id >= 801 && id <= 804){
            
            // set background to clouds
            app.style.backgroundImage = `url(../dist/img/${timeOfDay}/cloud.JPG)`;

            // set icon
            document.querySelector('.icon').innerHTML = `<img src="dist/img/icon/cloud.svg">`

            // set search button
            if (timeOfDay == "night"){
                btn.style.background = "#fff"
                btn.style.color = "hsla(232, 100%, 74%, 1)"
            }
        }
        // rain
        else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            
            // set background to rain
            app.style.backgroundImage = `url(../dist/img/${timeOfDay}/rain.JPG)`;

            // set icon
            document.querySelector('.icon').innerHTML = `<img src="dist/img/icon/rain.svg">`

            // set search button
            if (timeOfDay == "night"){
                btn.style.background = "#fff"
                btn.style.color = "hsla(232, 100%, 74%, 1)"
            }
        }


        // display on console
        console.log(data);
    }
    app.style.opacity = "1"; 
}

fetchWeatherData();