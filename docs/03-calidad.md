# Cómo comprobar que funciona

Una captura bonita no demuestra que la aplicación funcione. Un build verde tampoco demuestra que se pueda usar.

## Comprobaciones cuando exista la aplicación

- Instalación reproducible con el lockfile y build de producción correctos.
- Tipado y lint según los scripts realmente configurados.
- Navegación entre rutas, recarga directa y vuelta atrás.
- Búsqueda con resultados y sin resultados; filtros que se puedan restablecer.
- Carrito vacío, cambios de cantidad y totales calculados correctamente.
- Formularios con etiquetas, errores comprensibles y feedback de éxito simulado.
- Chat sin mensajes vacíos y respuestas locales claramente delimitadas.
- Carruseles utilizables con teclado, ratón y tacto.
- Foco visible, botones con nombre accesible y texto alternativo adecuado.
- Movimiento reducido y contraste legible.
- Anchuras representativas: 375, 768 y 1440 px. Sin desbordamiento horizontal de toda la página; los carruseles sí pueden desplazarse.
- Sin contenido oculto por barras fijas ni errores propios en consola.

## Fidelidad visual

Comparar cada vista con su captura si está disponible. Registrar diferencias deliberadas, especialmente adaptación de escritorio, imágenes de muestra y unificación de navegación. No afirmar precisión pixel a pixel sin medirla.

## Evidencia de entrega

Registrar fecha, comandos ejecutados, resultados y comprobaciones manuales. Distinguir aprobado, fallido y no ejecutado. La evidencia de esta entrega está registrada en docs/05-validacion.md. No reemplaza las comprobaciones pendientes de dispositivos físicos y accesibilidad.

## Cómo extender sin romperlo

Para añadir una pantalla: definir su propósito, ruta, datos e interacciones; reutilizar piezas existentes; cubrir estados vacíos y errores; verificar móvil y escritorio; actualizar el mapa de vistas y las instrucciones afectadas. Si una decisión cambia el alcance, documentarla antes de arrastrarla por todo el código.
