// Function to fetch data from the API and display on the webpage
async function fetchAndDisplayTravelData(keyword) {
    try {
        const response = await fetch('./travel_recommendation_api.json');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        const filteredData = data.countries.flatMap(country =>
            country.cities.filter(city =>
                city.name.toLowerCase().includes(keyword.toLowerCase())
            )
        );

        const resultsContainer = document.getElementById('resultsContainer');

        if (filteredData.length > 0) {
            resultsContainer.innerHTML = ''; // Clear previous results

            filteredData.forEach(item => {
                const name = item.name;
                const imageUrl = item.imageUrl;
                const description = item.description;

                // Create elements to display data
                const resultItem = document.createElement('div');
                resultItem.classList.add('result');

                const nameElement = document.createElement('h3');
                nameElement.textContent = name;

                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.alt = name;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = description;

                // Append elements to the results container
                resultItem.appendChild(nameElement);
                resultItem.appendChild(imageElement);
                resultItem.appendChild(descriptionElement);

                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = 'No matching results found.';
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function to clear the results container
function clearResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }
}

// Event listener for the Search button
const searchButton = document.getElementById('searchButton');
if (searchButton) {
    searchButton.addEventListener('click', function () {
        const searchBar = document.getElementById('searchBar');
        if (searchBar) {
            const keyword = searchBar.value;
            fetchAndDisplayTravelData(keyword);
        }
    });
}

// Event listener for the Clear button
const clearButton = document.getElementById('clearButton');
if (clearButton) {
    clearButton.addEventListener('click', function () {
        clearResults();
    });
}

// Function to fetch country-specific date and time
async function fetchCountryDateTime(country) {
    try {
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${country}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        const dateTime = data.datetime;
        const formattedDateTime = new Date(dateTime).toLocaleString('en-US', {
            timeZone: country,
            timeStyle: 'medium',
            hourCycle: 'h24'
        });

        // Displaying the date and time
        const dateTimeContainer = document.getElementById('countryDateTime');
        if (dateTimeContainer) {
            dateTimeContainer.textContent = `Current date and time in ${country}: ${formattedDateTime}`;
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Call this function with the desired country
fetchCountryDateTime('America/New_York'); // Change the country as needed
