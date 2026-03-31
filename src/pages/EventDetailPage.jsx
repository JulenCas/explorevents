import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEvents } from '../context/EventsContext';

export default function EventDetailPage() {
  const { eventId } = useParams();
  const { events, favorites, toggleFavorite } = useEvents();
  const event = events.find((e) => e.id === eventId);
  const [active, setActive] = useState(0);

  if (!event) {
    return (
      <div>
        <p>Evento no encontrado.</p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  const isFav = favorites.includes(event.id);

  return (
    <article className="detail">
      <div className="carousel">
        <img src={event.images[active]} alt={event.title} className="hero" />
        <div className="thumbs">
          {event.images.map((img, idx) => (
            <button key={img} onClick={() => setActive(idx)} className={idx === active ? 'active' : ''}>
              <img src={img} alt={`Imagen ${idx + 1}`} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="category">{event.category}</p>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p><strong>Fecha:</strong> {new Date(event.dateTime).toLocaleString('es-ES')}</p>
        <p><strong>Lugar:</strong> {event.venue.name} · {event.venue.address}</p>
        <div className="actions">
          <button onClick={() => toggleFavorite(event.id)}>{isFav ? '★ En favoritos' : '☆ Guardar favorito'}</button>
          {event.ticketUrl && (
            <a href={event.ticketUrl} target="_blank" rel="noreferrer">Comprar entradas</a>
          )}
          <Link to="/">Volver al listado</Link>
        </div>
      </div>
    </article>
  );
}
