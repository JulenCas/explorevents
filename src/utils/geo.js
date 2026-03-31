export const DEFAULT_CENTER = {
  lat: 41.6488,
  lng: -0.8891
};

const EARTH_RADIUS_KM = 6371;

export function haversineDistanceKm(a, b) {
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.asin(Math.sqrt(x));
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('La geolocalización no está disponible en este navegador.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => reject(new Error('No se pudo obtener tu ubicación. Se usa el centro por defecto.')),
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 120000 }
    );
  });
}
