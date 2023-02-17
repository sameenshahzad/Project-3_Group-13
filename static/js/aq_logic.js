// air quality
// health impacts
// https://api-docs.iqair.com/?version=latest
// Version 2


// List supported cities in a state
// Fetch the data directly using a single line of command/code
fetch('http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key={{56451c7f-da58-4196-8e40-576453cc9eb2}}', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

 