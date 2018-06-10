import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import WeatherContainer from './components/weathercontainer.jsx';
import WeatherBox from './components/weatherbox.jsx';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cities I've lived In</h1>
        </header>
        <Route exact path="/" component={WeatherContainer} />
        <Route path="/details/:city" component={WeatherBox} />
      </div>
    );
  }
}

export default App;
