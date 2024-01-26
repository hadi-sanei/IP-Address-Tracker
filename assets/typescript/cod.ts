(function () {
    const search = document.querySelector('#search')!;
    const ip_address = document.querySelector('#IPAddress')!;
    const location = document.querySelector('#location')!;
    const timezone = document.querySelector('#timezone')!;
    const continent = document.querySelector('#continent')!;
    const map: L.Map = L.map('map', {
        zoom: 14,
        zoomControl: false,
        maxZoom: 19,
        doubleClickZoom: false,
        attributionControl: false
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    let theMarker: L.Marker;
    function addMarkerToMap(event: any) {
        if (theMarker != undefined) {
            map.removeLayer(theMarker);
        }
        const myIcon = L.icon({
            iconUrl: './assets/images/icon-location.svg',
            iconSize: [30, 40],
            iconAnchor: [15, 39],
        });
        theMarker = L.marker(event?.latlng || [event.latitude, event.longitude], { icon: myIcon }).addTo(map);
        map.setView(event?.latlng || [event.latitude, event.longitude], 14);
    }

    map.addEventListener("click", (e: Object) => {
        addMarkerToMap(e);
    });

    async function loadIpAddress(search?: string) {
        let response: Response = await fetch(`https://freeipapi.com/api/json/${search || ''}`);
        if (response.status === 200) {
            const data: any = await response.json();
            if (!data.ipAddress) {
                throw new Error('not found IP address , please search the IP address, not the domain');
            }
            return data;
        }
        throw new Error('not found...');
    }

    loadIpAddress().then(data => {
        addMarkerToMap(data);
        updateElements(data);
    }).catch(e => {
        alert(e.message);
    });

    function updateElements(data: any) {
        ip_address.innerHTML = data.ipAddress;
        location.innerHTML = `${data.cityName}, ${data.countryName}`;
        timezone.innerHTML = data.timeZone;
        continent.innerHTML = data.continent;
    }

    function searchIpAddressOrDomain(search: string) {
        loadIpAddress(search).then(data => {
            addMarkerToMap(data);
            updateElements(data);
        }).catch(e => {
            alert(e.message);
        });
    }

    search.addEventListener('submit', (e) => {
        e.preventDefault();
        const search_input = document.querySelector('#search_input') as HTMLInputElement;
        searchIpAddressOrDomain(search_input.value);
    });
})();