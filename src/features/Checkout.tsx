import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { products } from '../data/catalog';
import { cartTotals, money } from '../app/cart';
import { useStore } from '../app/store';
import { PageIntro } from '../components/ui';
export function Checkout() {
  const { cart, changeQuantity, clearCart, notify } = useStore();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState('');
  const [complete, setComplete] = useState(false);
  const [delivery, setDelivery] = useState('standard');
  const location = useLocation();
  useEffect(() => setComplete(false), [location.key]);
  const totals = cartTotals(cart, applied);
  if (complete)
    return (
      <div className="empty success">
        <CheckCircle2 size={52} />
        <span className="eyebrow">RECORRIDO COMPLETADO</span>
        <h1>
          Tu próximo ritual
          <br />
          está en camino. Casi.
        </h1>
        <p>
          Esta fue una compra de demostración. No se realizó ningún cargo ni se enviará un pedido.
        </p>
        <Link className="button" to="/">
          Seguir descubriendo <ArrowRight size={18} />
        </Link>
      </div>
    );
  return (
    <>
      <PageIntro eyebrow="UN PASO MÁS CERCA" title="Tu pedido.">
        Un buen café merece llegar a buenas manos.
      </PageIntro>
      {!totals.count ? (
        <div className="empty">
          <ShoppingBag size={44} />
          <h2>Tu bolsa espera su primer café.</h2>
          <p>Descubrí los orígenes y encontrá tu favorito.</p>
          <Link to="/" className="button">
            Explorar cafés <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <form
          className="checkout-grid"
          onSubmit={(e) => {
            e.preventDefault();
            setComplete(true);
            clearCart();
          }}
        >
          <div>
            <section className="panel">
              <h2>
                <span className="step">01</span> Dirección de envío
              </h2>
              <label>
                Dirección
                <input
                  required
                  autoComplete="street-address"
                  placeholder="Calle y número"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  maxLength={150}
                />
              </label>
              <div className="field-pair">
                <label>
                  Ciudad
                  <input
                    required
                    autoComplete="address-level2"
                    placeholder="Tu ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
                <label>
                  Código postal
                  <input required autoComplete="postal-code" placeholder="Código postal" />
                </label>
              </div>
            </section>
            <section className="panel">
              <h2>
                <span className="step">02</span> Entrega
              </h2>
              <label className="radio-row">
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery === 'standard'}
                  onChange={() => setDelivery('standard')}
                />
                <Truck size={22} />
                <span>
                  Envío estándar<small>3–4 días hábiles · Simulado</small>
                </span>
                <b>Gratis</b>
              </label>
              <label className="radio-row">
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery === 'pickup'}
                  onChange={() => setDelivery('pickup')}
                />
                <ShoppingBag size={22} />
                <span>
                  Retiro en tienda<small>Elegí tu ritual sin esperar · Simulado</small>
                </span>
                <b>Gratis</b>
              </label>
            </section>
            <section className="panel">
              <h2>
                <span className="step">03</span> Pago de demostración
              </h2>
              <div className="payment-card">
                <span>VISA</span>
                <b>•••• 1234</b>
                <LockKeyhole size={18} />
              </div>
              <p className="muted tiny">Tarjeta ficticia. No ingreses datos bancarios reales.</p>
            </section>
            <Link to="/" className="text-link">
              <ArrowLeft size={17} /> Seguir explorando
            </Link>
          </div>
          <aside className="order-summary panel">
            <h2>
              En tu bolsa <span className="muted">({totals.count})</span>
            </h2>
            {products
              .filter((p) => cart[p.id] > 0)
              .map((p) => (
                <div className="order-item" key={p.id}>
                  <img src={p.image} alt="" />
                  <div>
                    <small className="muted">{p.origin}</small>
                    <h3>{p.name}</h3>
                    <small>250 g · Tostado {p.roast.toLowerCase()}</small>
                    <div className="quantity">
                      <button
                        type="button"
                        aria-label={`Quitar una unidad de ${p.name}`}
                        onClick={() => changeQuantity(p.id, -1)}
                      >
                        <Minus size={13} />
                      </button>
                      <span aria-label={`Cantidad ${p.name}`}>{cart[p.id]}</span>
                      <button
                        type="button"
                        aria-label={`Añadir una unidad de ${p.name}`}
                        onClick={() => changeQuantity(p.id, 1)}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <strong>{money(p.price * cart[p.id])}</strong>
                </div>
              ))}
            <div className="coupon">
              <label className="sr-only" htmlFor="coupon">
                Código de descuento
              </label>
              <input
                id="coupon"
                placeholder="Código de descuento"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (coupon.trim().toUpperCase() === 'ALTURA10') {
                    setApplied('ALTURA10');
                    notify('Descuento del 10% aplicado.');
                  } else {
                    notify('Código no válido. Probá ALTURA10.');
                  }
                }}
              >
                Aplicar
              </button>
            </div>
            <small className="muted">Un pequeño regalo: probá ALTURA10.</small>
            <dl className="totals">
              <div>
                <dt>Subtotal</dt>
                <dd>{money(totals.subtotal)}</dd>
              </div>
              <div>
                <dt>Envío</dt>
                <dd className="green">Gratis</dd>
              </div>
              {totals.discount > 0 && (
                <div>
                  <dt>Descuento</dt>
                  <dd>−{money(totals.discount)}</dd>
                </div>
              )}
              <div>
                <dt>Impuestos simulados</dt>
                <dd>{money(totals.taxes)}</dd>
              </div>
              <div className="total">
                <dt>Total</dt>
                <dd>{money(totals.total)}</dd>
              </div>
            </dl>
            <button className="button full" type="submit">
              Confirmar pedido demo <ArrowRight size={17} />
            </button>
            <p className="tiny muted centered">
              <LockKeyhole size={12} /> Sin cobros. Sin envío real.
            </p>
          </aside>
        </form>
      )}
    </>
  );
}
