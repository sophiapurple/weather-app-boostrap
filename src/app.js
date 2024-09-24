function time(timeStamp){
let currentTime  = new Date(timeStamp * 1000);
let date = currentTime.getDate();
let year= currentTime.getFullYear();
let hours = currentTime.getHours();
   if (hours < 10){
      hours= `0${hours}`
}
    else{
        hours = hours;
    } 
    
    let mins = currentTime.getMinutes();
   if (mins < 10){
      mins= `0${mins}`
}
    else{
        mins = mins;
    } 

    let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    let day = currentTime.getDay();
    let currentDay = days[day];

    let months = ["Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","sep","oct","Nov","Dec"];
    let month = currentTime.getDay();
    let currentMonth = months[month];

    return `${currentDay}, ${date} ${currentMonth} ${year}`

}




function showWeather(response){
    console.log(response.data);
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = `${Math.round(response.data.temperature.current)}°`;
  let iconElement = document.querySelector("#icon");
  let icon =`<span>
  <img src="${response.data.condition.icon_url}" 
  class="weather-icon"/></span>`
    iconElement.innerHTML = icon;
    let humidityElement = document.querySelector("#humidity");
    let humidity = Math.round(response.data.temperature.humidity);
   let humid =`<span class="humid">${humidity}%</span>`
    humidityElement.innerHTML = `Humidity: ${humid} `;
    let windElement = document.querySelector("#wind");
    let wind = Math.round(response.data.wind.speed);
    let winds=`<span class="winds">${wind}km</span>`
    windElement.innerHTML = `Wind: ${winds} `
    let cityElement = document.querySelector("#city");
    let city = response.data.city;
    cityElement .innerHTML = city;
    let dateElement = document.querySelector("#time");
    dateElement.innerHTML = time(response.data.time);

    searchForcast(city);

}

function formatDay(day){
    let now = new Date(day * 1000);
    let days = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
    let showDay = now.getDay();
    return days[showDay];
    

}

  function showForcast(response){
    console.log(response.data);
    let forcastElement = document.querySelector("#forcast");
    let forcastHtml = "";
    
        response.data.daily.forEach(function(day, index){
            if (index < 7){
                forcastHtml +=`
                            <div class="forcastWrapper">
                  <div class="day">${formatDay(day.time)}</div>
                  <div class="icon"><img src="${day.condition.icon_url}" alt=""></div>
               <div class="temperature">
                <div class="temp pe-2">${Math.round(day.temperature.maximum)}°</div>
                <div class="temp min-temp">${Math.round(day.temperature.minimum)}°</div>
        
               </div>
                </div>`
        }})

        forcastElement.innerHTML = forcastHtml;
       
    }
  


    function searchForcast(city){
        let apiKey ="93cf0a589b1befff9b43f05fbt79bo02"
    let forcastUrl= `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`  
    
  axios.get(forcastUrl).then(showForcast);

}


function searchCity(city){
    let apiKey="93cf0a589b1befff9b43f05fbt79bo02"
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(showWeather);
    
}

function handleSubmit(event){
    event.preventDefault();
    let textInput= document.querySelector("#input-text");
    let city = textInput.value
    searchCity(city);

}



let form = document.querySelector("form");
form.addEventListener("submit",handleSubmit);


searchCity("lagos")