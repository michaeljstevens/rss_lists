import React, {Component} from 'react';
import $ from 'jQuery';

  const weatherIcons = {
    'Clear': '../../assets/img/weather/clear.png',
    'Atmosphere': '../../assets/img/weather/atmosphere.png',
    'Thunderstorm': '../../assets/img/weather/thunderstorm.png',
    'Drizzle': '../../assets/img/weather/drizzle.png',
    'Rain': '../../assets/img/weather/rain.png',
    'Snow': '../../assets/img/weather/snow.png',
    'Clouds': '../../assets/img/weather/clouds.png',
    'Extreme': '../../assets/img/weather/extreme.png',
  };

class Weather extends Component {


  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      humidity: null,
      pressure: null,
      weather: null,
      windSpeed: null,
    };
  }

  componentDidMount() {
    chrome.storage.sync.get('weatherTime', (time) => {
      if(Object.keys(time).length < 1 || (new Date().getTime() - time.weatherTime) > 600000) {
        navigator.geolocation.getCurrentPosition(position => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          
          const success = (data) => {
            this.state.temp = Math.round(data.main.temp * 9/5 - 459.67);
            this.state.humidity = Math.round(data.main.humidity);
            this.state.pressure = Math.round(data.main.pressure);
            this.state.weather = data.weather[0].main; 
            this.state.windSpeed = Math.round(data.wind.speed);
            let date = new Date().getTime();
            chrome.storage.sync.set({'weatherTime': date, 'weather': {
              'temp': Math.round(data.main.temp * 9/5 - 459.67),
              'humidity': Math.round(data.main.humidity),
              'pressure': Math.round(data.main.pressure),
              'weather': data.weather[0].main,
              'windSpeed': Math.round(data.wind.speed),
            }});
            this.forceUpdate();
          };

          const error = (e) => {
            console.log(e);
          }

          $.ajax({
            type: 'GET',
            url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=8a6fa7e6e6313df3e65af4c4e986ada2`,
            success,
            error
          });
        });
      } else {
        chrome.storage.sync.get('weather', (weatherObj) => {
          this.state.temp = weatherObj.weather.temp;
          this.state.humidity = weatherObj.weather.humidity;
          this.state.pressure = weatherObj.weather.pressure;
          this.state.weather = weatherObj.weather.weather;
          this.state.windSpeed = weatherObj.weather.windSpeed;
          this.forceUpdate();
        });
      }
    });
  }


  render() {
    return(
      <div className='weather-container'>
        <img className='weather-icon' src={weatherIcons[this.state.weather]} />
        <ul className='weather-info-list'>
          <li>{this.state.temp} F</li>
          <li>{this.state.humidity}% Hum</li>
          <li>{this.state.pressure} hPa</li>
          <li>{this.state.windSpeed} m/s Wind</li>
        </ul>
      </div>
    );
  }

}

export default Weather;

