import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Apple,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Coffee,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../app/store';
export function Advice() {
  const [messages, setMessages] = useState([
    { from: 'advisor', text: '¡Hola! Un buen café empieza por conocerte. ¿Qué sabores te gustan?' },
  ]);
  const [draft, setDraft] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({
      block: 'nearest',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }, [messages]);
  function send(text: string) {
    if (!text.trim()) return;
    const lower = text.toLowerCase();
    const reply = /frut|cítric|citr|v60/.test(lower)
      ? 'Te recomiendo Cresta Andina, de Colombia: notas de naranja y frutos rojos, con tostado claro. Probalo en V60 para disfrutar su perfil.'
      : /chocol|suave|italiana/.test(lower)
        ? 'El minero, de Brasil, es para vos: chocolate, avellanas y un cuerpo suave. Para cafetera italiana, probá una molienda media-fina.'
        : 'Para empezar, probá El minero si te gusta el chocolate, o Cresta Andina si preferís un perfil frutal. ¿Cómo lo preparás en casa?';
    setMessages((m) => [
      ...m,
      { from: 'you', text: text.trim() },
      { from: 'advisor', text: reply },
    ]);
    setDraft('');
  }
  return (
    <div className="advice-layout">
      <aside className="advice-intro">
        <span className="eyebrow">UNA CHARLA, UN BUEN CAFÉ</span>
        <h1>
          Tu próximo favorito
          <br />
          empieza con
          <br />
          <em>un hola.</em>
        </h1>
        <p>
          No hay un café perfecto para todos.
          <br />
          Hay uno perfecto para tu momento.
        </p>
        <img src="/images/hero.svg" alt="Taza de café ilustrada" />
        <span className="tiny muted">Asesoría simulada · Respuestas locales predefinidas</span>
      </aside>
      <section className="chat">
        <div className="chat-header">
          <span className="avatar">
            <Coffee size={22} />
          </span>
          <div>
            <h2>Asesoría Altura 1200</h2>
            <span>
              <i />
              Tu guía de café · Demo
            </span>
          </div>
          <ShieldCheck size={22} />
        </div>
        <div
          className="chat-messages"
          role="log"
          aria-label="Conversación de asesoría"
          aria-live="polite"
        >
          <div className="chat-date">UN CAFÉ Y UNA BUENA CHARLA</div>
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.from === 'you' ? 'outgoing' : 'incoming'}`}>
              {m.text}
            </div>
          ))}
          <div ref={end} />
        </div>
        <div className="chat-bottom">
          {messages.length === 1 && (
            <div className="suggestions">
              {['Me gusta el chocolate', 'Prefiero un café frutal'].map((t) => (
                <button key={t} onClick={() => send(t)}>
                  {t} <ArrowUpRight size={10} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <input
              aria-label="Mensaje para asesoría"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Contanos cómo te gusta el café…"
              maxLength={1000}
            />
            <button aria-label="Enviar mensaje" disabled={!draft.trim()}>
              <Send size={19} />
            </button>
          </form>
          <Link to="/" className="chat-shop">
            Explorar los cafés recomendados <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  );
}
export function Register() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const { notify } = useStore();
  return (
    <div className="register-layout">
      <div className="register-art">
        <span className="eyebrow">BIENVENIDO A TU NUEVO RITUAL</span>
        <h1>
          Las buenas cosas
          <br />
          se disfrutan
          <br />
          <em>en compañía.</em>
        </h1>
        <img src="/images/hero.svg" alt="Una taza de café esperando tu próximo ritual" />
        <p>Un origen. Mil historias. La tuya empieza acá.</p>
      </div>
      <section className="register-form">
        {done ? (
          <div className="register-success">
            <CheckCircle2 size={42} />
            <span className="eyebrow">YA ESTÁS UN PASO MÁS CERCA</span>
            <h2>Un gusto conocerte.</h2>
            <p>
              Simulamos el registro de <b>{email}</b>. No creamos una cuenta ni enviamos correos.
            </p>
            <Link className="button full" to="/resumen">
              Conocer mi espacio <ArrowRight size={17} />
            </Link>
            <button className="text-link" onClick={() => setDone(false)}>
              Usar otro correo
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">TU RINCÓN DE CAFÉ</span>
            <h2>Empecemos por un hola.</h2>
            <p>Guardá tus favoritos, descubrí experiencias y encontrá tu comunidad.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <label>
                Tu correo electrónico
                <input
                  type="email"
                  required
                  placeholder="nombre@correo.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                />
              </label>
              <button className="button full">
                Crear cuenta demo <ArrowRight size={17} />
              </button>
            </form>
            <div className="divider">
              <span>o continuá con</span>
            </div>
            <button
              className="provider-button"
              onClick={() =>
                notify(
                  'Google no está conectado. Esta demo permite simular el registro con correo.',
                )
              }
            >
              <span className="google-letter" aria-hidden="true">
                G
              </span>
              Google
            </button>
            <button
              className="provider-button"
              onClick={() =>
                notify('Apple no está conectado. Esta demo permite simular el registro con correo.')
              }
            >
              <Apple size={18} fill="currentColor" aria-hidden="true" />
              Apple
            </button>
            <p className="legal">
              Modo demostración. No se crea una cuenta real ni se almacenan tus datos al cerrar la
              sesión.
            </p>
            <Link to="/" className="text-link">
              Prefiero explorar primero <ArrowRight size={14} />
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
