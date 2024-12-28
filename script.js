'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map,MapEvent;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let { latitude } = position.coords
    let { longitude } = position.coords
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    
    const coords =[latitude,longitude]
     map = L.map('map').setView(coords, 13);
    const googleMapsTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs={layer}&x={x}&y={y}&z={z}', {
      attribution: '&copy; <a href="https://maps.google.com">Google Maps</a>',
      layer: 'm', // 's' for Satellite, 'm' for Map, 'p' for Terrain
      maxZoom: 10,
  });
  googleMapsTileLayer.addTo(map);
  
    map.on('click', function (MapE) {
      MapEvent = MapE;
      form.classList.remove("hidden");
      inputDistance.focus();
    })
  }, function () {
    alert(`could not get your location`)
  })
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value=""
  const { lat, lng } = MapEvent.latlng;
      L.marker([lat,lng]).addTo(map)
        .bindPopup(L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className:"running-popup",
        }))
        .setPopupContent("workout")
        .openPopup();
})
inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
})