# Explorador de eventos locales

Prototipo en React para descubrir eventos locales con mapa, filtros avanzados y favoritos persistentes.

## Requisitos

- Node.js 18+

## Ejecución

```bash
npm install
npm run dev
```

## Build producción

```bash
npm run build
npm run preview
```

## Fuente de datos

Actualmente se usa `src/data/events.json` (modo simulado offline).

### Cambiar a API externa (Ticketmaster, etc.)

1. Obtener una API key de pruebas (p. ej. Ticketmaster Developer Portal).
2. Crear archivo `.env` con la variable adecuada (por ejemplo `VITE_TICKETMASTER_KEY=...`).
3. Sustituir la implementación de `fetchEvents` en `src/utils/api.js` para consultar la API real y mapear los campos al formato interno.

Formato interno esperado:
- `id`, `title`, `description`, `dateTime`
- `venue.name`, `venue.address`, `venue.lat`, `venue.lng`
- `category`, `images[]`, `ticketUrl`

## Funcionalidades incluidas

- Listado con búsqueda y filtros de fecha, categoría y radio en km.
- Geolocalización del navegador con fallback al centro de Zaragoza.
- Mapa interactivo con marcadores de eventos y enlace al detalle.
- Vista detalle con carrusel básico y enlace de compra.
- Gestión de favoritos en `localStorage`.
- Routing con React Router (`/`, `/evento/:eventId`, `/favoritos`).
