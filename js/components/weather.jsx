import React, {Component} from 'react';
import $ from 'jQuery';

  const weatherIcons = {
    'ClearDay': "sunnyIcon",
    'ClearNight': "clearNightIcon",
    'Atmosphere': "windySunnyIcon",
    'Thunderstorm': "thundershowersIcon",
    'Drizzle': "showersIcon",
    'Rain': "rainyIcon",
    'Snow': "snowyIcon",
    'CloudsDay': "partlyCloudyIcon",
    'CloudsNight': "partlyCloudyNightIcon",
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

  componentWillMount() {
    this.props.displayLoader(true);
    let that = this;
    chrome.storage.sync.get('weatherTime', (time) => {
      if(Object.keys(time).length < 1 || (new Date().getTime() - time.weatherTime) > 600000) {
        navigator.geolocation.getCurrentPosition(position => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          const success = (data) => {
            let now = new Date();
            let sunrise = new Date(data.sys.sunrise * 1000);
            let sunset = new Date(data.sys.sunset * 1000);
            let night;
            if (now > sunrise && now < sunset) {
              night = false;
            } else {
              night = true;
            }

            this.state.temp = Math.round(data.main.temp * 9/5 - 459.67);
            this.state.humidity = Math.round(data.main.humidity);
            this.state.pressure = Math.round(data.main.pressure);
            if(data.weather[0].main === "Clouds") {
              this.state.weather = night ? "CloudsNight" : "CloudsDay";
            } else if(data.weather[0].main === "Clear") {
              this.state.weather = night ? "ClearNight" : "ClearDay";
            } else {
              this.state.weather = data.weather[0].main;
            }
            this.state.windSpeed = Math.round(data.wind.speed);
            let date = new Date().getTime();
            chrome.storage.sync.set({'weatherTime': date, 'weather': {
              'temp': Math.round(data.main.temp * 9/5 - 459.67),
              'humidity': Math.round(data.main.humidity),
              'pressure': Math.round(data.main.pressure),
              'weather': this.state.weather,
              'windSpeed': Math.round(data.wind.speed),
            }});
            that.props.displayLoader(false);
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
          this.props.displayLoader(false);
          this.forceUpdate();
        });
      }
    });
  } 

    // <object type="image/svg+xml" style={{width: '100%', height: '100%'}}data="../../assets/img/weather/lightningIcon.svg">
    //     </object>

  render() {
    return(
      <div className='weather-container'>
        
        <img className='weather-icon' src='../../assets/img/weather/extreme.png'
          style={{display: this.state.weather === 'Extreme' ? "block" : "none"}} />
        {Object.keys(weatherIcons).map(el => (
        <div className={`weathericon ${weatherIcons[el]}`} key={`${el}`}
          style={{position: this.state.weather === el ? "inherit" : "absolute", left: "-999em"}}></div>
        ))}
        <ul className='weather-info-list'>
          <li>{this.state.temp}° F</li>
          <li>{this.state.humidity}% Hum</li>
          <li>{this.state.pressure} hPa</li>
          <li>{this.state.windSpeed} m/s Wind</li>
        </ul>
      </div>
    );
  }

}

export default Weather;
