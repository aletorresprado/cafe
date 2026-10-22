import { useEffect, useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Bell,
  Coffee,
  Home,
  Menu,
  MessageCircle,
  ShoppingBag,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { useStore } from './store';
import { cartTotals } from './cart';
const links = [
  { to: '/', label: 'Descubrir', icon: Home },
  { to: '/experiencias', label: 'Experiencias', icon: Coffee },
  { to: '/comunidad', label: 'Comunidad', icon: Users },
  { to: '/actividad', label: 'Actividad', icon: Bell },
  { to: '/resumen', label: 'Mi café', icon: UserRound },
];
export function Layout() {
  const [menu, setMenu] = useState(false);
  const { cart } = useStore();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <div className="announcement">
        El buen café tiene una historia. Encontrá la tuya.{' '}
        <span>
          Envío gratis en todos tus pedidos <ArrowUpRight size={12} />
        </span>
      </div>
      <header className="header">
        <div className="header-inner">
          <button
            className="icon-button mobile-menu"
            aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <Link to="/" className="brand" aria-label="Altura 1200, inicio">
            <span className="brand-mark">
              <Coffee size={23} />
            </span>
            <span>
              altura <b>1200</b>
              <small>CAFÉ CON ORIGEN</small>
            </span>
          </Link>
          <nav className={`desktop-nav ${menu ? 'is-open' : ''}`} aria-label="Navegación principal">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end>
                {l.label}
              </NavLink>
            ))}
            <Link className="mobile-advice" to="/asesoria">
              Asesoría
            </Link>
          </nav>
          <div className="header-actions shrink-0">
            <Link className="advice-link" to="/asesoria">
              <MessageCircle size={17} /> Hablemos de café
            </Link>
            <Link
              className="icon-button cart-link"
              to="/pedido"
              aria-label={`Carrito, ${cartTotals(cart).count} productos`}
            >
              <ShoppingBag size={21} />
              {cartTotals(cart).count > 0 && (
                <span className="badge">{cartTotals(cart).count}</span>
              )}
            </Link>
            <Link className="icon-button account-link" to="/registro" aria-label="Crear cuenta">
              <UserRound size={21} />
            </Link>
          </div>
        </div>
      </header>
      <main id="main" className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <Link to="/" className="footer-brand">
          altura 1200<span>Un origen. Mil maneras de disfrutarlo.</span>
        </Link>
        <p>Hecho para quienes hacen del café un ritual.</p>
        <span className="demo-label">Prototipo interactivo · Sin compras reales</span>
      </footer>
      <nav className="bottom-nav" aria-label="Navegación móvil">
        {links.map((l) => (
          <NavLink to={l.to} key={l.to} end>
            <l.icon size={21} />
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
