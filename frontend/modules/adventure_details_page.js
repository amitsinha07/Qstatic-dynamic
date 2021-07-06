import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
 const urlParams = new URLSearchParams(search);
 const adventure = urlParams.get('adventure');
 if(adventure !== null){
   return adventure
 }
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
  const data = await response.json();
  return data
  }
catch(e){
  return null
}
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const {name, subtitle, images, content} = adventure;
  const adventureName = document.getElementById("adventure-name");
  const adventureSubtitle = document.getElementById("adventure-subtitle");
  const photoGallery = document.getElementById("photo-gallery");
  const adventureContent = document.getElementById("adventure-content");

  adventureName.innerHTML = name;
  adventureSubtitle.innerHTML = subtitle;
  for(const image of images){
    photoGallery.innerHTML += 
    `<div class="col-12">
    <img class="activity-card-image" src=${image} alt=${name}/>
    </div>`
  }
  adventureContent.innerHTML = content

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.classList.add("carousel", 'slide');
  photoGallery.classList.remove('row');
  photoGallery.setAttribute( 'data-ride',"carousel");
  photoGallery.innerHTML = '<div class="carousel-inner" id="photo-gallery-inner"></div>';
  photoGallery.innerHTML += `<ol class="carousel-indicators"></ol>`
  photoGallery.innerHTML += 
  `<a class="carousel-control-prev" href="#photo-gallery" role="button" data-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="sr-only">Previous</span>
</a>`
photoGallery.innerHTML += 
`<a class="carousel-control-next" href="#photo-gallery" role="button" data-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="sr-only">Next</span>
</a>`
  const carouselIndicator = document.querySelector(".carousel-indicators");
  const photoGalleryInner = document.getElementById("photo-gallery-inner")
  let cnt = 0;
  for(const image of images){
   if(cnt ===0){
    carouselIndicator.innerHTML += 
    `<li data-target="#photo-gallery" data-slide-to="${cnt}" class="active"></li>`
    photoGalleryInner.innerHTML += 
    `<div class="carousel-item active">
    <img class="activity-card-image" src=${image} alt=${name}/>
    </div>` 
   }else{
    carouselIndicator.innerHTML += 
    `<li data-target="#photo-gallery" data-slide-to="${cnt}"></li>`
    photoGalleryInner.innerHTML += 
    `<div class="carousel-item">
    <img class="activity-card-image" src=${image} alt=${name}/>
    </div>`
   }
   cnt++
  }

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reservationPanelAvailable = document.querySelector('#reservation-panel-available');
  let reservationPersonCost = document.querySelector('#reservation-person-cost');
  let reservationPanelSoldOut = document.querySelector('#reservation-panel-sold-out');

  if(adventure?.available){
    reservationPanelAvailable.style.display = 'block'
     reservationPanelSoldOut.style.display = 'none'
    reservationPersonCost.innerHTML = adventure.costPerHead??0
  }else{
    reservationPanelAvailable.style.display = 'none'
    reservationPanelSoldOut.style.display = 'block'
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost = document.querySelector('#reservation-cost');
  let cost = parseInt(adventure.costPerHead)*parseInt(persons)
  cost && (reservationCost.innerHTML = cost)

}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  const myForm = document.querySelector("#myForm");
  $(myForm).submit((event)=>{
    event.preventDefault();
    console.log($("#myForm").serialize()+'&'+$.param({ 'adventure': adventure.id }))
    $.ajax({
      url: `${config.backendEndpoint}/reservations/new`,
      type: 'post',
      // dataType: 'application/json',
      data: $("#myForm").serialize()+'&'+$.param({ 'adventure': adventure.id }),
      success: () =>{
        alert("Success!");
        location.reload();
      },
      error: function () {
        alert("Failed!");
      }
    })
  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.querySelector('#reserved-banner');
  if(adventure.reserved){
    reservedBanner.style.display = 'block'
  }else{
    reservedBanner.style.display = 'none'
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
