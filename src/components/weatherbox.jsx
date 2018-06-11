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
 }

 getDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10)
      dd = '0'+ dd;
    if(mm<10)
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
   let data = {forecast: ''};
   let city = this.props.location.pathname.split("/")[2];
   let appID = '&appid=bcb83c4b54aee8418983c2aff3073b3b';
   let fullURL = staticURL + city + appID + "cnt=5";

   console.log(fullURL);

   // request(fullURL, (err, response, body) => {
   //   if (!err && response.statusCode === 200) {
   //     let json = JSON.parse(body);
   //     data.info = json;
   //     this.extendData(target, data);
   //   } else {
   //     console.log(err);
   //   }
   // });
 }

 extendData(target, data) {
   extend(target, data);
   this.forceUpdate();
 }

  render () {

    //this is for BIG BOX
    if (window.location.href.includes("details")) {

      this.fetchData();

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

      return (
        <div className="weather-box-large">
          <div className="big-box-left">
            <div className="box-header">
              <h2 className="page-header">{cityname}</h2>
              <h3>{this.getDate()}</h3>
            </div>
            <div className="box-middle-content">
              <div className="forecast-left">
                <h1>99</h1>
                <h3>Partly Cloudy</h3>
              </div>
              <div className="forecast-right">
                <img className="weather-icon"
                  src="http://icons-for-free.com/icon/download-cloud_forecast_grey_rain_sun_weather_icon-433363.png">
                </img>
              </div>
            </div>
            <div className="box-bottom-content">
              <h2>High: 89 &#8457</h2>
              <h2>Low: 75 &#8457</h2>
            </div>
            <Link to="/">Back</Link>
          </div>
          <div className="big-box-right">

          </div>
        </div>
      );

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
