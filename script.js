function logout() {
    window.location.assign('index.html');
}

function initMap() {

    var location = {lat:51.5, lng:-0.13}

    //new map
    var map = new google.maps.Map(document.getElementById('map-container'), {
        zoom:10.1,
        center:location
    })

   /* function addMarker(coords) {
        var market = new google.maps.Marker({
        position:{coords},
        map:map,
    });
    } 

    addMarker({lat:51.5080, lng:0.1262}); */

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
        <div class="title"><h3>${name}</h3></div>
        <div class="image-info-container">
            <div class="food-image"><img src="${image}" alt="food of restautant image"></div>
            <div class="info"><p>${description}</p></div>
        </div>   
        <div class="details">         
            <p>Address: ${address}</p>
            <p>Contact Info: ${contact}</p>
            <p class="rating">Customer Rating: ${rating}</p>
        </div>

        <div class="weblink">
            <a href="${website}">Click Here to Access Website</a>
        </div>
    
    `;
    return div
}


initMap()

addCuisine();





