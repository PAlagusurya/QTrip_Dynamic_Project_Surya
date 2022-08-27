import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search)
  const getAdventureId = params.get("adventure")
  //console.log(getAdventureId)
  return getAdventureId;
  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const url = config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`
    const getAdventureDetail = await fetch(url);
    const Details = await getAdventureDetail.json();
    return Details;
  }catch(e){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure)
  const getName = document.getElementById("adventure-name");
  getName.textContent = `${adventure.name}`

  const getPara = document.getElementById("adventure-subtitle");
  getPara.textContent = `${adventure.subtitle}`

  const getParentImages = document.getElementById("photo-gallery")
  let childImage = ""
  Array.from(adventure.images).forEach(image =>{
    childImage = `
    <div class="activity-card-image">
    <img src="${image}">
    </div>`
    
    getParentImages.innerHTML += childImage;
  });
    
  const contentOftheDiv = document.getElementById("adventure-content")
  contentOftheDiv.textContent = `${adventure.content}`
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const getParentDiv = document.getElementById("photo-gallery")
  //console.log(getParentDiv)
  getParentDiv.innerHTML = getCarouselOuterStructure();
  //console.log("outerStruct",outerStruct)
  //const parentDiv = document.getElementsByClassName("carousel-inner")
  const parentDiv = document.getElementById("addImages");
 
  //console.log("ParentDiv",parentDiv)
  addCarouseltoDOM(parentDiv,images);

}
function getCarouselOuterStructure(){
  return `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="addImages">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
}

function addCarouseltoDOM(parentDOM,images){
  images.forEach((imgLink,idx)=>{

    const createdDiv = document.createElement("div");

    (idx === 0)
    ?createdDiv.classList.add("carousel-item","active")
    :createdDiv.classList.add("carousel-item")

    createdDiv.innerHTML = `
    <img src="${imgLink}" class="d-block w-100" alt="..."> `

    parentDOM.appendChild(createdDiv); 
  })
  
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log(adventure)
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display ="none";
    document.getElementById("reservation-panel-available").style.display ="block";
    const costForAdventure = adventure.costPerHead
    //console.log(costForAdventure)
    document.getElementById("reservation-person-cost").textContent = costForAdventure;
  }
  else{
    document.getElementById("reservation-panel-available").style.display ="none";
    document.getElementById("reservation-panel-sold-out").style.display ="block";
  }
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost = persons * adventure.costPerHead;
  document.getElementById("reservation-cost").textContent = totalCost;

}

//Implementation of reservation form submission


const makePostRequest = async (postData) => {
  //const url = "https://jsonplaceholder.typicode.com/posts";
  const url = config.backendEndpoint + `/reservations/new`;
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
};

function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const form = document.getElementById("myForm")
  form.addEventListener("submit",async(e)=>{
    e.preventDefault()//preventing default redirection

    //capturing the query details 

    //use date constructor for the readable date
    const date = new Date(form.elements["date"].value)
  

    const data = {
      name:form.elements["name"].value,
      date:date,
      person:form.elements["person"].value,
      adventure:adventure.id
    };
    
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    makePostRequest(data).then(data => {
      if(!data.ok){
        alert("Failed!")
      }else{
        alert("Success!")
        location.reload();//to refresh the page
      }
    })
  
  });
};



//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  //console.log(adventure)
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display ="block";
  }
  else{
    document.getElementById("reserved-banner").style.display ="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
