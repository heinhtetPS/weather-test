import React, { Component } from 'react';
import WeatherBox from './components/weatherbox.jsx';
import './App.css';

class App extends Component {
  render() {
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
