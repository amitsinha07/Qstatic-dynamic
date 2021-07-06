
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get('city')
  return city
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const data = await response.json();
    return data;
  }catch(e){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.map(val =>{
    const {id, category, image, name, costPerHead, duration} = val
    const row = document.getElementById("data");
    row.innerHTML += 
    ` <div class="mb-4 col-6 col-md-3">
          <a id=${id} href="detail/?adventure=${id}">
          <span class="category-banner">${category}</span>
          <div class="activity-card">
            <img src=${image} class="img-fluid " alt="" />
            <div class="px-1 w-100 d-flex justify-content-between align-items-center">
              <h5>${name}</h5>
              <h6>&#x20B9;${costPerHead}</h6>
            </div>
            <div class="px-1 w-100 d-flex justify-content-between align-items-center">
              <h5>Duration</h5>
              <h6>${duration} Hours</h6>
            </div>
          </div>
        </a>
        </div>
    </div>`
  })


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  
  return list.filter( option => option.duration>=low && option.duration <= high)
 


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let arr = []
  for(let category of categoryList){
     let filterarr = list.filter(option => option.category === category)
     arr = [...arr,...filterarr]
  }
  return arr;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
if(filters.category.length !== 0 && filters.duration.length === 0){
 return filterByCategory(list, filters.category)
}
else if(filters.duration.length !== 0 && filters.category.length === 0){
  let durationOption = filters.duration.split("-")
  return filterByDuration(list, parseInt(durationOption[0]), parseInt(durationOption[1]))
}
else if(filters.category.length !== 0 && filters.duration.length !== 0){
  let durationOption = filters.duration.split("-")
  let durationFilter = filterByDuration(list, parseInt(durationOption[0]), parseInt(durationOption[1]))
  return filterByCategory(durationFilter, filters.category);
}


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  let filtersData = JSON.stringify(filters);
  localStorage.setItem("filters", filtersData)


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let filterData = localStorage.getItem("filters");
  console.log(filterData)
  if(filterData !== null){
    return JSON.parse(filterData)
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
const categoryList = document.getElementById('category-list');
for(let category of filters.category){
  categoryList.innerHTML += 
  `<span class="category-filter">${category}</span>`
}
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
