
function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.98,-76.9378],13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGNoYXU5OCIsImEiOiJja203Nzk5bXEwdjY5Mm9xczNzMjQ3dzlxIn0.EBBKHlK90klYCbzaXDNADA'
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const arrayName = await request.json()
  


  function findMatches(wordToMatch, arrayName) {
    return arrayName.filter(place => {
        
        const regex = new RegExp(wordToMatch, 'gi');
        return place.geocoded_column = 1 && place.zip.match(regex) || place.category.match(regex) || place.name.match(regex) 
    });
    
  }

  function displayMatches(event) {

    const matchArray = findMatches(event.target.value, arrayName);
    console.table(matchArray);
    const html = matchArray.map(place => {
        const regex = new RegExp(event.target.value, 'gi');
        const Name = place.name.replace(regex, `<span class="h1">${event.target.value}</span>`);
        const Category = place.category.replace(regex, `<span class="h1">${event.target.value}</span>`);
        const Address = place.address_line_1.replace(regex, `<span class="h1">${event.target.value}</span>`);
        const City = place.city.replace(regex, `<span class="h1">${event.target.value}</span>`);
        const Zip = place.zip.replace(regex, `<span class="h1">${event.target.value}</span>`);
        return `
            <li>
            <span class = "name">${Name}</span>
            <span class = "category">${Category}</span>
            <span class = "address">${(Address).italics()}</span>
            <span class = "city">${(City).italics()}</span>
            <span class = "zip">${(Zip).italics()}</span>
            </li>
        
        `;
    }).join('');
    suggestions.innerHTML = html.toUpperCase();
  }

  const userInputs = document.querySelector('.input');
  const suggestions = document.querySelector('.suggestions');


  userInputs.addEventListener('keyup', (event) => {
    event.preventDefault()
    displayMatches(event)
  })
  
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;