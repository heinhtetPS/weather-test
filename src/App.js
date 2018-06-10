import React, { Component } from 'react';
import WeatherContainer from './components/weathercontainer.jsx';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cities I've lived In</h1>
        </header>
        <WeatherContainer className="weatherboxes-global-container" />
      </div>
    );
  }
}

export default App;
