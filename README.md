## WEATHER APP
[Live Link (not implemented yet)](https://github.com/heinhtetPS)

This is a simple single-page app that retrieves current weather information for cities that I have lived in. Users can browse 5 cities on the homepage or get more detailed info, including a 5-day forecast, on the individual citys' page. 

### MVP GOALS
- Site has a Homepage that shows the basic weather info for 5 different cities.
- User can click on each city to display an individual page with more details.
- Info is retrieved from an up-to-date API resource.

### Cities List
- Brooklyn, NY
- Framingham, MA
- Redlands, CA
- Nagoya, JP
- Yangon, MM

### Tech Info
- The frontend utilizes React.js, specifically implemented using create-react-app for fast startup.
- The data comes from openweathermap.org using their API for cities and forecasts.
- There is no backend or database as we are not persisting data across sessions.
- NPM libraries used:
  - request (to make easy API Calls)
  - extend (simple object merging)
  - temp-units-conv (convert kelvins to C or F)

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
  - large page has no props when it starts, it will make its own API call to get forecasts
- write a bit more about single page navi
