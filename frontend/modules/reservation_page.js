import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
  const response = await fetch(`${config.backendEndpoint}/reservations/`);
  const data = await response.json();
  return data
  }
  catch(e){
    return null
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 console.log(reservations);
 const reservationTable = document.querySelector("#reservation-table");
 if(reservations.length){
   document.querySelector('#no-reservation-banner').style.display = 'none'
   document.querySelector('#reservation-table-parent').style.display = 'block';

   reservations.map(reservation =>{
    const {adventure, adventureName, date, id, name, person, price, time}= reservation
     reservationTable.innerHTML += 
    `<tr >
    <td scope="col">${id}</td>
    <td scope="col">${name}</td>
    <td scope="col">${adventureName}</td>
    <td scope="col">${person}</td>
    <td scope="col">${new Date(date).toLocaleDateString('en-IN')}</td>
    <td scope="col">${price}</td>
    <td scope="col">${new Date(time).toLocaleString('en-IN',{ day: 'numeric', month: 'long', year: 'numeric', hour:'numeric', minute:'numeric', second:'numeric'})}</td>
    <td id=${id} scope="col" class="reservation-visit-button"><a  href='../detail/?adventure=${adventure}'>Visit Adventure</a></td>
  </tr>`
   })
 }else{
  document.querySelector('#no-reservation-banner').style.display = 'block'
  document.querySelector('#reservation-table-parent').style.display = 'none'
 }
}

export { fetchReservations, addReservationToTable };

