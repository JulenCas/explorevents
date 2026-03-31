import eventsData from '../data/events.json';

export async function fetchEvents({ signal }) {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, 450);
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  return eventsData;
}
