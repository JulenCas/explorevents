import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { useEvents } from '../context/EventsContext';

export default function FavoritesPage() {
  const { favoriteEvents } = useEvents();

  return (
    <section>
      <h1>Favoritos</h1>
      {favoriteEvents.length === 0 ? (
        <p>
          Aún no has guardado eventos. <Link to="/">Explorar eventos</Link>
        </p>
      ) : (
        <div className="fav-grid">
          {favoriteEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
