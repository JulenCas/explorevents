import { useState } from 'react';
import EventCard from '../components/EventCard';
import EventsMap from '../components/EventsMap';
import FiltersBar from '../components/FiltersBar';
import { useEvents } from '../context/EventsContext';

export default function HomePage() {
  const { filteredEvents, loading, error, userLocation, locationError } = useEvents();
  const [showMapMobile, setShowMapMobile] = useState(false);

  return (
    <section>
      <FiltersBar />
      <div className="results-row">
        <h2>{filteredEvents.length} resultados</h2>
        <button className="mobile-toggle" onClick={() => setShowMapMobile((s) => !s)}>
          {showMapMobile ? 'Ver lista' : 'Ver mapa'}
        </button>
      </div>
      {locationError && <p className="notice">{locationError}</p>}
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Cargando eventos...</p>
      ) : (
        <div className={`split ${showMapMobile ? 'map-only' : ''}`}>
          <div className="list-panel">
            {filteredEvents.length === 0 ? (
              <p>No hay resultados con los filtros actuales.</p>
            ) : (
              filteredEvents.map((event) => <EventCard event={event} key={event.id} />)
            )}
          </div>
          <div className="map-panel">
            <EventsMap events={filteredEvents} center={userLocation} />
          </div>
        </div>
      )}
    </section>
  );
}
