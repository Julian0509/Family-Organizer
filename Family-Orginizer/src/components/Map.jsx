import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/styling.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { nanoid } from "nanoid";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({ positions, events }) {
  let convertedPositions = [];
  events.map((event) => {
    const eventCoords = positions[event._id];
    if (eventCoords != undefined) {
      let lat = eventCoords.lat;
      let long = eventCoords.lng;
      let convert = [lat, long, event.event];
      convertedPositions.push(convert);
    }
  });
  let start = [];
  if (convertedPositions.length == 0) {
    start = [55.86722, -4.25016];
  } else {
    start = [convertedPositions[0][0], convertedPositions[0][1]];
  }
  return (
    <div>
      <div className="w-[1100px] mt-5 h-[500px] overflow-hidden shadow-3xl border border-[#a0a096] rounded-3xl ">
        <MapContainer
          center={start}
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
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {convertedPositions.map((position) => (
            <Marker key={nanoid()} position={[position[0], position[1]]}>
              <Popup>
                <div>
                  <h2>{position[2]}</h2>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
