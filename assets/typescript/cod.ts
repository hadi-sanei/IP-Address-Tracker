(function () {
    const map: L.Map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13,
        zoomControl: false,
        maxZoom: 19,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    let theMarker: L.Marker;
    function addMarkerToMap(event: L.LeafletMouseEvent) {
        if (theMarker != undefined) {
            map.removeLayer(theMarker);
        }
        const myIcon = L.icon({
            iconUrl: '../../assets/images/icon-location.svg',
            iconSize: [30, 40],
            iconAnchor: [15, 39],
        });
        theMarker = L.marker(event.latlng, { icon: myIcon }).addTo(map);
        map.setView(event.latlng,13);
    }

    map.addEventListener("click", (e) => {
        addMarkerToMap(e);
    });

})();