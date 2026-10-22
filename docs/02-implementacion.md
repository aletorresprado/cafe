# Fases implementadas

Esto describe la primera entrega. Una fase implementada no significa que ya se puede cobrar café por internet. Bajá un cambio.

## 1. Base técnica — implementada

React con TypeScript estricto, Vite y Tailwind 4 mediante `@tailwindcss/vite`. npm es el único gestor y `package-lock.json` fija la resolución. `.node-version` registra el runtime probado. React Router conecta ocho vistas y una página de ruta desconocida.

Verificación: instalación reproducible, build y pruebas. Comandos en README.md.

## 2. Lenguaje visual — implementado

Tokens, estilos responsive, navegación, tarjetas, pestañas, encabezados, carrusel y diálogo reutilizables. Ilustraciones propias locales en `public/images/`. Iconos Lucide. Sin dependencias de tipografías o imágenes remotas.

Verificación: capturas de tienda en móvil y escritorio inspeccionadas, carga de imágenes y ausencia de desbordamiento comprobadas en las ocho rutas a tres anchos.

## 3. Tienda y pedido — implementados

Búsqueda por nombre, origen y notas; filtro por origen; favoritos; carrito con cantidades; descuento `ALTURA10`; formulario de dirección; entrega gratuita y pago ficticio. Importes en centavos y función de totales separada.

Verificación: pruebas unitarias y recorrido automatizado hasta confirmación demo, incluyendo carrito vacío, formulario incompleto y descuento.

## 4. Otras vistas — implementadas

Experiencias con reserva y fecha; resumen con gráfico ilustrativo, favoritos y reservas; comunidad con publicaciones y comentarios locales; actividad con filtros; asesoría determinista; registro simulado. Los avisos explican los límites del prototipo.

Verificación: pruebas de navegador sobre las interacciones principales. Ver docs/05-validacion.md para límites reales de cobertura.

## 5. Responsive y movimiento — implementados

Adaptación móvil/tablet/escritorio con CSS, scroll snap y animaciones breves. Las solicitudes JS de desplazamiento consultan `prefers-reduced-motion`. El diálogo nativo gestiona foco, teclado y Escape.

Verificación: tests a 375, 768 y 1440 px; menú móvil y desplazamiento del carrusel. La revisión táctil en dispositivos físicos sigue pendiente.

## 6. Entrega y continuidad — documentadas

README con comandos, arquitectura, instrucciones para agentes, criterios de calidad y plan de extensión. No se desplegó ni se conectó un backend. No se hizo una auditoría completa de accesibilidad.

Siguiente trabajo: seguir docs/06-continuar.md; priorizar recursos finales y revisión con las capturas antes de sumar funcionalidades por entusiasmo.
