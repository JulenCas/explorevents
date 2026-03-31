import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';

export default function EventCard({ event }) {
  const { favorites, toggleFavorite } = useEvents();
  const isFav = favorites.includes(event.id);

  return (
    <article className="event-card">
      <img src={event.images[0]} alt={event.title} />
      <div>
        <p className="category">{event.category}</p>
        <h3>{event.title}</h3>
        <p>{new Date(event.dateTime).toLocaleString('es-ES')}</p>
        <p>{event.venue.name}</p>
        <div className="actions">
          <Link to={`/evento/${event.id}`}>Ver detalle</Link>
          <button onClick={() => toggleFavorite(event.id)}>{isFav ? '★ Guardado' : '☆ Favorito'}</button>
        </div>
      </div>
    </article>
  );
}
