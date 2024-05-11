

const API_KEY = "AIzaSyCg8ECVHisRwURB-k41b_dgXkiPxrtD6RI";
var map;
let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

function logout() {
    window.location.assign('index.html');
}
window.onload = () => {
    window.scrollTo({ top: 0, behavior: 'auto' }); // Starts window from top of the page
};


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 200;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

    if(top >= offset && top < offset + height) {
        navlinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href="#' + id + '"]').classList.add("active");
            return;
            });
        };

    });
};




function initMap() {
    var location = {lat:51.5, lng:-0.01}

    //new map
    var map = new google.maps.Map(document.getElementById('map-container'), {
        zoom:10.9,
        center:location,
        mapId: '53c21e62b06dfec'
    });


    fetch("http://localhost:3000/business")
    .then(res => res.json())
    .then(json => {
        json.forEach(async (data) => {
            const address = data.address;
            const name = data.name;
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
                const responseData = response.data
                const location = responseData.results[0].geometry.location;
                // Call a function to create a marker with the location

                console.log(location);

                createMarker(map, location, name);
                
            } catch (error) {
                console.error(`Error geocoding address for ${data.name}`, error);
            }
        });
    });

    
}

let body = document.getElementById("cuisine")

fetch("http://localhost:3000/business")
    .then(res => res.json())
    .then(json => {
        json.map(data => {
            console.log(data)
            body.append(addCuisine(data));
        })
    })





function addCuisine({name,image,description,address,contact,rating,website}) {
    let div = document.createElement('div');
    div.classList.add("cuisine-container");

    div.innerHTML = `
        <div class="title"><h3 id="${name}">${name}</h3></div>
        <div class="image-info-container">
            <div class="food-image"><img src="${image}" alt="food of restautant image"></div>
            <div class="info">
                <h3>About ${name}</h3>
                <p>${description}</p>
            </div>
        </div>   
        <div class="details">         
            <p>Address: ${address}</p>
            <p>Contact Info: ${contact}</p>
            <p class="rating">Customer Rating:</p>
            <div>
                <p class="rating-number">${rating}</p>
            </div>
        </div>

        <div class="weblink">
            <a href="${website}" target="_blank" class="website-link">

            Access Website
            </a>

            <a class="back-to-map" href="#map">
                Back to Map
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                    <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                </svg>
                
            </a>
        </div>
    `;
    return div
}

    function createMarker(map, location, name) {

        

        //custom marker
        

        // create marker for the location
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: name
        });

        marker.addListener('mouseover', () => {
            const infoWindow = new google.maps.InfoWindow({
                content:  `<div style="color: black; font-weight: bold;">
                            ${name}
                        </div>`,
                disableAutoPan: true
            });
            infoWindow.open(map, marker);
        
        
        // Closes the info window when mouse leaves the marker
        marker.addListener('mouseout', () => {
            infoWindow.close();
            });
        });


        marker.addListener('click', () => {
            const hash = `#${name}`;

            window.location.hash = hash;
        });
    }


    
 
initMap();






