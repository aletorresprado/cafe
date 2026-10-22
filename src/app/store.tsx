import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Cart } from './cart';
interface State {
  cart: Cart;
  changeQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  notify: (message: string) => void;
  reservations: { id: string; date: string }[];
  reserve: (id: string, date: string) => void;
}
const Store = createContext<State | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reservations, setReservations] = useState<{ id: string; date: string }[]>([]);
  const [message, setMessage] = useState('');
  const notify = (text: string) => setMessage(text);
  return (
    <Store.Provider
      value={{
        cart,
        changeQuantity: (id, delta) =>
          setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) })),
        clearCart: () => setCart({}),
        favorites,
        toggleFavorite: (id) =>
          setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
        notify,
        reservations,
        reserve: (id, date) =>
          setReservations((r) => [...r.filter((item) => item.id !== id), { id, date }]),
      }}
    >
      {children}
      {message && (
        <div className="toast" role="status">
          <span>{message}</span>
          <button aria-label="Cerrar aviso" onClick={() => setMessage('')}>
            ×
          </button>
        </div>
      )}
    </Store.Provider>
  );
}
export function useStore() {
  const state = useContext(Store);
  if (!state) throw new Error('Falta StoreProvider');
  return state;
}
