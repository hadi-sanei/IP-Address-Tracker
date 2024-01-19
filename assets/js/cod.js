"use strict";
(function () {
    const map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13,
        zoomControl: false,
        maxZoom: 19,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
})();
