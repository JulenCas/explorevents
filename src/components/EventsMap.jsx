import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

function Recenter({ center }) {
  const map = useMap();
  map.setView([center.lat, center.lng], map.getZoom(), { animate: true });
  return null;
}

export default function EventsMap({ events, center }) {
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} className="map-box">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter center={center} />
      {events.map((event) => (
        <Marker key={event.id} position={[event.venue.lat, event.venue.lng]}>
          <Popup>
            <strong>{event.title}</strong>
            <br />
            {new Date(event.dateTime).toLocaleDateString('es-ES')}
            <br />
            <Link to={`/evento/${event.id}`}>Ir al detalle</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
