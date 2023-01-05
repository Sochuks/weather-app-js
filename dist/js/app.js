// Get all neccessary elements from DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const cityName = document.querySelector('.city-name');
const cityDate = document.querySelector('.date');
const cityTime = document.querySelector('.time');
const condition = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const form = document.getElementById('location-input');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

// Default city when the page loads
let cityInput = "London";

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

// Function that returns a day of the week from a date
function dayOfTheWeek(day, month, year) {
    // set the days of the week as array
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date('${day}/${month}/${year}').getDay()];
};

// api key
apik = "3045dd712ffe6e702e3245525ac7fa38"

//kelvin to celcius converter
function converter(val){
    return (val - 273).toFixed(2);
}

// converts word to sentence case
function titleCase(val) {
    return val.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }

// function that fetches and displays all data from the weather API
function fetchWeatherData(){
    /*Fetch the data and dynamically add 
    the city name with the template literals */
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityInput+'&appid='+apik)
    
    // get the data in json format and convert to JS object
    .then(response => response.json())
    .then(data => {
        // view data on concole
        console.log(data)

        //get JS objects 
        var tempNew = converter(data.main.temp)
        var conditionNew = data['weather']['0']['description']


        //add the JS objects to page
        temp.innerHTML = tempNew + "&#176;"
        condition.innerHTML = titleCase(conditionNew)
    })

}