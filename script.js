

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

    //fetch data to use in creating marker
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

                // testing that location displays as expected
                console.log(location);
                // calling function to create a marker with the retrieved variables
                createMarker(map, location, name);
                
            } catch (error) {
                console.error(`Error geocoding address for ${data.name}`, error);
            }
        });
    });

    
}

function createMarker(map, location, name) {

    //create marker using variables
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












//retrieving html element for where I want to add the cuisine entities
let body = document.getElementById("cuisine")



//retreiving cuisine data from json data displayed in the link.

fetch("http://localhost:3000/business")
    //convert response from fetch method to json data format
    .then(res => res.json())
    //process the jason data format
    .then(json => {
        //map fuction to iterate through json data format.
        json.map(data => {
            console.log(data)
            //appending the div created from addCuisine to the html element.
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cursor-fill" viewBox="0 0 16 16">
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
            </svg>
            </a>

            <a class="back-to-map" href="#map">
                Back to Map
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                
            </a>
        </div>
    `;
    return div
}

    
    
window.initMap = initMap;

window.logout = logout;









