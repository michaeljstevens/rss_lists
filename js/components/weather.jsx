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
  
  const efficientWeatherIcons = {
    'ClearDay': "../../assets/img/weather/sunnyIcon.svg",
    'ClearNight': "../../assets/img/weather/clearNightIcon.svg",
    'Atmosphere': "../../assets/img/weather/windySunnyIcon.svg",
    'Thunderstorm': "../../assets/img/weather/thundershowersIcon.svg",
    'Drizzle': "../../assets/img/weather/showersIcon.svg",
    'Rain': "../../assets/img/weather/rainyIcon.svg",
    'Snow': "../../assets/img/weather/snowyIcon.svg",
    'CloudsDay': "../../assets/img/weather/partlyCloudyIcon.svg",
    'CloudsNight': "../../assets/img/weather/partlyCloudyNightIcon.svg",
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
      low_power_mode: false,
    };
  }

  componentWillMount() {
    this.props.displayLoader(true);
    let that = this;
    chrome.storage.sync.get('low_power_mode', (mode) => {
      if (mode.low_power_mode) {
        this.setState({low_power_mode: true});
      } else {
        this.setState({low_power_mode: false});
      }
    });

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

            now = parseFloat(`${now.getHours()}.${now.getMinutes()}`);
            sunrise = parseFloat(`${sunrise.getHours()}.${sunrise.getMinutes()}`);
            sunset = parseFloat(`${sunset.getHours()}.${sunset.getMinutes()}`);
            
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

  render() {
    return(
      <div className='weather-container'>
        
        <img className='weather-icon' src='../../assets/img/weather/extreme.png'
          style={{display: this.state.weather === 'Extreme' ? "block" : "none"}} />
        {!this.state.low_power_mode ? Object.keys(weatherIcons).map(el => (
        <div className={`weathericon ${weatherIcons[el]}`} key={`${el}`}
          style={{position: this.state.weather === el ? "inherit" : "absolute", left: "-999em"}}></div>
        )) : Object.keys(efficientWeatherIcons).map(el => (
            <object type="image/svg+xml" style={{
              width: "100%",
              visibility: this.state.weather === el ? "visible" : "hidden", 
              position: this.state.weather === el ? "inherit" : "absolute",
              left: "-999em",
            }}
            data={efficientWeatherIcons[el]}></object>
          ))
        }
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
