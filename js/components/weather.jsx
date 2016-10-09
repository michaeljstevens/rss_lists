import React, {Component} from 'react';
import $ from 'jQuery';

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
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      
      const success = (data) => {
        this.state.temp = Math.round(data.main.temp * 9/5 - 459.67);
        this.state.humidity = Math.round(data.main.humidity);
        this.state.pressure = Math.round(data.main.pressure);
        this.state.weather = data.weather[0].main; 
        this.state.windSpeed = Math.round(data.wind.speed);
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
  }


  render() {
    return(
      <div className='weather-container'>
        <ul>
          <li>{this.state.temp}</li>
          <li>{this.state.humidity}</li>
          <li>{this.state.pressure}</li>
          <li>{this.state.weather}</li>
          <li>{this.state.windSpeed}</li>
        </ul>
      </div>
    );
  }

}

export default Weather;

