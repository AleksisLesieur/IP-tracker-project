let marker = "";

document.addEventListener("DOMContentLoaded", entireProject);

const dataIP = document.querySelector(".data-ip");
const dataLocation = document.querySelector(".data-location");
const dataTimezone = document.querySelector(".data-timezone");
const dataISP = document.querySelector(".data-isp");
const dataCalls = document.querySelector(".data-calls");
const svg = document.querySelector("svg");

let amountLeft = 0;

async function apiCallsLeft() {
  await fetch(
    "https://geo.ipify.org/service/account-balance?apiKey=at_zVKFWWrUbDoqOAgXEXq6r5SMbTGQN"
  )
    .then((res) => res.json())
    .then(function (data) {
      amountLeft = data.credits;
    });
  dataCalls.innerHTML = Math.trunc(amountLeft / 2);
}
apiCallsLeft();

async function newSearch() {
  let result;
  await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_zVKFWWrUbDoqOAgXEXq6r5SMbTGQN&ipAddress=${
      document.querySelector("#ipSearch").value
    }`
  )
    .then((res) => res.json())
    .then(function (data) {
      result = data;
    });
  let coordinates = [result.location.lat, result.location.lng];
  console.log("coordinates" + coordinates);
  map_init.panTo(new L.LatLng(...coordinates));
  dataIP.innerHTML = result.ip;
  dataTimezone.innerHTML = result.location.timezone + " GMT";
  dataISP.innerHTML = result.isp;
  marker.setLatLng(coordinates);
  addEventListener("resize", resizing);
  function resizing() {
    if (window.innerWidth > 1252) {
      dataLocation.innerHTML = `<span>${result.location.country}</span>  <span>${result.location.city}</span>`;
    } else {
      dataLocation.innerHTML = `<div>${result.location.country}</div><br><div>${result.location.city}</div>`;
    }
  }
  resizing();
  accuracy = 3673.307411212622;
  let circle = L.circle(coordinates, { radius: accuracy }).addTo(map_init);

  apiCallsLeft();
}

svg.addEventListener("click", newSearch);

let reRender = true;

let map_init;

function ipSearch() {
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

  map_init.panTo(new L.LatLng(...coordinates));

  map_init = L.map("map", {
    center: coordinates,
    zoom: 13,
  });
  marker = L.marker(coordinates, { alt: "Vilnius" })
    .addTo(map_init)
    .bindPopup("you are somewhere here...")
    .openPopup();
  apiCallsLeft();
}

async function entireProject() {
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

  let result2 = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_zVKFWWrUbDoqOAgXEXq6r5SMbTGQN&ipAddress=${userIP}`
  )
    .then((res) => res.json())
    .then(function (data) {
      result = data;
    });
  console.log(result2);

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

  accuracy = 3673.307411212622;
  let circle = L.circle(coordinates, { radius: accuracy }).addTo(map_init);
  // @ViewChild('map') mapContainer;

  marker = L.marker(coordinates, { alt: "Vilnius" })
    .addTo(map_init) // "Kyiv" is the accessible name of this marker
    .bindPopup("you are somewhere here...")
    .openPopup();

  apiCallsLeft();
}

console.log(
  "Hello there! It's Aleksis, the developer of this application! Just wanted to let you know that I'm aware the amount of API calls left do not appear, I'm currently fixing this... However! If you enable CORS in your browser, it will work! that is all! thank you very much!"
);
