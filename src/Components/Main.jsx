import React from "react";
import $ from "jquery";

const apiKey = "872b5f73ccc15cbbe182e6efae6c3cdb";

let temp_current = document.querySelector("#temp_current");
let temp_real = document.querySelector("#temp_real");
let temp_low = document.querySelector("#temp_low");
let temp_high = document.querySelector("#temp_high");
let conditions_current = document.querySelector("#conditions_current");
let conditions_forecast = document.querySelector("#conditions_forecast");
let wind = document.querySelector("#wind");
let city_name = document.querySelector("#city_name");

let city_search = document.querySelector("#city_search");
let temp_search = document.querySelector("#temp_search");

function titleCase(string) {
  let sentence = string.toLowerCase().split(" ");
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

document
  .querySelector("#weather_form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    if (city_search.value && temp_search.value) {
      var units;
      var windAbbrev;
      var tempSymbol;

      if (temp_search.value === "fahrenheit") {
        units = "imperial";
        tempSymbol = "&deg;";
        windAbbrev = "mph";
      } else if (temp_search.value === "celcius") {
        units = "metric";
        tempSymbol = "&deg;";
        windAbbrev = "kph";
      }

      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city_search.value},us&units=${units}&appid=${apiKey}`;
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
        city_search.value;
        temp_search.value;
      });
    } else {
      alert("You must choose a city and select a temperature unit.");
    }
  });

function Main() {
  return (
    <div>
      <div className="col-md-6 offset-md-3">
        <form id="weather_form">
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  id="city_search"
                  className="form-control"
                  placeholder="City name"
                />
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <select className="form-control" id="temp_search">
                    <option disabled selected>
                      Choose a weather unit
                    </option>
                    <option value="celcius">Celcius (C&deg;)</option>
                    <option value="fahrenheit">Fahrenheit (F&deg;)</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <input
                  id="submit-btn"
                  className="btn btn-outline-info btn-block"
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>
          </div>
        </form>

        <hr />

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Current Temp:
              <span id="temp_current" class="float-right"></span>
            </h5>

            <h5 className="card-title">
              Feels Like:
              <span id="temp_real" className="float-right output"></span>
            </h5>

            <h5 className="card-title">
              Low Temp:
              <span id="temp_low" className="float-right"></span>
            </h5>

            <h5 className="card-title">
              High Temp:
              <span id="temp_high" className="float-right"></span>
            </h5>

            <h5 className="card-title">
              Current Conditions:
              <span id="conditions_current" className="float-right"></span>
            </h5>

            <h5 className="card-title">
              Forecast:
              <span id="conditions_forecast" className="float-right"></span>
            </h5>

            <h5 className="card-title">
              Wind:
              <span id="wind" className="float-right"></span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
