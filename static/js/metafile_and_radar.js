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
                                selectedCountry.OP,
                                selectedCountry.WP
                            ],
                            theta: ["Air Pollution (AP)",  "Lead Pollution (LP)", "Occupational Pollution (OP)", "Water Pollution (WP)"],
                            fill: "toself",
                            name: "Pollution"
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
                        plot_bgcolor: "#FFFBF0",
                        paper_bgcolor: "#FFFBF0"
                    };

                    Plotly.newPlot("radar_chart", radarData, layout);
                    const subjectMetadata = d3.select('#sample-metadata');
                    subjectMetadata.html('');
                
                    const table = subjectMetadata.append('table');
                    const tbody = table.append('tbody');
                
                    Object.entries(selectedCountry).forEach(([key, value]) => {
                      const tr = tbody.append('tr').style("width", "220px");
                      tr.append('td').html(`<span class="panel-keys">${key}:</span>`);
                      tr.append('td').html(`<span class="panel-values">${value}</span>`).style("text-align", "right")
                      .style("width", "220px");});

                }
                else {
                    alert("The name of the country provided is inaccurate. It is important to capitalize the name of the country correctly, starting with an uppercase letter. For instance, please use 'Canada' instead of writing it in lowercase as 'canada' or in all caps as 'CANADA'")
                }
            });
        });
});
