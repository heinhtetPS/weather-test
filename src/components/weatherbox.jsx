import React from 'react';

class WeatherBox extends React.Component {
  constructor(props) {
   super(props);
 }

  render () {
    return (
      <div className="weather-box">
        <div className="box-header">
          <h3>Today's Weather (6/9/2018) in:</h3>
          <h1>Brooklyn, NY</h1>
        </div>
        <div className="box-middle-content">
          <div className="forecast-left">
            <h1>81*</h1>
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
// <Link to="/city">Details...</Link>
export default WeatherBox;
