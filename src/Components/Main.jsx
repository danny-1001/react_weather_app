import React from "react";
import axios from "axios";
import { useState } from "react";
import { event } from "jquery";

const [data, setData] = useState({});
const [location, setLocation] = useState("");
const apiKey = "872b5f73ccc15cbbe182e6efae6c3cdb";
const api = `https://api.openweathermap.org/data/2.5/weather?q=${location},&appid=${apiKey}`;

const searchLocation = () => {
  if (event.key === "Enter") {
    axios.get(api).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
  }
};

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
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  onKeyPress={searchLocation}
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
              <span id="temp_current" class="float-right">
                {data.temp_current}
              </span>
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
