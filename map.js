// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5jZW5zaW9uMDA4IiwiYSI6ImNtMGFxbXZvMzAwbHcybHNicmIwdGhzbGQifQ.yVnDzbGEhA6Hu1HYMAuAHw';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // The id of the container element
    style: 'mapbox://styles/mapbox/streets-v11', // The style URL
    center: [120.9842, 14.5995], // Manila, Philippines
    zoom: 15
});

// List of restaurants with names and coordinates
const restaurants = [
    { id: 1, name: 'Grilled House', coordinates: [120.986, 14.604] },
    { id: 2, name: 'Pasta Palace', coordinates: [120.982, 14.600] },
    { id: 3, name: 'Sushi Spot', coordinates: [120.988, 14.596] },
    { id: 4, name: 'Burger Bliss', coordinates: [120.980, 14.601] }
];

const restaurantList = document.getElementById('restaurant-list');

// Add markers and populate the list dynamically
restaurants.forEach((restaurant) => {
    // Create a marker for each restaurant
    const marker = new mapboxgl.Marker()
        .setLngLat(restaurant.coordinates)
        .addTo(map);

    // Create a button for each restaurant
    const listItem = document.createElement('div');
    listItem.className = 'restaurant d-flex justify-content-between align-items-center mb-3';
    listItem.innerHTML = `
        <button class="btn btn-lg btn-primary text-start w-100">
        <span>${restaurant.id}. ${restaurant.name}</span>
       </button>
    `;
    listItem.dataset.coordinates = JSON.stringify(restaurant.coordinates);

    // Add click event to the button
    listItem.querySelector('button').addEventListener('click', () => {
        const [lng, lat] = JSON.parse(listItem.dataset.coordinates);
        map.flyTo({
            center: [lng, lat],
            zoom: 15,
            essential: true
        });
    });

    // Append the restaurant item to the list
    restaurantList.appendChild(listItem);
});
