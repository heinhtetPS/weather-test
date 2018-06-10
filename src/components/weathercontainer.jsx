import React from 'react';
import waterfall from 'async/waterfall';
import extend from 'extend';
import WeatherBox from './weatherbox.jsx';

class WeatherContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cities: [
                {fullName: 'Brooklyn, NY', id:1, info: {} },
                {fullName: 'Framingham, MA', id:2, info: {} },
                {fullName: 'Redlands, CA', id:3, info: {} },
                {fullName: 'Nagoya, JP', id:4, info: {} },
                {fullName: 'Yangon, MM', id:5, info: {} }
              ]
    };
  }

  fetchData() {
        this.cityRequest('?q=brooklyn,us', this.state.cities[0].info);
        this.cityRequest('?q=framingham', this.state.cities[1].info);
        this.cityRequest('?q=redlands', this.state.cities[2].info);
        this.cityRequest('?q=nagoya', this.state.cities[3].info);
        this.cityRequest('?q=yangon', this.state.cities[4].info);
  }

  cityRequest(city, target) {
    const request = require('request');
    const staticURL = 'http://api.openweathermap.org/data/2.5/weather';
    let data = {};
    let appID = '&appid=bcb83c4b54aee8418983c2aff3073b3b';
    let fullURL = staticURL + city + appID;

    request(fullURL, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        let json = JSON.parse(body);
        data = json;
        extend(target, data);
      } else {
        console.log(err);
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render () {
    return (
      <div className="weathercontainer-global">
        <ul className="box-list">
          {this.state.cities.map(
            city => <WeatherBox
            name={city.fullName}
            key={city.id}
            info={city.info}
            />)}
          </ul>
      </div>
    );
  }

}

export default WeatherContainer;
