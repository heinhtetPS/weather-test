## WEATHER APP
[Live Link](http://heinhtetps.info/weather-test/)

![alt text](https://github.com/heinhtetPS/weather-test/blob/master/public/preview.jpg "preview")

This is a simple single-page app that retrieves current weather information for cities that I have lived in. Users can browse 5 cities on the homepage or get more detailed info, including a 5-day forecast, on the individual citys' page.

### MVP GOALS
- Site has a Homepage that shows the basic weather info for 5 different cities.
- User can click on each city to display an individual page with more details.
- Info is retrieved from an up-to-date API resource.

### Cities List
- Brooklyn, New York
- Framingham, Massachusetts
- Redlands, California
- Nagoya, Japan
- Yangon, Myanmar (Burma)

### Tech Info
- The frontend utilizes React.js, specifically implemented using create-react-app for fast startup.
- The data comes from openweathermap.org using their API for cities and forecasts.
- There is no backend or database as we are not persisting data across sessions.
- NPM libraries used:
  - request (to make easy API Calls)
  - extend (simple object merging)
  - temp-units-conv (convert kelvins to C or F)
  - didn't end up using unix-timestamp converter, my own solution was shorter
  - gh-pages to deploy to github pages

### Implementation process outline and notes
- Create frontend Homepage container with 5 weatherboxes (DONE)
- Populate the boxes with fake data (not hardcoded) to see that everything is going smooth (DONE)
- Create API retrieval methods and make sure the data lines up (DONE)
- Populate boxes with real data and fix the css (DONE)
- We can re-use the same weatherbox component to show a more detailed view by utilizing the React Router
- Populate indiv page with fake data and fix css
- Get real API data for more detailed cities

### Simple view (Homepage)
- City name
- Today's Date
- Current Temp & forecast
- icon for forecast
- High temp and Low temp

### Individual View (City page)
- Name, Date, current temp, feels
- today's high and low
- 5 day forecast
- icons for all this stuff
- other random stuff like wind, humidity, uv, pressure

### Future Directions / Improvements
- Use the DAILY API call instead of the forecast one which gives you a more appropriate results
- Implement unit converter option so user can choose to see F or C
- Instead of having cities set in stone, we can have the user choose a city via menu or search
- Have style options such as dark mode or light mode

### Implementation issues/problems:
- Problems displaying UTF-8 symbols
  - Fixed above by just copy pasting the symbol
- ditched async.waterfall in favor of just doing 5 requests in a row
- Data has now been passed into individual boxes. But for some reason props.info.main is undefined
- Props problem has been figured out, however it presents a new problem:
  - Props are undefined because re-render always re-pulls empty info from weathercontainer state
  - This is because STATE is not changed after API call
  - Need to use setState instead of extend inside API call
  - Fixed this problem by using forceUpdate, can probably also use complicated variations of setState
- next: Implement large page, fix css and icons, another api call for forecast?
  - large page has no props when it starts, just call the forecast API with 6 count, number 0 is today
- DANGER: Objects inside arrays that cannot be accessed by index!!! (this cost me 2-3 hours)
  - Example: `{ForecastList: [{etc: 10101}, {etc: 10101}, {etc: 10101}]}` 
  - (Above array contains objects that track each day's weather info, but they cannot be accessed via `.ForecastList[0]`
  - Learn how to process these more easily
- DANGER: API call for forecast was misinterpreted. Each entry wasn't 1 day, it was an interval of 3 hours.
  - The daily? API call would not let me retrieve with the current API Key so I had to make due with the forecast data.
  - I simply rejected useless data from the same day by tracking which days had already been forecasted
