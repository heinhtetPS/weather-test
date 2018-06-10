import React from 'react';

class WeatherBox extends React.Component {
  constructor(props) {
   super(props);
   this.getDate = this.getDate.bind(this);
 }

 getDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10)
      dd = '0'+dd;
    if(mm<10)
      mm = '0'+mm;
  return(mm + '/' + dd + '/' + yyyy);
 }

  render () {
    //whats the problem with this???
    console.log(this.props.info.main);

    return (
      <div className="weather-box">
        <div className="box-header">
          <h3>Today's Weather ({this.getDate()}) in:</h3>
          <h2>{this.props.name}</h2>
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

      </div>
    );
  }
}

export default WeatherBox;
