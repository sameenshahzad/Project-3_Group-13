// air quality
// health impacts
// https://api-docs.iqair.com/?version=latest
// Version 2


// List supported cities in a state
// Fetch the data directly using a single line of command/code
const apiKey = "{{56451c7f-da58-4196-8e40-576453cc9eb2}}";
const url = `http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Use the data here
    console.log(data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

 