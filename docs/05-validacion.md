# Evidencia de esta entrega

Fecha: 22 de octubre de 2026. Instancia cloud actual, Node 24.19.0, npm 11.9.0 y Chromium del sistema. No se ha validado restauración en otra tarea ni publicación del entorno.

## Comprobaciones ejecutadas

| Comprobación                                       | Resultado                                         |
| -------------------------------------------------- | ------------------------------------------------- |
| `npm ci --cache /tmp/altura-npm-cache`             | Correcto; instalación repetida usando el lockfile |
| `npm run build`                                    | Correcto; TypeScript estricto y build Vite        |
| `npm test`                                         | 4 pruebas unitarias aprobadas                     |
| `CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e` | 9 pruebas de navegador aprobadas                  |
| `npm run format:check`                             | Formato comprobado con Prettier                   |
| Servidor Vite y navegación real                    | Verificados mediante Playwright                   |

No se cuentan suites vacías ni pruebas omitidas como aprobadas. Prettier no comprueba lógica; para eso están las otras verificaciones.

## Cobertura concreta

- Búsqueda sin resultados y restablecimiento del catálogo.
- Favoritos conservados durante navegación SPA y reiniciados en recarga.
- Añadir productos, cambiar cantidades hasta vaciar el carrito, cupón y confirmación simulada.
- Bloqueo de envío del formulario de pedido incompleto.
- Reserva con fecha y lectura de la reserva desde el panel.
- Me gusta, comentarios, guardados y publicación de una historia local.
- Cierre de diálogo con Escape.
- Seguimiento y filtro de actividad.
- Recomendaciones de chocolate y V60 en el chat.
- Explicación del proveedor de registro simulado y formulario de correo.
- Las ocho rutas a 375, 768 y 1440 px: imágenes cargadas, sin errores JS capturados ni desbordamiento horizontal de la página.
- Menú móvil, carrusel y configuración de movimiento reducido.

Se inspeccionaron capturas de tienda en móvil y escritorio, y de experiencias, panel, registro y asesoría en escritorio. No hay una comparación automatizada de píxeles contra Figma.

## Fallos encontrados y resueltos

La primera instalación intentó usar una caché personal no escribible. La caché explícita en `/tmp` resolvió la instalación. La descarga del navegador oficial devolvió 403; se usó el Chromium ya instalado, conservando la verificación TLS y de paquetes.

En la primera ejecución de navegador fallaron dos comprobaciones: volver al carrito tras confirmar conservaba la pantalla de éxito y el botón Google incluía una letra decorativa en su nombre accesible. Se corrigieron y las pruebas posteriores pasaron.

## Pendiente, sin maquillaje

- Safari, Firefox y dispositivos físicos, incluido teclado móvil real.
- Auditoría de accesibilidad con lector de pantalla y medición completa de contraste.
- Comparación visual con recursos originales; las ilustraciones y la adaptación editorial son una reinterpretación deliberada.
- Flujo de red, backend, sesiones, pagos, inventario y persistencia: fuera del alcance, sin validar.
- CI y despliegue en un hosting real: todavía no configurados.

El código permite seguir desarrollando la demo. No constituye una tienda de producción. Si alguien te vende lo contrario, que vuelva a leer el README.

## Corrección de dependencias

Se reprodujeron tres avisos de `npm audit`: uno moderado en `@vitest/mocker` y dos críticos contabilizados en `tinypool` y su dependencia directa `vitest`. Se actualizó Vitest de la rama 3 a 5.0.5, compatible con Vite 7 y Node 24. Se actualizaron manifiesto, lockfile y requisitos de Node, sin usar `npm audit fix --force` ni overrides de dependencias transitivas. Verificación posterior: instalación limpia con `npm ci`, `npm audit` con **0 vulnerabilidades**, build correcto, 4 pruebas unitarias y 9 pruebas de navegador aprobadas. Los resultados de auditoría dependen de los avisos conocidos en el momento de ejecutarla.
