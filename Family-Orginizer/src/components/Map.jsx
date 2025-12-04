import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/styling.css";
import L from "leaflet";


import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map() {
  const position = [49.2401, 6.9969]; 
  const position2 = [55.867469, -4.251178];

  return (
    <div>
        <div className="w-[1100px] mt-5 h-[500px] overflow-hidden shadow-3xl border border-[#a0a096] rounded-3xl ">
            <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom="center"
            className="w-full h-full"
            zoomAnimation={true}
            markerZoomAnimation={true}
            inertia={true}
            wheelDebounceTime={5}
            zoomSnap={1}
            preferCanvas={true}
            >
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={position}>
                <Popup>
                    <b>Dein Standort</b>
                    <br />
                    Saarbrücken
                </Popup>
            </Marker>
            <Marker position={position2}>
            </Marker>
          </MapContainer>
        </div>
    </div>
  );
}

export default Map;
