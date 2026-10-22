import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, ArrowUpRight, Send, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts, notifications } from '../data/social';
import { Modal, PageIntro, Tabs } from '../components/ui';
import { useStore } from '../app/store';
export function Community() {
  const [tab, setTab] = useState('Para vos');
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, string[]>>({});
  const [draft, setDraft] = useState('');
  const { notify } = useStore();
  const [feed, setFeed] = useState(posts);
  const [compose, setCompose] = useState(false);
  const [story, setStory] = useState('');
  const visible = feed.filter((p) =>
    tab === 'Siguiendo' ? p.following : tab === 'Guardados' ? saved.includes(p.id) : true,
  );
  return (
    <>
      <PageIntro eyebrow="DE UNA TAZA A OTRA" title="Las buenas historias se comparten.">
        Un rincón para quienes disfrutan el café y todo lo que pasa alrededor.
      </PageIntro>
      <div className="social-layout">
        <section>
          <Tabs items={['Para vos', 'Siguiendo', 'Guardados']} value={tab} onChange={setTab} />
          {visible.length ? (
            visible.map((p) => (
              <article className="post" key={p.id}>
                <div className="post-header">
                  <span className={`avatar avatar-${p.id}`}>{p.initials}</span>
                  <div>
                    <b>{p.name}</b>
                    <span> · Café de origen</span>
                    <small>{p.time}</small>
                  </div>
                  <button
                    className="icon-button"
                    aria-label={`Guardar publicación de ${p.name}`}
                    aria-pressed={saved.includes(p.id)}
                    onClick={() =>
                      setSaved((s) =>
                        s.includes(p.id) ? s.filter((id) => id !== p.id) : [...s, p.id],
                      )
                    }
                  >
                    <Bookmark size={19} fill={saved.includes(p.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                {p.image && (
                  <img
                    className="post-image"
                    src={p.image}
                    alt={`Ilustración del ritual de café de ${p.name}`}
                  />
                )}
                <p>{p.text}</p>
                <div className="post-actions">
                  <button
                    className={liked.includes(p.id) ? 'liked' : ''}
                    aria-label={`Me gusta publicación de ${p.name}`}
                    aria-pressed={liked.includes(p.id)}
                    onClick={() =>
                      setLiked((l) =>
                        l.includes(p.id) ? l.filter((id) => id !== p.id) : [...l, p.id],
                      )
                    }
                  >
                    <Heart size={19} fill={liked.includes(p.id) ? 'currentColor' : 'none'} />
                    {p.likes + (liked.includes(p.id) ? 1 : 0)} me gusta
                  </button>
                  <button
                    aria-expanded={open === p.id}
                    onClick={() => {
                      setOpen(open === p.id ? null : p.id);
                      setDraft('');
                    }}
                  >
                    <MessageCircle size={19} />
                    {p.comments.length + (comments[p.id]?.length ?? 0)} comentarios
                  </button>
                </div>
                {open === p.id && (
                  <div className="comments">
                    {[...p.comments, ...(comments[p.id] ?? [])].map((c, i) => (
                      <p key={i}>{c}</p>
                    ))}
                    <form
                      className="inline-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!draft.trim()) return;
                        setComments((c) => ({ ...c, [p.id]: [...(c[p.id] ?? []), draft.trim()] }));
                        setDraft('');
                      }}
                    >
                      <input
                        aria-label={`Comentar publicación de ${p.name}`}
                        placeholder="Sumate a la conversación…"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        maxLength={500}
                      />
                      <button aria-label="Enviar comentario" disabled={!draft.trim()}>
                        <Send size={17} />
                      </button>
                    </form>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="empty">
              <Bookmark />
              <h2>Tus historias favoritas, acá.</h2>
              <p>Guardá publicaciones para volver a ellas.</p>
            </div>
          )}
        </section>
        <aside className="community-aside">
          <span className="eyebrow">ESTE ES TU LUGAR</span>
          <h2>
            El café conecta.
            <br />
            <em>Vos ponés la historia.</em>
          </h2>
          <p>Compartí tus descubrimientos, tus dudas y ese café que te alegró el día.</p>
          <button className="button full" onClick={() => setCompose(true)}>
            <Plus size={17} /> Tu próxima historia
          </button>
          <Link to="/experiencias" className="aside-link">
            Conocernos en persona <ArrowUpRight size={18} />
          </Link>
          <div className="community-note">
            ✳
            <p>
              No hace falta ser experto.
              <br />
              Solo disfrutar el momento.
            </p>
          </div>
        </aside>
      </div>
      {compose && (
        <Modal titleId="compose-title" onDismiss={() => setCompose(false)}>
          <button
            className="modal-close icon-button"
            aria-label="Cerrar publicación"
            onClick={() => setCompose(false)}
          >
            ×
          </button>
          <h2 id="compose-title">Tu próxima historia.</h2>
          <p>
            Compartí tu ritual. Esta publicación solo vive en esta vista hasta que navegues o
            recargues.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!story.trim()) return;
              setFeed((f) => [
                {
                  id: Date.now(),
                  name: 'Vos',
                  initials: 'VO',
                  time: 'Ahora',
                  text: story.trim(),
                  likes: 0,
                  comments: [],
                  image: '',
                  following: true,
                },
                ...f,
              ]);
              setStory('');
              setTab('Para vos');
              setCompose(false);
              notify('Historia publicada en esta demo.');
            }}
          >
            <label>
              Tu historia
              <textarea
                autoFocus
                required
                maxLength={1500}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Todo empezó con un café…"
              />
            </label>
            <button className="button full" disabled={!story.trim()}>
              Publicar historia demo
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Activity() {
  const [tab, setTab] = useState('Todo');
  const [following, setFollowing] = useState(false);
  return (
    <div className="narrow">
      <PageIntro eyebrow="LO QUE PASA A TU ALREDEDOR" title="Actividad.">
        Las pequeñas conexiones hacen grande esta comunidad.
      </PageIntro>
      <Tabs
        items={['Todo', 'Me gusta', 'Comentarios', 'Guardados']}
        value={tab}
        onChange={setTab}
      />
      <section className="notification-list" aria-label="Notificaciones">
        <span className="eyebrow">ESTA SEMANA · DATOS DE MUESTRA</span>
        {notifications
          .filter((n) => tab === 'Todo' || n.kind === tab)
          .map((n, i) => (
            <article className="notification" key={`${n.name}-${n.text}`}>
              <span className={`avatar avatar-${(i % 3) + 1}`}>{n.initials}</span>
              <div>
                <b>{n.name}</b>
                <small> {n.time}</small>
                <p>{n.text}</p>
                {n.quote && <blockquote>{n.quote}</blockquote>}
              </div>
              {n.follow ? (
                <button
                  className={`button small ${following ? 'outline' : ''}`}
                  onClick={() => setFollowing(!following)}
                >
                  {following ? 'Siguiendo' : 'Seguir'}
                </button>
              ) : (
                <Link to="/comunidad" aria-label={`Ver publicación relacionada con ${n.name}`}>
                  <img src="/images/story-0.svg" alt="" />
                </Link>
              )}
            </article>
          ))}
      </section>
      <p className="end-note">Ya estás al día. Es hora de un café. ☕</p>
    </div>
  );
}
