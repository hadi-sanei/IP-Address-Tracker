"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    const search = document.querySelector('#search');
    const ip_address = document.querySelector('#IPAddress');
    const location = document.querySelector('#location');
    const timezone = document.querySelector('#timezone');
    const isp = document.querySelector('#ISP');
    const map = L.map('map', {
        zoom: 14,
        zoomControl: false,
        maxZoom: 19,
        doubleClickZoom: false,
        attributionControl: false
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    let theMarker;
    function addMarkerToMap(event) {
        if (theMarker != undefined) {
            map.removeLayer(theMarker);
        }
        const myIcon = L.icon({
            iconUrl: '../../assets/images/icon-location.svg',
            iconSize: [30, 40],
            iconAnchor: [15, 39],
        });
        theMarker = L.marker((event === null || event === void 0 ? void 0 : event.latlng) || [event.lat, event.lon], { icon: myIcon }).addTo(map);
        map.setView((event === null || event === void 0 ? void 0 : event.latlng) || [event.lat, event.lon], 14);
    }
    map.addEventListener("click", (e) => {
        addMarkerToMap(e);
    });
    function loadIpAddress(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`http://ip-api.com/json/${search || ''}`);
            if (response.status === 200) {
                const data = yield response.json();
                if (data.status !== 'success') {
                    throw new Error(data.message);
                }
                return data;
            }
            throw new Error('not found...');
        });
    }
    loadIpAddress().then(data => {
        addMarkerToMap(data);
        updateElements(data);
    }).catch(e => {
        alert(e.message);
    });
    function updateElements(data) {
        ip_address.innerHTML = data.query;
        location.innerHTML = `${data.city}, ${data.country}`;
        timezone.innerHTML = data.timezone;
        isp.innerHTML = data.isp;
    }
    function searchIpAddressOrDomain(search) {
        loadIpAddress(search).then(data => {
            addMarkerToMap(data);
            updateElements(data);
        }).catch(e => {
            alert(e.message);
        });
    }
    search.addEventListener('submit', (e) => {
        e.preventDefault();
        const search_input = document.querySelector('#search_input');
        searchIpAddressOrDomain(search_input.value);
    });
})();
