import { products } from '../data/catalog';
export type Cart = Record<string, number>;
export function cartTotals(cart: Cart, coupon = '') {
  const count = products.reduce((sum, p) => sum + (cart[p.id] ?? 0), 0);
  const subtotal = products.reduce((sum, p) => sum + p.price * (cart[p.id] ?? 0), 0);
  const discount = coupon.toUpperCase() === 'ALTURA10' ? Math.round(subtotal * 0.1) : 0;
  const taxes = count ? 200 : 0;
  return { count, subtotal, discount, taxes, total: subtotal - discount + taxes };
}
// Moneda provisional de la demo. Confirmar antes de conectar un catálogo real.
export const money = (cents: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(cents / 100);
