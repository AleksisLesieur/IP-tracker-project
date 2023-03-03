// // navigator.geolocation.getCurrentPosition(getPosition);
// let marker, circle, lat, long, accuracy;
// var latlng = L.latLng(50.5, 30.5);
// var corner1 = L.latLng(40.712, -74.227);
// var corner2 = L.latLng(40.774, -74.125);
// var bounds = L.latLngBounds(corner1, corner2);
// map.panBy([200, 300]);
// map.panBy(L.point(200, 300));

// function getPosition() {
// console.log(position)
//   lat = position.coords.latitude;
//   long = position.coords.longitude;
//   accuracy = position.coords.accuracy / 2;
// lat = 54.6627202;
// long = 25.293591;
// accuracy = 1673.307411212622;
//   console.log(marker, circle);
// if (marker) {
//     map_init.removeLayer(marker)
// }

// if (circle) {
//     map_init.removeLayer(circle)
// }

//   marker = L.marker([lat, long]).addTo(map);
//   circle = L.circle([lat, long], { radius: accuracy }).addTo(map);

//   let featureGroup = L.featureGroup([marker, circle]).addTo(map_init);

//   console.log(map_init);

//   map_init.fitBounds(featureGroup.getBounds());

//   console.log(
//     "Your coordinate is: Lat: " +
//       lat +
//       " Long: " +
//       long +
//       " Accuracy: " +
//       accuracy
//   );
// }
// getPosition();

const main = document.querySelector("main");

let toggle = true;

main.addEventListener("click", function () {
  if (toggle) {
    main.style.setProperty("z-index", "2");
    toggle = false;
  } else {
    main.style.setProperty("z-index", "2000");
    toggle = true;
  }
});

const dataIP = document.querySelector(".data-ip");
const dataLocation = document.querySelector(".data-location");
const dataTimezone = document.querySelector(".data-timezone");
const dataISP = document.querySelector(".data-isp");
const svg = document.querySelector("svg");

svg.addEventListener("click", function () {
  map_init.panTo(new L.LatLng(40.737, -73.923));
});

// map_init = L.map("map", {
//   center: coordinates,
//   zoom: 13,
// });

// map_init.panTo(new L.LatLng(40.737, -73.923));

let reRender = true;

let map_init;

svg.addEventListener("click", function () {});
document.addEventListener("DOMContentLoaded", entireProject);

// svg.addEventListener("click", map.off());

async function ipSearch() {
  // await fetch(
  //   `https://geo.ipify.org/api/v2/country,city?apiKey=at_zVKFWWrUbDoqOAgXEXq6r5SMbTGQN&ipAddress=${
  //     document.querySelector("#ipSearch").value
  //   }`
  // )
  //   .then((res) => res.json())
  //   .then(function (data) {
  //     result = data;
  //   });
  dataIP.innerHTML = result.ip;
  dataTimezone.innerHTML = result.location.timezone + " GMT";
  dataISP.innerHTML = result.isp;

  addEventListener("resize", resizing);
  function resizing() {
    if (window.innerWidth > 1252) {
      dataLocation.innerHTML = `<span>${result.location.country}</span>  <span>${result.location.city}</span>`;
    } else {
      dataLocation.innerHTML = `<div>${result.location.country}</div><br><div>${result.location.city}</div>`;
    }
  }

  resizing();

  let coordinates = [result.location.lat, result.location.lng];

  // this is what must be rerendered

  // map_init.panTo(new L.LatLng(40.737, -73.923));

  map_init.panTo(new L.LatLng(...coordinates));

  map_init = L.map("map", {
    center: coordinates,
    zoom: 13,
  });
}

async function entireProject() {
  // getting user IP address using a different API, therefore making it free
  let userIP = "";

  await fetch("https://api64.ipify.org/?format=json", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then(function (data) {
      userIP = data.ip;
      document.querySelector("#ipSearch").value = data.ip;
    });

  console.log(userIP);

  let result;

  await fetch("https://mocki.io/v1/e07f5179-7fd8-4efc-873a-263d681313c6", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((res) => res.json())
    .then(function (data) {
      result = data;
    });

  // this is our limited API that makes all the logic happen

  // await fetch(
  //   `https://geo.ipify.org/api/v2/country,city?apiKey=at_zVKFWWrUbDoqOAgXEXq6r5SMbTGQN&ipAddress=${userIP}`
  // )
  //   .then((res) => res.json())
  //   .then(function (data) {
  //     result = data;
  //   });

  // svg.addEventListener("click", apiCall);
  // apiCall();

  dataIP.innerHTML = result.ip;
  dataTimezone.innerHTML = result.location.timezone + " GMT";
  dataISP.innerHTML = result.isp;

  addEventListener("resize", resizing);
  function resizing() {
    if (window.innerWidth > 1252) {
      dataLocation.innerHTML = `<span>${result.location.country}</span>  <span>${result.location.city}</span>`;
    } else {
      dataLocation.innerHTML = `<div>${result.location.country}</div><br><div>${result.location.city}</div>`;
    }
  }

  resizing();

  let coordinates = [result.location.lat, result.location.lng];

  // this is what must be rerendered

  map_init = L.map("map", {
    center: coordinates,
    zoom: 13,
  });

  // map_init.panTo(new L.LatLng(40.737, -73.923));
  console.log(map_init);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map_init);
  console.log(osm);
  L.Control.geocoder().addTo(map_init);

  accuracy = 1673.307411212622;
  let circle = L.circle(coordinates, { radius: accuracy }).addTo(map_init);
  // @ViewChild('map') mapContainer;

  let marker = L.marker(coordinates, { alt: "Vilnius" })
    .addTo(map_init) // "Kyiv" is the accessible name of this marker
    .bindPopup("you are somewhere here...")
    .openPopup();
}
