import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchEvents } from '../utils/api';
import { DEFAULT_CENTER, getCurrentPosition, haversineDistanceKm } from '../utils/geo';

const EventsContext = createContext(null);
const FAVORITES_KEY = 'explorevents-favorites';

const initialFilters = {
  query: '',
  category: 'todas',
  dateFrom: '',
  dateTo: '',
  radiusKm: 10
};

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [userLocation, setUserLocation] = useState(DEFAULT_CENTER);
  const [locationError, setLocationError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    let mounted = true;
    getCurrentPosition()
      .then((coords) => {
        if (mounted) {
          setUserLocation(coords);
          setLocationError('');
        }
      })
      .catch((err) => {
        if (mounted) setLocationError(err.message);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchEvents({ signal: controller.signal });
        setEvents(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('No se pudieron cargar los eventos. Inténtalo de nuevo más tarde.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
    return () => controller.abort();
  }, [filters]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const q = filters.query.trim().toLowerCase();
      const searchableText = `${event.title} ${event.description} ${event.venue.address}`.toLowerCase();
      const matchesQuery = q ? searchableText.includes(q) : true;
      const matchesCategory = filters.category === 'todas' ? true : event.category === filters.category;

      const eventDate = new Date(event.dateTime);
      const from = filters.dateFrom ? new Date(`${filters.dateFrom}T00:00:00`) : null;
      const to = filters.dateTo ? new Date(`${filters.dateTo}T23:59:59`) : null;
      const matchesFrom = from ? eventDate >= from : true;
      const matchesTo = to ? eventDate <= to : true;

      const distance = haversineDistanceKm(userLocation, {
        lat: event.venue.lat,
        lng: event.venue.lng
      });
      const matchesRadius = distance <= Number(filters.radiusKm || 50);

      return matchesQuery && matchesCategory && matchesFrom && matchesTo && matchesRadius;
    });
  }, [events, filters, userLocation]);

  const favoriteEvents = useMemo(
    () => events.filter((event) => favorites.includes(event.id)),
    [events, favorites]
  );

  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        filteredEvents,
        favoriteEvents,
        loading,
        error,
        filters,
        setFilters,
        favorites,
        toggleFavorite,
        userLocation,
        locationError
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents debe usarse dentro de EventsProvider');
  }
  return context;
}
