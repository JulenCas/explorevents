import { Link, NavLink, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">ExploraEventos Aragón</Link>
        <nav>
          <NavLink to="/" end>Eventos</NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
