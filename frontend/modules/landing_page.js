import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities)

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const response = await fetch(`${config.backendEndpoint}/cities`)
    const data =await response.json();
    return  data;

  }catch(e){
    return null
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const row = document.getElementById("data");
  row.innerHTML += 
  `<div class="col-6 col-md-3  mb-4">
  <a id="${id}" href="pages/adventures/?city=${id.toLowerCase()}">
    <div id="${id}" class="tile">
      <img src=${image} alt=${id}/>
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <h5>${description}</h5>
     </div>
    </div>
    </a>
  </div>`
}

export { init, fetchCities, addCityToDOM };

