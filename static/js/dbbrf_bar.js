document.addEventListener("DOMContentLoaded", function () {

    // Fetch the countries data from the server
    fetch("/dbbrf")
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
                        var dropdown_menu = d3.select('#selDataset_dbbrf_bar');
                        
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
                      // Calculate the average of all pollution types
                        const avgPollution = selectedCountry[year].AP;

                        // Calculate the deviations of each pollution type from the average
                        const deviations = [
                            selectedCountry[year].CS - avgPollution,
                            selectedCountry[year].CW - avgPollution,
                            selectedCountry[year].DLF - avgPollution,
                            selectedCountry[year].DLV - avgPollution,
                            selectedCountry[year].DU - avgPollution,
                            selectedCountry[year].DVD - avgPollution,
                            selectedCountry[year].HASF - avgPollution,
                            selectedCountry[year].HBMI - avgPollution,
                            selectedCountry[year].HFG - avgPollution,
                            selectedCountry[year].HIS - avgPollution,
                            selectedCountry[year].HLC - avgPollution,
                            selectedCountry[year].HS - avgPollution,
                            selectedCountry[year].ID - avgPollution,
                            selectedCountry[year].LPA - avgPollution,
                            selectedCountry[year].NEB - avgPollution,
                            selectedCountry[year].PMP - avgPollution,
                            selectedCountry[year].S - avgPollution,
                            selectedCountry[year].SS - avgPollution,
                            selectedCountry[year].US - avgPollution,
                            selectedCountry[year].UWS - avgPollution,
                            selectedCountry[year].ZD - avgPollution
                        ];

                        // Create a new deviation bar chart data object
                        const barData = [
                            {
                                y: deviations,
                                x: ["Child Stunting", "Child Wasting", "Diet Low in Fruits", "Diet Low in Vegetables", "Drug Use",
                                "Vitamina Deficiency", "Household Solid Fuels", "High Body Mass Index", "High Fasting Glucose", "High in Sodium",
                                "High LDL Cholesterol", "High Systolic Blood Pressure", "Iron Deficiency", "Low Physical Activity", "non Exclusive Breastfeeding",
                                "Particulate Matter Pollution", "Smoking", "Secondhand Smoke", "Unsafe Sanitation", "Unsafe Water Source", "Zinc Deficiency"],
                                type: "bar",
                                marker: {
                                    color: deviations.map(deviation => deviation < 0 ? "#f05f0e":"#1e4a45"),
                                    line: {
                                        color: "#11694d)",
                                        width: 1,
                                      },
                                }, // set the bar colors based on the deviation direction
                            }
                        ];

                        // Create a new deviation bar chart layout object
                        const barLayout = {
                            hight: 400,
                            xaxis: {
                                tickfont: { size:12, family: 'calibri', color: 'black' },
                                tickformat: ".2f"
                            },
                            yaxis: {title: "Disease Rate",
                        },
                            paper_bgcolor:'rgba(0,0,0,0)',
                            plot_bgcolor :'rgba(0,0,0,0)',
                            margin: {l: 60, r: 50, b: 100, t: 15, pad:0}
                        };

                        // Render the new deviation bar chart
                        Plotly.newPlot("dbbrf_bar_chart", barData, barLayout);
                      }
                      
                      // Initialize the dropdown menu
                      get_year();
                      
                      // Add an event listener to the dropdown menu
                      d3.select('#selDataset_dbbrf_bar').on('change', function() {
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
  