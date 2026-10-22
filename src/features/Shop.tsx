import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Coffee,
  Leaf,
  Search,
  Truck,
} from 'lucide-react';
import { products, origins } from '../data/catalog';
import { Carousel, ProductCard } from '../components/ui';
export function Shop() {
  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState('Todos');
  const filtered = products.filter(
    (p) =>
      (origin === 'Todos' || p.origin === origin) &&
      `${p.name} ${p.origin} ${p.notes}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="little-line" /> DE LA TIERRA A TU TAZA
          </span>
          <h1>
            Hay un origen
            <br />
            en cada <em>sorbo.</em>
          </h1>
          <p>
            Cafés de especialidad, historias que conectan.
            <br className="desktop-break" /> Encontrá ese café que se siente como vos.
          </p>
          <a className="button cream" href="#cafes">
            Encontrá tu café <ArrowRight size={18} />
          </a>
          <div className="hero-footnote">
            <span className="tiny-dot" /> Seleccionado con calma. Tostado con intención.
          </div>
        </div>
        <div className="hero-art">
          <img
            src="/images/hero.svg"
            alt="Ilustración de una taza de café rodeada de granos y hojas"
          />
          <div className="origin-seal">
            DE ORIGEN
            <br />
            <b>100%</b>
            <br />
            CON HISTORIA
          </div>
          <span className="art-caption">BUENAS COSAS, A SU TIEMPO.</span>
        </div>
        <span className="hero-number">01 — 04</span>
      </section>
      <div className="trust-strip">
        <span>
          <Leaf size={17} /> Origen trazable
        </span>
        <span>
          <Coffee size={17} /> Tostado en pequeños lotes
        </span>
        <span>
          <Truck size={18} /> Envío gratis
        </span>
        <span>
          <Check size={17} /> Sin apuro, con propósito
        </span>
      </div>
      <section className="section origins-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">UN VIAJE SIN SALIR DE CASA</span>
            <h2>Cada origen, un mundo.</h2>
          </div>
          <a className="text-link" href="#cafes">
            Explorar cafés <ArrowDown size={15} />
          </a>
        </div>
        <div className="origin-grid">
          {origins.map((name, i) => (
            <button
              key={name}
              className={`origin-card origin-${i} ${origin === name ? 'is-selected' : ''}`}
              onClick={() => {
                setOrigin(origin === name ? 'Todos' : name);
                document.getElementById('cafes')?.scrollIntoView({
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
                });
              }}
            >
              <span className="origin-index">0{i + 1}</span>
              <img src={`/images/origin-${i}.svg`} alt="" />
              <div>
                <span className="origin-name">{name}</span>
                <span className="origin-description">
                  {
                    [
                      'Dulce por naturaleza',
                      'Una altura diferente',
                      'Carácter que sorprende',
                      'El secreto de los Andes',
                    ][i]
                  }
                </span>
              </div>
              <ArrowUpRightIcon />
            </button>
          ))}
        </div>
      </section>
      <section id="cafes" className="section catalog-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TU PRÓXIMO FAVORITO</span>
            <h2>Café para cada momento.</h2>
          </div>
          <span className="collection-note">Pequeños lotes. Grandes descubrimientos.</span>
        </div>
        <div className="catalog-toolbar">
          <div className="filter-pills">
            {['Todos', ...origins].map((o) => (
              <button
                key={o}
                className={o === origin ? 'active' : ''}
                aria-pressed={o === origin}
                onClick={() => setOrigin(o)}
              >
                {o === 'Todos' ? 'Todos los cafés' : o}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} />
            <input
              aria-label="Buscar café"
              placeholder="Buscá tu café…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <Coffee />
            <h3>No encontramos ese café.</h3>
            <p>Probá con otro origen o una nota de sabor.</p>
            <button
              className="button"
              onClick={() => {
                setQuery('');
                setOrigin('Todos');
              }}
            >
              Ver todos los cafés
            </button>
          </div>
        )}
      </section>
      <section className="experience-banner">
        <div>
          <span className="eyebrow">EL CAFÉ TAMBIÉN SE VIVE</span>
          <h2>
            Más que una taza.
            <br />
            <em>Una experiencia.</em>
          </h2>
          <p>Conocé, probá y compartí. Hay todo un mundo por descubrir.</p>
          <Link className="button" to="/experiencias">
            Descubrir experiencias <ArrowRight size={17} />
          </Link>
        </div>
        <img src="/images/experience.svg" alt="Ilustración de utensilios de preparación de café" />
        <span className="vertical-label">CONECTAR · APRENDER · DISFRUTAR</span>
      </section>
      <Carousel
        title="El ritual se comparte."
        subtitle="Historias de nuestra comunidad, de una taza a otra."
      >
        {[
          'Un café antes de que despierte la ciudad.',
          'Mi nueva forma de preparar las mañanas.',
          'Los mejores planes empiezan con café.',
        ].map((t, i) => (
          <Link to="/comunidad" className="story-card" key={t}>
            <img src={`/images/story-${i}.svg`} alt="Ilustración de un ritual de café" />
            <span className="eyebrow">DIARIO DE CAFÉ · 0{i + 1}</span>
            <h3>{t}</h3>
            <span className="text-link">
              Leer la historia <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </Carousel>
      <section className="advice-banner">
        <div>
          <span className="eyebrow">ENCONTRÁ TU MATCH</span>
          <h2>¿No sabés por dónde empezar?</h2>
          <p>Contanos cómo te gusta el café. Nosotros ponemos el resto.</p>
        </div>
        <Link className="button outline" to="/asesoria">
          Hablemos de café <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
function ArrowUpRightIcon() {
  return <ArrowUpRight className="origin-arrow" size={20} aria-hidden="true" />;
}
