document.addEventListener("DOMContentLoaded", function () {

    // Fetch the countries data from the server
    fetch("/pollutiondeaths")
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
                    const maxPollutionValue = Math.max(selectedCountry.AP, selectedCountry.LP, selectedCountry.OP, selectedCountry.WP);
                    const radarData = [
                        {
                            type: "scatterpolar",
                            r: [
                                selectedCountry.AP,
                                selectedCountry.LP,
                                selectedCountry.WP,
                                selectedCountry.OP,
                                selectedCountry.AP
                            ],
                            theta: ["Air Pollution (AP)",  "Lead Pollution (LP)",  "Water Pollution (WP)", "Occupational Pollution (OP)", "Air Pollution (AP)"],
                            fill: "toself",
                            name: "Pollution",
                            marker: {size: 15},
                            mode: "lines+markers", // connect markers with a line
                            line: {
                                color: "#7d3f20", // set the line color to red with an opacity of 0.5
                                width: 1 // set the line width to 2
                              }
                        },
                    ];

                    const layout = {
                        polar: {
                            radialaxis: {
                                visible: true,
                                range: [0, maxPollutionValue]
                            }
                        },
                        showlegend: false,
                        legend: {
                            x: 0.05,
                            y: 0.95
                        },
                        paper_bgcolor:'rgba(0,0,0,0)',
                        plot_bgcolor :'rgba(0,0,0,0)',
                    };

                    Plotly.newPlot("radar_chart", radarData, layout);
                // Country Info Section
                    const subjectMetadata = d3.select('#sample-metadata');
                    subjectMetadata.html('');

                    const table = subjectMetadata.append('table');
                    const tbody = table.append('tbody');

                    const keyOrder = {
                        "TP": "TP_Rank",
                        "AP": "AP_Rank",
                        "OP": "OP_Rank",
                        "LP": "LP_Rank",
                        "WP": "WP_Rank"
                      };
                      
                      Object.entries(keyOrder).forEach(([key, value]) => {
                        const tr = tbody.append('tr').style("width", "400px");
                        tr.append('td').html(`<span class="panel-keys">${key}:</span>`); 
                        tr.append('td').html(`<span class="panel-values">${selectedCountry[value]}</span>`).style("text-align", "right").style("width", "300px");
                        });

                }
                else {
                    alert("The name of the country provided is inaccurate. It is important to capitalize the name of the country correctly, starting with an uppercase letter. For instance, please use 'Canada' instead of writing it in lowercase as 'canada' or in all caps as 'CANADA'")
                }
            });
        });
});
