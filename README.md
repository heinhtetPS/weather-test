## WEATHER APP
This is a simple app that retrieves weather information for cities that I have lived in.

Website Process outline and Notes
- Create frontend Homepage container with 5 weatherboxes (DONE)
- Populate the boxes with fake data (not hardcoded) to see that everything is going smooth (DONE)
- Create API retrieval methods and make sure the data lines up (DONE)
- Populate boxes with real data and fix the css
- Create template for individual city page
- Populate indiv page with fake data and fix css
- Get real API data for more detailed cities

Cities
- Brooklyn, NY
- Framingham, MA
- Redlands, CA
- Nagoya, JP
- Yangon, MM

Simple view (Homepage)
- city name
- Today's Date
- Forecast
- icon for forecast
- High temp and Low temp

Individual View (City page)
- Name, Date, current temp, feels
- today's high and low
- 5 day forecast
- icons for all this stuff
- other random stuff like wind, humidity, uv, pressure


Implementation Notes/problems:
- Problems displaying UTF-8 symbols
- ditched async in favor of just doing 5 requests in a row
- Data has now been passed into individual boxes. But for some reason props.info.main is undefined
- next: Investigate props problem, populate databoxes properly, fix css and icons
