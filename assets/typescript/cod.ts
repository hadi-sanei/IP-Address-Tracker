(function () {
    const ip_address=document.querySelector('#IPAddress')!;
    const location=document.querySelector('#location')!;
    const timezone=document.querySelector('#timezone')!;
    const isp=document.querySelector('#ISP')!;
    const map: L.Map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13,
        zoomControl: false,
        maxZoom: 19,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    let theMarker: L.Marker;
    function addMarkerToMap(event:any) {
        if (theMarker != undefined) {
            map.removeLayer(theMarker);
        }
        const myIcon = L.icon({
            iconUrl: '../../assets/images/icon-location.svg',
            iconSize: [30, 40],
            iconAnchor: [15, 39],
        });
        theMarker = L.marker(event?.latlng || [event.lat,event.lon], { icon: myIcon }).addTo(map);
        map.setView(event?.latlng || [event.lat,event.lon],13);
    }

    map.addEventListener("click", (e:Object) => {
        addMarkerToMap(e);
    });

    async function loadIpAddress(){
        let data=await fetch('http://ip-api.com/json');
        data=await data.json();
        return data;
    }
    
    loadIpAddress().then(data=>{
        addMarkerToMap(data);
        updateElements(data);
    });

    function updateElements(data:any){
        ip_address.innerHTML= data.query;
        location.innerHTML= `${data.city}, ${data.country}`;
        timezone.innerHTML= data.timezone;
        isp.innerHTML= data.isp;
    }
})();