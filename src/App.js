import React, { Component } from 'react';
import WeatherBox from './components/weatherbox.jsx';
import './App.css';
import waterfall from 'async/waterfall';
import extend from 'extend';

class App extends Component {

  fetchData() {
    const async = require('async');
    let finalData = {};
    let staticURL = '';


    async.waterfall(


    )

  }

  render() {
    const testData = {};


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cities I've lived In</h1>
        </header>
        <div className="weatherboxes-global-container">
          <WeatherBox />
          <WeatherBox />
          <WeatherBox />
          <WeatherBox />
          <WeatherBox />
        </div>
      </div>
    );
  }
}

export default App;
