import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const url = config.backendEndpoint + `/reservations/`;
    const fetchPromise = await fetch(url);
    const fetchedDetails = await fetchPromise.json(); 
    return fetchedDetails;
  }catch(e){
    return null
  }
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
async function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //console.log(reservations)
  //Conditionally render the no-reservation-banner and reservation-table-parent
    if (reservations.length > 0) {
      document.getElementById("no-reservation-banner").style.display = "none";
      document.getElementById("reservation-table-parent").style.display = "block";
    } else {
      document.getElementById("no-reservation-banner").style.display = "block";
      document.getElementById("reservation-table-parent").style.display = "none";
    }
    /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format DD/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    
    reservations.map((item,idx) =>{
      const date = new Date(item.date);
      let getDate = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const BookedDate = getDate + '/' + month +'/'+year
    
      const time = new Date(item.time);
      const BookingTime = time.toLocaleString("en-IN",{
        day:'numeric',
        month:'long',
        year:'numeric',
        hour:'numeric',
        minute:'numeric',
        second:'numeric'
      });

      const createdRow = document.createElement("tr");

      createdRow.innerHTML = `
      <th>${item.id}</th>
      <td>${item.name}</td>
      <td>${item.adventureName}</td>
      <td>${item.person}</td>
      <td>${BookedDate}</td>
      <td>${item.price}</td>
      <td>${BookingTime}</td>
      <td><div class="reservation-visit-button" id=${item.id}>
      <a href="../detail/?adventure=${item.adventure}">
        Visit Adventure</a></div></td>
      `

      document.getElementById("reservation-table").appendChild(createdRow);
      
    });

}
  
    // const getParentElement = document.getElementById("reservation-table")
    // let reservedDetails = "";
    // Array.from(reservations).forEach(item =>{

    //   const date = new Date(item.date);
    //   let getDate = date.getDate();
    //   let month = date.getMonth() + 1;
    //   let year = date.getFullYear();

    //   const BookedDate = getDate + '/' + month +'/'+year
    
    //   const time = new Date(item.time);
    //   const BookingTime = time.toLocaleString("en-IN",{
    //     day:'numeric',
    //     month:'long',
    //     year:'numeric',
    //     hour:'numeric',
    //     minute:'numeric',
    //     second:'numeric'
    //   });

    //   reservedDetails = 
    //   <td>${item.id}</td>
    //   <td>${item.name}</td>
    //   <td>${item.adventure}</td>
    //   <td>${item.person}</td>
    //   <td>${BookedDate}</td>
    //   <td>${item.price}</td>
    //   <td>${BookingTime}</td>
    //   <td class="reservation-visit-button"><a href="../index.html">Visit Adventure</a></td>`
      

    // });
    // getParentElement.innerHTML += reservedDetails
  
  
  

  



export { fetchReservations, addReservationToTable };
