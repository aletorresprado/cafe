import { test, expect } from '@playwright/test';
test('tienda, búsqueda, favoritos y compra simulada', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Hay un origen/ })).toBeVisible();
  await page.getByRole('textbox', { name: 'Buscar café' }).fill('inexistente');
  await expect(page.getByText('No encontramos ese café.')).toBeVisible();
  await page.getByRole('button', { name: 'Ver todos los cafés' }).click();
  await page.getByRole('button', { name: 'Añadir a favoritos El minero' }).click();
  await page.getByRole('button', { name: 'Añadir El minero al carrito' }).click();
  await page.getByRole('button', { name: 'Añadir Cresta Andina al carrito' }).click();
  await page.getByRole('link', { name: 'Carrito, 2 productos' }).click();
  await page.getByRole('button', { name: 'Confirmar pedido demo' }).click();
  await expect(page).toHaveURL(/pedido/);
  await page.getByRole('textbox', { name: 'Dirección', exact: true }).fill('Calle del Café 1200');
  await page.getByRole('textbox', { name: 'Ciudad', exact: true }).fill('Buenos Aires');
  await page.getByRole('textbox', { name: 'Código postal' }).fill('1425');
  await page.getByRole('textbox', { name: 'Código de descuento' }).fill('ALTURA10');
  await page.getByRole('button', { name: 'Aplicar', exact: true }).click();
  await expect(page.getByText('Descuento', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Confirmar pedido demo' }).click();
  await expect(
    page.getByText('Esta fue una compra de demostración.', { exact: false }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Carrito, 0 productos' }).click();
  await expect(page.getByText('Tu bolsa espera su primer café.')).toBeVisible();
  await page.goto('/resumen');
  await page.getByRole('button', { name: 'Favoritos', exact: true }).click();
  // La recarga inicia una sesión nueva: se documenta y se verifica el estado vacío.
  await expect(page.getByText('Tu colección empieza con un favorito.')).toBeVisible();
});
test('favoritos conservados durante navegación SPA', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Añadir a favoritos El minero' }).click();
  await page.locator('.desktop-nav').getByRole('link', { name: 'Mi café' }).click();
  await page.getByRole('button', { name: 'Favoritos', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'El minero', exact: true })).toBeVisible();
});
test('reserva, comunidad, actividad, asesoría y registro', async ({ page }) => {
  await page.goto('/experiencias');
  await page.getByRole('button', { name: 'Reservar Cata de orígenes' }).click();
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 30);
  await page.getByLabel('Fecha', { exact: true }).fill(nextDate.toISOString().slice(0, 10));
  await page.getByRole('button', { name: 'Confirmar reserva demo' }).click();
  await expect(page.getByRole('status')).toContainText('Reserva de demostración confirmada');
  await page.goto('/comunidad');
  await page.getByRole('button', { name: 'Me gusta publicación de Helena' }).click();
  await expect(
    page.getByRole('button', { name: 'Me gusta publicación de Helena' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: '2 comentarios' }).click();
  await page
    .getByRole('textbox', { name: 'Comentar publicación de Helena' })
    .fill('Un gran ritual');
  await page.getByRole('button', { name: 'Enviar comentario' }).click();
  await expect(page.getByText('Un gran ritual')).toBeVisible();
  await page.getByRole('button', { name: 'Guardar publicación de Helena' }).click();
  await page.getByRole('button', { name: 'Guardados', exact: true }).click();
  await expect(page.locator('.post')).toHaveCount(1);
  await page.goto('/actividad');
  await page.getByRole('button', { name: 'Seguir', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Siguiendo', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Comentarios', exact: true }).click();
  await expect(page.locator('.notification')).toHaveCount(1);
  await page.goto('/asesoria');
  await page.getByRole('button', { name: 'Me gusta el chocolate' }).click();
  await expect(page.getByRole('log')).toContainText('El minero, de Brasil');
  await page.getByRole('textbox', { name: 'Mensaje para asesoría' }).fill('V60');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.getByRole('log')).toContainText('Cresta Andina');
  await page.goto('/registro');
  await page.getByRole('button', { name: 'Google', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Google no está conectado');
  await page.getByRole('textbox', { name: 'Tu correo electrónico' }).fill('demo@example.com');
  await page.getByRole('button', { name: 'Crear cuenta demo' }).click();
  await expect(page.getByRole('heading', { name: 'Un gusto conocerte.' })).toBeVisible();
});
for (const width of [375, 768, 1440])
  test(`rutas y diseño sin desbordamiento a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const route of [
      '/',
      '/experiencias',
      '/pedido',
      '/resumen',
      '/comunidad',
      '/actividad',
      '/asesoria',
      '/registro',
    ]) {
      await page.goto(route);
      await expect(page.locator('#main')).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        route,
      ).toBe(true);
      expect(
        await page
          .locator('img')
          .evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0)),
        route,
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
test('menú móvil, carrusel y movimiento reducido', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await page.locator('.desktop-nav').getByRole('link', { name: 'Asesoría' }).click();
  await expect(page).toHaveURL(/asesoria/);
  await page.goto('/');
  await page.getByRole('button', { name: 'Siguiente en El ritual se comparte.' }).click();
  await expect
    .poll(() => page.locator('.carousel').evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await page.screenshot({ path: 'test-results/tienda-mobile.png', fullPage: true });
});
test('publicar una historia y cerrar el diálogo con Escape', async ({ page }) => {
  await page.goto('/comunidad');
  await page.getByRole('button', { name: 'Tu próxima historia' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Tu próxima historia' }).click();
  await page
    .getByRole('textbox', { name: 'Tu historia' })
    .fill('Mi primer café de origen, preparado sin apuro.');
  await page.getByRole('button', { name: 'Publicar historia demo' }).click();
  await expect(page.locator('.post').first()).toContainText('Mi primer café de origen');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('reserva conserva fecha al navegar y pedido funciona en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/experiencias');
  await page.getByRole('button', { name: 'Reservar Cata de orígenes' }).click();
  const future = new Date();
  future.setDate(future.getDate() + 30);
  const date = future.toISOString().slice(0, 10);
  await page.getByLabel('Fecha', { exact: true }).fill(date);
  await page.getByRole('button', { name: 'Confirmar reserva demo' }).click();
  await page
    .getByRole('navigation', { name: 'Navegación móvil' })
    .getByRole('link', { name: 'Mi café' })
    .click();
  await page.getByRole('button', { name: 'Reservas', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Cata de orígenes', exact: true })).toBeVisible();
  await expect(page.getByText('Reserva simulada, sin cargo.', { exact: false })).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Navegación móvil' })
    .getByRole('link', { name: 'Descubrir' })
    .click();
  await page.getByRole('button', { name: 'Añadir El minero al carrito' }).click();
  await page.getByRole('link', { name: 'Carrito, 1 productos' }).click();
  await expect(page.getByRole('button', { name: 'Confirmar pedido demo' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Añadir una unidad de El minero' }).click();
  await expect(page.getByLabel('Cantidad El minero', { exact: true })).toHaveText('2');
  await page.getByRole('button', { name: 'Quitar una unidad de El minero' }).click();
  await page.getByRole('button', { name: 'Quitar una unidad de El minero' }).click();
  await expect(page.getByText('Tu bolsa espera su primer café.')).toBeVisible();
});
