import React from 'react';

class singleDay extends React.Component {

  constructor(props) {
    super(props)
    this.convertTemp = this.convertTemp.bind(this);
    this.convertTimestamp = this.convertTimestamp.bind(this);
  }

  convertTemp(value, desiredUnit) {
    const converter = require('temp-units-conv');
    if (desiredUnit === 'c')
    return converter.k2c(value).toString().split('.')[0];
    if (desiredUnit === 'f')
    return converter.k2f(value).toString().split('.')[0];
  }

  convertTimestamp(stamp) {
    let date = new Date(stamp * 1000);
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      if(day < 10)
        day = '0'+ day;
      if(month < 10)
        month = '0'+ month;
      return month + "/" + day + "/" + year;
  }


render () {

  console.log(this.props.info.weather[0].icon);
  let iconURL = `http://openweathermap.org/img/w/${this.props.info.weather[0].icon}.png`;

  return (
    <div className="forecast-box">
      <h3 className="tighter">Forecast for: {this.convertTimestamp(this.props.info.dt)}</h3>
      <div className="box-middle-content">
        <div className="middle-left">
          <h3>{this.convertTemp(this.props.info.main.temp, 'f')}°</h3>
          <p className="tighter">{this.props.info.weather[0].description}</p>
        </div>
        <div className="middle-right">
          <img className="weather-icon"
            src={iconURL}>
          </img>
        </div>
      </div>
      <div className="box-bottom-content">
        <p className="tighter">High: {this.convertTemp(this.props.info.main.temp_max, 'f')}°</p>
        <p className="tighter">Low: {this.convertTemp(this.props.info.main.temp_min, 'f')}°</p>
      </div>
    </div>
  )
}

}

export default singleDay;
