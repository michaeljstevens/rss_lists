import React, {Component} from 'react';
import $ from 'jQuery';

  const weatherIcons = {
    'ClearDay': (<div className="weathericon sunnyIcon"></div>),
    'ClearNight': (<div className="weathericon clearNightIcon"></div>),
    'Atmosphere': (<div className="weathericon windySunnyIcon"></div>),
    'Thunderstorm': (<div className="weathericon thundershowersIcon"></div>),
    'Drizzle': (<div className="weathericon showersIcon"></div>),
    'Rain': (<div className="weathericon rainyIcon"></div>),
    'Snow': (<div className="weathericon snowyIcon"></div>),
    'CloudsDay': (<div className="weathericon partlyCloudyIcon"></div>),
    'Clouds': (<div className="weathericon partlyCloudyNightIcon"></div>),
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
    this.props.displayLoader(true);
    let that = this;
    chrome.storage.sync.get('weatherTime', (time) => {
      if(Object.keys(time).length < 1 || (new Date().getTime() - time.weatherTime) > 6) {
        navigator.geolocation.getCurrentPosition(position => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          const success = (data) => {
            const sunset = new Date() > data.sys.sunset;
            this.state.temp = Math.round(data.main.temp * 9/5 - 459.67);
            this.state.humidity = Math.round(data.main.humidity);
            this.state.pressure = Math.round(data.main.pressure);
            // if(data.weather[0].main === "Clouds") {
            //   this.state.weather = sunset ? "CloudsNight" : "CloudsDay";
            // } else if(data.weather[0].main === "Clear") {
            //   this.state.weather = sunset ? "ClearNight" : "ClearDay";
            // } else {
            //   this.state.weather = data.weather[0].main;
            // }
            this.state.weather = data.weather[0].main;
            console.log(data.weather[0].main);
            this.state.windSpeed = Math.round(data.wind.speed);
            let date = new Date().getTime();
            chrome.storage.sync.set({'weatherTime': date, 'weather': {
              'temp': Math.round(data.main.temp * 9/5 - 459.67),
              'humidity': Math.round(data.main.humidity),
              'pressure': Math.round(data.main.pressure),
              'weather': data.weather[0].main,
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
          debugger
          this.state.weather = weatherObj.weather.weather;
          this.state.windSpeed = weatherObj.weather.windSpeed;
          this.props.displayLoader(false);
          this.forceUpdate();
        });
      }
    });
  }


  render() {
    if(this.state.weather) {
      debugger
    }
    const weatherIcon = weatherIcons[this.state.weather];

    return(
      <div className='weather-container'>
          {weatherIcon}
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
