import { ArrowLeft, ArrowRight, Heart, Plus } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/catalog';
import { money } from '../app/cart';
import { useStore } from '../app/store';
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
export function Carousel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="carousel-controls">
          <button
            className="icon-button"
            aria-label={`Anterior en ${title}`}
            onClick={() =>
              ref.current?.scrollBy({
                left: -320,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              })
            }
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="icon-button"
            aria-label={`Siguiente en ${title}`}
            onClick={() =>
              ref.current?.scrollBy({
                left: 320,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'instant'
                  : 'smooth',
              })
            }
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div className="carousel" ref={ref} tabIndex={0} role="region" aria-label={title}>
        {children}
      </div>
    </section>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  const { changeQuantity, notify, toggleFavorite, favorites } = useStore();
  return (
    <article className="product-card">
      <div className="product-image" style={{ backgroundColor: p.color }}>
        <img src={p.image} alt={`Café de ${p.origin}`} loading="lazy" />
        <span className="product-stamp">
          ALTURA
          <br />
          <b>1200</b>
          <small>CAFÉ DE ORIGEN</small>
        </span>
        <button
          className={`favorite ${favorites.includes(p.id) ? 'selected' : ''}`}
          aria-label={`${favorites.includes(p.id) ? 'Quitar de' : 'Añadir a'} favoritos ${p.name}`}
          aria-pressed={favorites.includes(p.id)}
          onClick={() => toggleFavorite(p.id)}
        >
          <Heart size={18} />
        </button>
        <span className="image-tag">
          {p.roast === 'Claro' ? 'Suave & aromático' : 'Dulce & equilibrado'}
        </span>
      </div>
      <div className="product-info">
        <span className="muted tiny">
          {p.origin} <span aria-hidden="true">·</span> 250 g
        </span>
        <h3>{p.name}</h3>
        <p>{p.notes}</p>
        <div className="product-bottom">
          <strong>{money(p.price)}</strong>
          <button
            className="add-button"
            aria-label={`Añadir ${p.name} al carrito`}
            onClick={() => {
              changeQuantity(p.id, 1);
              notify(`${p.name} añadido al carrito`);
            }}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
export function Tabs({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="tabs" aria-label="Filtrar vista">
      {items.map((item) => (
        <button
          key={item}
          className={value === item ? 'active' : ''}
          aria-pressed={value === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function Modal({
  children,
  titleId,
  onDismiss,
}: {
  children: ReactNode;
  titleId: string;
  onDismiss: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onDismiss();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onDismiss();
        }
      }}
    >
      {children}
    </dialog>
  );
}
