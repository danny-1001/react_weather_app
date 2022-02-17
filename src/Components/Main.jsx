import React from "react";

const apiKey = "872b5f73ccc15cbbe182e6efae6c3cdb";

let temp_current = $("#temp_current");
let temp_real = $("#temp_real");
let temp_low = $("#temp_low");
let temp_high = $("#temp_high");
let conditions_current = $("#conditions_current");
let conditions_forecast = $("#conditions_forecast");
let wind = $("#wind");
let city_name = $("#city_name");

let city_search = $("#city_search");
let temp_search = $("#temp_search");

function titleCase(string) {
  let sentence = string.toLowerCase().split(" ");
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

$("#weather_form").on("submit", function (e) {
  e.preventDefault();
  if (city_search.val() && temp_search.val()) {
    var units;
    var windAbbrev;
    var tempSymbol;

    if (temp_search.val() === "fahrenheit") {
      units = "imperial";
      tempSymbol = "&deg;";
      windAbbrev = "mph";
    } else if (temp_search.val() === "celcius") {
      units = "metric";
      tempSymbol = "&deg;";
      windAbbrev = "kph";
    }

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city_search.val()},us&units=${units}&appid=${apiKey}`;
    $.get(api, function (res) {
      city_name.text(res.name);
      temp_current.html(`${Math.round(res.main.temp)}${tempSymbol}`);
      temp_real.html(`${Math.round(res.main.feels_like)}${tempSymbol}`);
      temp_low.html(`${Math.round(res.main.temp_min)}${tempSymbol}`);
      temp_high.html(`${Math.round(res.main.temp_max)}${tempSymbol}`);
      if (res.weather[0].main === "Clouds") {
        conditions_current.html(
          `${res.weather[0].main} <span style="font-size: 12px;">@</span> ${res.clouds.all}%`
        );
      } else {
        conditions_current.html(res.weather[0].main);
      }
      conditions_forecast.html(titleCase(res.weather[0].description));

      wind.html(titleCase(`${res.wind.speed}${windAbbrev}`));

      city_search.val("");
      temp_search.val("");
    });
  } else {
    alert("You must choose a city and select a temperature unit.");
  }
});

function Main() {
  return <div></div>;
}

export default Main;
