# Arquitectura: dónde tocar sin romper lo de al lado

## Entrada y rutas

`index.html` carga `src/main.tsx`. Allí se monta React, `BrowserRouter`, `StoreProvider` y el árbol de rutas. `src/app/Layout.tsx` contiene encabezado, menú, navegación móvil, contenido y pie. Las pantallas entran por `Outlet`. No dupliques el encabezado en una nueva vista.

## Archivos por responsabilidad

| Archivo                     | Responsabilidad                                                        |
| --------------------------- | ---------------------------------------------------------------------- |
| `src/data/catalog.ts`       | Tipos y fixtures de productos, orígenes y experiencias                 |
| `src/data/social.ts`        | Publicaciones y notificaciones de muestra                              |
| `src/app/cart.ts`           | Cálculo puro de totales y formato de importes                          |
| `src/app/store.tsx`         | Estado compartido: carrito, favoritos, reservas y avisos               |
| `src/components/ui.tsx`     | Encabezado de vista, tarjeta de producto, pestañas, carrusel y diálogo |
| `src/features/Shop.tsx`     | Tienda, búsqueda, filtros y secciones editoriales                      |
| `src/features/Checkout.tsx` | Pedido, formulario y confirmación ficticia                             |
| `src/features/Discover.tsx` | Experiencias y panel personal                                          |
| `src/features/Social.tsx`   | Comunidad y actividad                                                  |
| `src/features/Account.tsx`  | Chat de asesoría y registro demo                                       |
| `src/styles/index.css`      | Integración Tailwind, tokens, componentes y responsive                 |
| `public/images/`            | Ilustraciones propias en SVG                                           |

Las vistas relacionadas comparten archivo en esta primera escala. Si crecen, separarlas antes de meter otra responsabilidad. No hace falta una arquitectura de microfrontends para cuatro tarjetas.

## Estado y flujo de datos

`ProductCard` recibe un producto tipado y llama a `useStore()`. Añadir actualiza el carrito por `id`; el contador del encabezado y el pedido leen ese mismo estado. `cartTotals` cruza las cantidades con el catálogo y devuelve centavos enteros. El cupón se aplica sobre el subtotal; los impuestos ficticios se añaden después.

`StoreProvider` vive por encima de las rutas. Por eso carrito, favoritos y reservas sobreviven a la navegación interna. El resto usa estado local en cada pantalla. Una recarga desmonta toda la aplicación: nada persiste. No confundas un `Link` de React Router con abrir otra página mediante `window.location`.

No se guardan números de tarjeta. La dirección y el correo existen temporalmente en los formularios locales y no se transmiten. Los avisos se cierran explícitamente para dar tiempo a leerlos.

## Estilos y movimiento

Tailwind 4 se importa en la hoja principal y se integra con su plugin oficial de Vite. Los componentes tienen clases semánticas y estilos compartidos para facilitar la lectura de esta demo. Los tokens de `:root` y `@theme` son el punto de partida; no abras un segundo sistema de colores en otra carpeta.

El carrusel usa overflow y scroll snap. Los botones desplazan el contenedor; el propio contenedor recibe foco para permitir navegación de teclado. Las animaciones son CSS. Los desplazamientos JS respetan movimiento reducido. El diálogo usa `showModal()` del navegador para bloquear interacción de fondo y gestionar el foco; no lo reemplaces por un div que solo parece un diálogo.

## Sustituir ilustraciones

Cambiar el campo `image` del producto o la referencia de la vista. Guardar recursos propios o con permiso en `public/images/`, optimizar tamaño y revisar texto alternativo y recorte. La capa `product-stamp` representa una bolsa sobre la ilustración: retirarla si una nueva fotografía ya muestra el envase. No apiles dos etiquetas de marca y culpes al CSS.

## Conectar una API en otra etapa

No hay capa HTTP porque no existe backend. Cuando haya contrato, añadir servicios tipados que devuelvan los modelos de dominio y estados de carga/error. Mantener el cálculo visible y la interfaz independientes de la forma de la respuesta. El servidor deberá validar importes y pedidos; los cálculos del navegador no son una frontera de confianza.

No pongas claves privadas en variables `VITE_*`: se distribuyen al navegador. Ninguna es necesaria en esta demo.
