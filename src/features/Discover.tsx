import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Coffee,
  Leaf,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { experiences, products } from '../data/catalog';
import { Modal, PageIntro, ProductCard, Tabs } from '../components/ui';
import { money } from '../app/cart';
import { useStore } from '../app/store';
export function Experiences() {
  const { reservations, reserve, notify } = useStore();
  const [selected, setSelected] = useState('');
  const [date, setDate] = useState('');
  return (
    <>
      <PageIntro eyebrow="MÁS ALLÁ DE LA TAZA" title="Viví el café de otra manera.">
        Aprender algo nuevo. Conectar con otros. Volver con una buena historia.
      </PageIntro>
      <section className="experience-hero">
        <img src="/images/experience.svg" alt="Utensilios de un taller de café" />
        <div>
          <span className="eyebrow">UN BUEN PLAN EMPIEZA ACÁ</span>
          <h2>
            Menos rutina.
            <br />
            <em>Más descubrimientos.</em>
          </h2>
          <p>Experiencias para los que disfrutan cada parte del ritual.</p>
        </div>
      </section>
      <div className="experience-grid">
        {experiences.map((item, i) => (
          <article className="experience-card" key={item.id}>
            <div className={`experience-image exp-${i}`}>
              <img src={item.image} alt={`Ilustración para ${item.name}`} />
              <span>{item.tag}</span>
            </div>
            <div className="experience-body">
              <div className="meta">
                <span>
                  <Clock size={13} />
                  {item.duration}
                </span>
                <span>
                  <MapPin size={13} />
                  Presencial · Demo
                </span>
              </div>
              <h2>{item.name}</h2>
              <p>{item.detail}</p>
              <div className="experience-price">
                <b>
                  {money(item.price)} <small>/ persona · demo</small>
                </b>
                <button
                  className="icon-button"
                  aria-label={`Reservar ${item.name}`}
                  onClick={() => {
                    setSelected(item.id);
                    setDate('');
                  }}
                >
                  {reservations.some((r) => r.id === item.id) ? (
                    <Check size={20} />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="advice-banner">
        <div>
          <span className="eyebrow">NO HACE FALTA SABER DE CAFÉ</span>
          <h2>Solo traer curiosidad.</h2>
          <p>Nosotros nos encargamos del resto.</p>
        </div>
        <Link to="/asesoria" className="button outline">
          Tengo una pregunta <ArrowRight size={17} />
        </Link>
      </div>
      {selected && (
        <Modal titleId="reservation-title" onDismiss={() => setSelected('')}>
          <button
            className="modal-close icon-button"
            onClick={() => setSelected('')}
            aria-label="Cerrar reserva"
          >
            ×
          </button>
          <CalendarDays size={30} />
          <h2 id="reservation-title">{experiences.find((e) => e.id === selected)?.name}</h2>
          <p>Elegí una fecha para simular tu reserva. No se enviará a ningún establecimiento.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              reserve(selected, date);
              setSelected('');
              notify(
                'Reserva de demostración confirmada. ¡Guardamos tu elección durante esta sesión!',
              );
            }}
          >
            <label>
              Fecha
              <input
                autoFocus
                type="date"
                required
                min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .slice(0, 10)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <button className="button full">
              Confirmar reserva demo <ArrowRight size={17} />
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Dashboard() {
  const [tab, setTab] = useState('Resumen');
  const { favorites, reservations } = useStore();
  return (
    <>
      <PageIntro eyebrow="TU RITUAL, EN UN SOLO LUGAR" title="Hola, amante del café.">
        Cada taza cuenta una parte de tu historia.
      </PageIntro>
      <Tabs items={['Resumen', 'Favoritos', 'Reservas']} value={tab} onChange={setTab} />
      {tab === 'Resumen' ? (
        <>
          <div className="stats-grid">
            <article className="stat">
              <Coffee size={20} />
              <span>Café comprado</span>
              <strong>12 bolsas</strong>
              <small>+3 bolsas este mes</small>
            </article>
            <article className="stat">
              <Leaf size={20} />
              <span>Origen favorito</span>
              <strong>Brasil</strong>
              <small>5 descubrimientos recientes</small>
            </article>
            <article className="stat">
              <Sparkles size={20} />
              <span>Tus puntos</span>
              <strong>
                1.240 <small>pts</small>
              </strong>
              <small>Tu próximo café a 260 puntos</small>
            </article>
          </div>
          <section className="panel chart-panel">
            <div className="section-heading">
              <div>
                <span className="eyebrow">DE TAZA EN TAZA</span>
                <h2>Tu consumo mensual</h2>
              </div>
              <span className="chart-legend">
                <i />
                Bolsas de café · Datos de muestra
              </span>
            </div>
            <svg
              className="chart"
              viewBox="0 0 900 260"
              role="img"
              aria-label="Consumo de muestra de enero a agosto: 0, 1, 3, 4, 6, 8, 7 y 12 bolsas"
            >
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4676ed" stopOpacity=".2" />
                  <stop offset="100%" stopColor="#4676ed" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[30, 90, 150, 210].map((y, i) => (
                <g key={y}>
                  <line x1="40" x2="875" y1={y} y2={y} stroke="#eeece7" />
                  <text x="0" y={y + 4} fill="#7e807b" fontSize="12">
                    {12 - i * 4}
                  </text>
                </g>
              ))}
              <path
                d="M45 210 L160 195 L275 165 L390 150 L505 120 L620 90 L735 105 L860 30 L860 210 L45 210"
                fill="url(#chart-fill)"
              />
              <path
                d="M45 210 L160 195 L275 165 L390 150 L505 120 L620 90 L735 105 L860 30"
                fill="none"
                stroke="#4676ed"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="860" cy="30" r="6" fill="#4676ed" />
              {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'].map((m, i) => (
                <text
                  key={m}
                  x={45 + i * 116}
                  y="245"
                  textAnchor="middle"
                  fill="#7e807b"
                  fontSize="12"
                >
                  {m}
                </text>
              ))}
            </svg>
          </section>
          <section className="section">
            <div className="section-heading">
              <h2>Elegidos para tu próximo ritual.</h2>
              <Link to="/" className="text-link">
                Ver todos <ArrowRight size={16} />
              </Link>
            </div>
            <div className="product-grid">
              {products.slice(0, 2).map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
            </div>
          </section>
        </>
      ) : tab === 'Favoritos' ? (
        <section className="section">
          {favorites.length ? (
            <div className="product-grid">
              {products
                .filter((p) => favorites.includes(p.id))
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Tu colección empieza con un favorito.</h2>
              <p>Tocá el corazón de un café para guardarlo acá.</p>
              <Link className="button" to="/">
                Descubrir cafés
              </Link>
            </div>
          )}
        </section>
      ) : (
        <section className="section">
          {reservations.length ? (
            reservations.map((r) => (
              <div className="panel" key={r.id}>
                <h2>{experiences.find((e) => e.id === r.id)?.name}</h2>
                <p>
                  {new Date(`${r.date}T12:00:00`).toLocaleDateString('es-AR', {
                    dateStyle: 'long',
                  })}{' '}
                  · Reserva simulada, sin cargo. Se conserva durante esta sesión.
                </p>
              </div>
            ))
          ) : (
            <div className="empty">
              <CalendarDays size={32} />
              <h2>Tu próxima experiencia te espera.</h2>
              <Link className="button" to="/experiencias">
                Explorar experiencias
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  );
}
