let searchInput = document.getElementById("searchInput");
let resultsContainer = document.getElementById("resultCountries");
let spinner = document.getElementById("spinner");

let countriesData = [];
let searchedData = [];
let wordToSearch = "";

function resultsToDisplay(country) {
    let countryData = document.createElement("div");
    countryData.classList.add("country-card", "d-flex", "flex-row", "align-items-center", "m-2", "col-11", "col-md-5");
    resultsContainer.appendChild(countryData);

    let countryFlag = document.createElement("img");
    countryFlag.setAttribute("src", `${country.flag}`);
    countryFlag.classList.add("country-flag");
    countryData.appendChild(countryFlag);

    let countryTextContainer = document.createElement("div");
    countryTextContainer.classList.add("d-flex", "flex-column", "p-2", "ml-3");
    countryData.appendChild(countryTextContainer);

    let countryName = document.createElement("h1");
    countryName.classList.add("country-name");
    countryName.textContent = country.name;
    countryTextContainer.appendChild(countryName);

    let countryPopulation = document.createElement("p");
    countryPopulation.textContent = country.population;
    countryPopulation.classList.add("country-population");
    countryTextContainer.appendChild(countryPopulation);
}

function getMatchedResults(wordToSearch) {
    let searchedData = [];
    for (let country of countriesData) {
        let countryName = country.name;
        if (countryName.includes(wordToSearch)) {
            searchedData.push(country);
        }
    }
    return searchedData;
}

function getTheCountriesData() {
    let requestUrl = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    spinner.classList.remove("d-none");
    fetch(requestUrl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            countriesData.push(...data);
            spinner.classList.add("d-none");
            for (let country of data) {
                resultsToDisplay(country);
            }
        });
}
getTheCountriesData();

searchInput.onkeyup = function(event) {
    wordToSearch = event.target.value;
    searchedData = getMatchedResults(wordToSearch);
    resultsContainer.textContent = "";

    for (let country of searchedData) {
        resultsToDisplay(country);
    }
    console.log(wordToSearch);
    console.log(searchedData);
};



console.log(countriesData);