document.addEventListener("DOMContentLoaded", function () {

  // Fetch the countries data from the server
  fetch("/fourairpollution")
      .then(response => response.json())
      .then(data => {
          // Store the countries data in a constant variable
          const countriesData = data;

          // Get the search form and search button elements
          const searchForm = document.querySelector("#country-input");
          const searchBtn = document.querySelector("#search-btn");

          // Add an event listener to the search button
          searchBtn.addEventListener("click", (event) => {
              event.preventDefault();

              // Get the user input from the search form
              const userInput = searchForm.value.trim();

              // Search for the selected country in the countries data
              const selectedCountry = countriesData[userInput];

              // If the selected country exists in the countries data, create a radar chart
              if (selectedCountry) {
                  // Create a new bar chart data object
                  function get_year() {
                      // select the dropdown menu
                      var dropdown_menu = d3.select('#selDataset_bar');
                      
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
                    
                    // function to update the bar charts
                    function update_charts(year) {
                      const barData = [
                          {
                          x: [selectedCountry[year].AOP, selectedCountry[year].AP, selectedCountry[year].APM, selectedCountry[year].HAP],
                          y: ["Ambient Ozone P", "Other AP", "Ambient PMP", "Household AP"],
                          type: "bar",
                          orientation: "h",
                          marker: {color: "#7d3f20",
                          line: {
                            color: "#f05f0e",
                            width: 0.5,
                          }// set the bar color to blue
                          }}
                      ];
                      
                      // Create a new bar chart layout object
                      const barLayout = {
                          xaxis: {title: "Value"},
                          yaxis: {title: "Air Pollution Type", tickfont: { size:13, family: 'calibri', color: 'black'}, tickangle:90 },
                          paper_bgcolor:'rgba(0,0,0,0)',
                          plot_bgcolor :'rgba(0,0,0,0)',
                          margin: {l: 100, r: 50, b: 80, t: 0, pad: 0}
                      };
                  
                      // Render the new bar chart
                      Plotly.newPlot("bar_chart", barData, barLayout);
                    }
                    
                    // Initialize the dropdown menu
                    get_year();
                    
                    // Add an event listener to the dropdown menu
                    d3.select('#selDataset_bar').on('change', function() {
                      var year = d3.select(this).property('value');
                      update_charts(year);
                    });

              }
              else {
                  alert("The name of the country provided is inaccurate. It is important to capitalize the name of the country correctly, starting with an uppercase letter. For instance, please use 'Canada' instead of writing it in lowercase as 'canada' or in all caps as 'CANADA'")
              }
          });
      });
});
