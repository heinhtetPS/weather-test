import React from 'react';

class singleDay extends React.Component {

  constructor(props) {
    super(props)
  }


render () {
  return (
    <div className="forecast-box">
      <h3 className="tighter">Forecast for: {this.props.date}</h3>
      <div className="box-middle-content">
        <div className="middle-left">
          <h3 className="tighter">99°</h3>
          <p>Weather description</p>
        </div>
        <div className="middle-right">
          <img className="weather-icon"
            src='https://cms-assets.tutsplus.com/uploads/users/16/posts/30551/final_image/cloud850.png'>
          </img>
        </div>
      </div>
      <div className="box-bottom-content">
        <p className="tighter">High:1°</p>
        <p className="tighter">Low:11°</p>
      </div>
    </div>
  )
}

}

export default singleDay;
