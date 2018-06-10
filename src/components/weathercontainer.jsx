import React from 'react';
import waterfall from 'async/waterfall';
import extend from 'extend';
import WeatherBox from './weatherbox.jsx';

class WeatherContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cities: [
                {fullName: 'Brooklyn, NY', id:1 },
                {fullName: 'Framingham, MA', id:2 },
                {fullName: 'Ranchocucamonga, CA', id:3 },
                {fullName: 'Flagstaff, AZ', id:4 },
                {fullName: 'Chicago, IL', id:5 }
              ]
    };
  }

  fetchData() {
    const async = require('async');
    const request = require('request');
    let finalData = {};
    let staticURL = 'http://api.openweathermap.org/data/2.5/weather?q=brooklyn&appid=bcb83c4b54aee8418983c2aff3073b3b';

    request(staticURL, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        let json = JSON.parse(body);
        finalData = json;
        console.log('does it come here?');
        return finalData;
      } else {
        console.log(err);
      }
    });

    // async.waterfall(
    //
    //
    // )
  }

  componentDidMount() {
    this.fetchData();
  }

  render () {

    return (
      <ul className="box-list">
        {this.state.cities.map(
          city => <WeatherBox
          name={city.fullName}
          key={city.id}
          />)}
      </ul>
    );
  }

}

export default WeatherContainer;
