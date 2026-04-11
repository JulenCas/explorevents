import { useState } from 'react';
import { useEvents } from '../context/EventsContext';

const categories = ['todas', 'música', 'deporte', 'cultura', 'familia'];

export default function FiltersBar() {
  const { filters, setFilters } = useEvents();
  const [open, setOpen] = useState(true);

  const update = (field, value) => setFilters((prev) => ({ ...prev, [field]: value }));

  return (
    <section className="filters-wrap">
      <button className="toggle-filters" onClick={() => setOpen((s) => !s)}>
        {open ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>
      {open && (
        <div className="filters-grid">
          <input
            type="search"
            placeholder="Buscar conciertos, talleres..."
            value={filters.query}
            onChange={(e) => update('query', e.target.value)}
          />
          <select value={filters.category} onChange={(e) => update('category', e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input type="date" value={filters.dateFrom} onChange={(e) => update('dateFrom', e.target.value)} />
          <input type="date" value={filters.dateTo} onChange={(e) => update('dateTo', e.target.value)} />
          <label>
            Radio (km):
            <input
              type="range"
              min="1"
              max="50"
              value={filters.radiusKm}
              onChange={(e) => update('radiusKm', Number(e.target.value))}
            />
            <span>{filters.radiusKm} km</span>
          </label>
        </div>
      )}
      <div className="chips">
        {filters.query && <button onClick={() => update('query', '')}>Búsqueda: {filters.query} ✕</button>}
        {filters.category !== 'todas' && (
          <button onClick={() => update('category', 'todas')}>Categoría: {filters.category} ✕</button>
        )}
        {filters.dateFrom && <button onClick={() => update('dateFrom', '')}>Desde: {filters.dateFrom} ✕</button>}
        {filters.dateTo && <button onClick={() => update('dateTo', '')}>Hasta: {filters.dateTo} ✕</button>}
      </div>
    </section>
  );
}
