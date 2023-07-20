'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
/*to get the user's current location it ggets two function oneis for success and another is for failure */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('Workout')
        .openPopup();
      map.on('click', function(mapEvent) {
        form.classList.remove('hidden');
        inputDistance.focus();
      }); /*this on method des'nt come from javasxript instead it comes from the leaflet */
    },
    function() {
      alert('could not get ypur position');
    }
  );
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  inputDistance.value = inputElevation.value = inputDuration.value = inputCadence.value =
    '';
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 150,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup'
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function() {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
