# Alcance y decisiones

## Aprobado

El usuario aprobó la propuesta de implementar las ocho pantallas como una demo visual responsive con TypeScript, React, Vite y Tailwind, sin backend, y con documentación detallada que permita continuar a otro dev o IA.

## Referencias disponibles

Ocho capturas móviles: tienda, experiencias, pedido, resumen personal, comunidad, actividad, asesoría y registro. Las capturas no están en el repositorio. Figma no pudo consultarse. No hay diseño original de escritorio.

## Decisiones de esta entrega

- **Reinterpretación visual:** verdes oscuros y crema, tipografía de sistema con acentos serif, componentes y navegación consistentes. Se aparta deliberadamente del blanco y negro de las capturas.
- **Recursos:** SVG propios y locales, editables como texto. La descarga de fotografías desde Unsplash devolvió 403. No hay recursos gráficos copiados de Figma ni fotografías con licencias por resolver dentro del código actual.
- **Responsive:** navegación superior en escritorio, menú y barra inferior en móvil; grillas adaptables; carrusel horizontal nativo. Breakpoints principales: 520, 800 y 1150 px.
- **Estado:** memoria de React. No hay localStorage, cookies ni API. Los alcances de persistencia están descritos en el README.
- **Moneda provisional:** USD con formato `es-AR`. Confirmar moneda y reglas impositivas antes de evolucionar el pedido.
- **Asesoría:** respuestas locales deterministas según palabras del mensaje. No usa IA ni envía datos.
- **Registro:** validación nativa de correo y pantalla de éxito ficticia. Google y Apple explican que no están conectados.
- **Reservas:** fecha seleccionada y experiencia almacenadas durante la navegación SPA; repetir una reserva actualiza su fecha. No hay cupos ni agenda real.
- **Panel:** métricas históricas y consumo son datos de muestra, independientes del carrito. Favoritos y reservas sí reflejan la sesión.
- **Comunidad:** se pueden escribir historias de texto; subir imágenes queda pendiente. Seguir a Lucía no modifica el feed de muestra.

## Pendientes que requieren decisión de producto

Recursos originales; identidad definitiva; revisión visual contra Figma; moneda; reglas comerciales; persistencia deseada y eventual contrato de API. No inventes estas decisiones como si fueran especificaciones aprobadas.

## Fuera del alcance

Backend, pagos, autenticación real, chat remoto, inventario y reservas reales. El frontend no debe recibir secretos para simular ninguna de estas cosas.
