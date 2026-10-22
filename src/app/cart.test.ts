import { describe, expect, it } from 'vitest';
import { cartTotals } from './cart';
describe('totales del carrito en centavos', () => {
  it('no cobra impuestos en un carrito vacío', () => {
    expect(cartTotals({})).toEqual({ count: 0, subtotal: 0, discount: 0, taxes: 0, total: 0 });
  });
  it('calcula cantidades y no incluye productos desconocidos', () => {
    expect(cartTotals({ minero: 2, inti: 1, unknown: 20 })).toEqual({
      count: 3,
      subtotal: 3497,
      discount: 0,
      taxes: 200,
      total: 3697,
    });
  });
  it('redondea el descuento y mantiene el total en centavos enteros', () => {
    expect(cartTotals({ minero: 1, cresta: 1 }, 'altura10')).toEqual({
      count: 2,
      subtotal: 2198,
      discount: 220,
      taxes: 200,
      total: 2178,
    });
  });
  it('un cupón inválido no modifica el precio', () => {
    expect(cartTotals({ minero: 1 }, 'inventado').total).toBe(1299);
  });
});
