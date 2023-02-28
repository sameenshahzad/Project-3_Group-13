document.addEventListener("DOMContentLoaded", function () {

    // Fetch the countries data from the server
    fetch("/agepollution")
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
                        var dropdown_menu = d3.select('#selDataset_pie');
                        
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
                        const pieData = [  {    values: [selectedCountry[year].under5, selectedCountry[year].age5to14, selectedCountry[year].age15to49, selectedCountry[year].age50to69, selectedCountry[year].age70plus ],
                            labels: ["Under 5", "5 to 14", "15 to 49", "50 to 69", "70 plus" ],
                            type: "pie",
                            marker: {
                              colors: ["#7d3f20", "#e09104", "#ffc581", "#9dd323", "#1e4a45"]
                            },
                            hole: .4,
                            textinfo: "label+percent",
                            insidetextorientation: "radial",
                            automargin: true
                          }
                        ];
                        
                        // Create a new pie chart layout object
                        const pieLayout = {
                          annotations: [
                            {
                              font: {
                                size: 20
                              },
                              showarrow: false,
                              text: 'AGE',
                              x: 0.5,
                              y: 0.5
                            }  
                          ],
                          paper_bgcolor:'rgba(0,0,0,0)',
                          plot_bgcolor :'rgba(0,0,0,0)',
                          margin: {l: 40, r: 40, b: 50, t: 50, pad:0}
                        };
                        
                        // Render the new pie chart
                        Plotly.newPlot("pie_chart", pieData, pieLayout);
                      }
                      
                      // Initialize the dropdown menu
                      get_year();
                      
                      // Add an event listener to the dropdown menu
                      d3.select('#selDataset_pie').on('change', function() {
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