// set URL for data
const url = '/mapdatadic';

// initialize dropdown menu with years
function get_year() {
  // select the dropdown menu
  var dropdown_menu = d3.select('#selDataset');
  
  // define the available years
  var years = ["2015", "2016", "2017", "2018", "2019"];
  
  // populate the dropdown menu with the years
  years.forEach(function(year) {
    dropdown_menu.append('option')
      .text(year)
      .property('value', year);
  });
  
  // initialize the bar charts with the first year
  update_charts(years[0]);
}

// update the bar charts when the dropdown menu is changed
function optionChangedDropdown1(year) {
  update_charts(year);
}

// function to update the bar charts
// function to update the bar charts
function update_charts(year) {
    // define the parameters to plot
    var parameters = ["pm2_5", "pm10", "no2"];
    
    // loop over the parameters to create a separate bar chart for each
    parameters.forEach(function(parameter) {
      // filter the data for the selected year and parameter
      d3.json(url).then(function(data) {
        var filteredData = data.filter(function(d) {
          return d.features.some(function(f) {
            return f.year == year && f.properties[parameter] != "";
          });
        });
        
        // get the top 10 countries for the selected year and parameter
        var top10 = filteredData.map(function(d) {
            var countryData = d.features.filter(function(f) {
              return f.year == year && f.properties[parameter] != "";
            });
            var sortedData = countryData.sort(function(a, b) {
              return b.properties[parameter] - a.properties[parameter];
            });
            return {
              "country": d.country,
              "amount": sortedData.map(function(d) {
                return d.properties[parameter];
              }).slice(0,10),
            };
          }).sort(function(a, b) {
            return b.amount[0] - a.amount[0];
          });
        
        // create a Plotly bar chart for the selected parameter
        var trace = {
            x: top10.map(function(d) { return d.country; }).slice(0, 10),
            y: top10.map(function(d) { return d.amount[0]; }).slice(0, 10),
            name: "1st Highest",
            type: 'bar',
            marker: { 
              color: ["#7d3f20", "#f05f0e", "#e09104", "#ffc581", "#bce176","#9dd323", "#50a657", "#45a059","#11694d", "#1e4a45"],
              line: {
                color: "#11694d)",
                width: 0.5,
              },
              borderRadius: "50px" // set the border radius to 10 pixels
            }
          };
        var data = [trace];
        var layout = {
          yaxis: {automargin: true, title: { text:"concentration (ug.m<sup>-3</sup>)", font:{size:12}, standoff: 15}, tickfont: { size:12, family: 'calibri', color: 'black' }},
          xaxis: { tickfont: { size:12, family: 'calibri', color: 'black' }, tickangle:-30 },
          paper_bgcolor:'transparent',
          plot_bgcolor :'transparent',
          margin: {l: 20, r: 20, b: 80, t: 0, pad: 0}
        };
        Plotly.newPlot(parameter + "_plot", data, layout);
      });
    });
  }
// call the get_year function to initialize the dropdown menu and bar charts
get_year();
