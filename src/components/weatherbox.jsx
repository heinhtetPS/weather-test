import React from 'react';
import { Link } from 'react-router-dom';
import SingleDay from './singleDay.jsx';
import extend from 'extend';

class WeatherBox extends React.Component {
  constructor(props) {
   super(props);
   this.getDate = this.getDate.bind(this);
   this.convertTemp = this.convertTemp.bind(this);
   this.fetchData = this.fetchData.bind(this);

   this.state = {
     forecast: {}
   };
 }

 getDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd < 10)
      dd = '0'+ dd;
    if(mm < 10)
      mm = '0'+ mm;
  return(mm + '/' + dd + '/' + yyyy);
 }

 convertTemp(value, desiredUnit) {
   const converter = require('temp-units-conv');
   if (desiredUnit === 'c')
   return converter.k2c(value).toString().split('.')[0];
   if (desiredUnit === 'f')
   return converter.k2f(value).toString().split('.')[0];
 }

 fetchData() {
   const request = require('request');
   const staticURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
   let data = {};
   let city = this.props.location.pathname.split("/")[2];
   if (city === "Brooklyn")
   city = 'brooklyn,us';
   let appID = '&appid=df00cda1893df4914640c19962cd1427';
   let fullURL = staticURL + city + appID;

   request(fullURL, (err, response, body) => {
     if (!err && response.statusCode === 200) {
       let json = JSON.parse(body);
       data = json;
       this.extendData(this.state.forecast, data);
     } else {
       console.log(err);
     }
   });
 }

 extendData(target, data) {
   extend(target, data);
   this.forceUpdate();
 }

 componentDidMount() {
   if (window.location.href.includes("details"))
   this.fetchData();
 }

  render () {

    //this is for BIG BOX
    if (window.location.href.includes("details")) {

      let cityname = '';
      switch (this.props.location.pathname.split("/")[2]) {
        case 'Brooklyn':
          cityname = "Brooklyn, NY"
          break;
        case 'Framingham':
          cityname = "Framingham, MA"
          break;
        case 'Redlands':
          cityname = "Redlands, CA"
          break;
        case 'Nagoya':
          cityname = "Nagoya, JP"
          break;
        case 'Yangon':
          cityname = "Yangon, MM"
          break;
        default:
      }

      let forecastDays = [];

      if (this.state.forecast === {}) {
        return (<p>Loading...</p>);
      } else {

        //DATA came back in a weird way where I could not index into LIST using [0].property
        //so the code below is used to transfer them into another container
        //Note: forecastDays[0] is current
        let dayslist = [];
        for(var index in this.state.forecast.list) {
          if (this.state.forecast.list.hasOwnProperty(index)) {
            //if this date isn't in days list, push into forecast
            //then put the date in dayslist to ignore all other reports from same day
            if (!dayslist.includes(this.state.forecast.list[index].dt_txt.slice(0,10))) {
              forecastDays.push(this.state.forecast.list[index]);
              dayslist.push(this.state.forecast.list[index].dt_txt.slice(0,10));
            }
          }
        }

        //had to do it a 2nd time because these keys were still inaccessible
        let current = forecastDays.splice(0,1);
        let main = {};
        let weather = {};
        let description = '';
        let wind = {};
        let icon2 = '';
        for(var key in current[0]) {
          if (current[0].hasOwnProperty(key)) {
            // // console.log(key);
            // console.log(current[0][key]);
            if (key === 'main')
            main = current[0][key];
            if (key === 'weather')
            weather = current[0][key];
            if (key === 'wind')
            wind = current[0][key];
          }
        }
        //another one
        for(var key2 in weather) {
          if (weather.hasOwnProperty(key2)) {
            description = weather[key2].description;
            icon2 = `http://openweathermap.org/img/w/${weather[key2].icon}.png`;
          }
        }

        return (
          <div className="weather-box-large">
            <div className="big-box-left">
              <div className="box-header">
                <h2 className="page-header">{cityname}</h2>
                <h3>Forecast for later today...</h3>
              </div>
              <div className="box-middle-content">
                <div className="forecast-left">
                  <h1>{this.convertTemp(main.temp, 'f')}°</h1>
                  <h3>{description}</h3>
                </div>
                <div className="forecast-right">
                  <img className="weather-icon"
                    src={icon2}>
                  </img>
                </div>
              </div>
              <div className="box-bottom-content-large">
                <h2>High: {this.convertTemp(main.temp_max, 'f')}°</h2>
                <h2>Low: {this.convertTemp(main.temp_min, 'f')}°</h2>
                <h3>Humidity: {main.humidity} %</h3>
                <h3>Pressure: {main.pressure} hPA</h3>
                <h3>Wind Speed: {wind.speed} m/hr</h3>
              </div>
              <Link to="/">Back</Link>
            </div>
            <div className="big-box-right">
              {forecastDays.map(
                day => <SingleDay
                key={day.id}
                info={day} />)}
              </div>
            </div>
          );
      }

    } else {
      //THIS IS FOR NORMAL SIZED BOX
      let cityname = this.props.name.substring(0, this.props.name.indexOf(','));
      let linkURL = '/details/' + cityname;

      let weatherInfo = null;
      let majorTemp = null;
      let high = null;
      let low = null;
      let description = null;
      let icon = null;

      if (this.props.info === {} || !this.props.info) {
        return (<p>Loading...</p>);
      } else {
        //asyc call is done
        weatherInfo = this.props.info;
        majorTemp = weatherInfo.main ? weatherInfo.main.temp : 'loading...';
        high = weatherInfo.main ? weatherInfo.main.temp_max : 'loading...';
        low = weatherInfo.main ? weatherInfo.main.temp_min : 'loading...';
        description = weatherInfo.weather ? weatherInfo.weather[0].description : 'loading...';
        icon = weatherInfo.weather ? `http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png` : null;
      }

      // console.log(this.state);

      return (
        <div className="weather-box">
          <div className="box-header">
            <h3>Today's Weather ({this.getDate()}) in:</h3>
            <h2>{this.props.name}</h2>
          </div>
          <div className="box-middle-content">
            <div className="middle-left">
              <h1>{this.convertTemp(majorTemp, 'f')}°</h1>
            </div>
            <div className="middle-right">
              <img className="weather-icon"
                src={icon}>
              </img>
            </div>
          </div>
          <div className="box-bottom-content">
            <h3>{description}</h3>
            <h2>High:{this.convertTemp(high, 'f')}°</h2>
            <h2>Low:{this.convertTemp(low, 'f')}°</h2>
          </div>
          <Link to={linkURL}>More Details...</Link>
        </div>
      );
    }
  }
}



export default WeatherBox;
