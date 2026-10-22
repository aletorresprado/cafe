# Altura 1200

Este proyecto surge de un **diseño de interfaz entregado por un diseñador en Figma** para Altura 1200, una aplicación de café de especialidad. El objetivo es mostrar el recorrido desde esa propuesta visual hasta una base de código que un desarrollador pueda ejecutar, entender y escalar.

El diseño aporta el punto de partida; el trabajo de desarrollo lo convierte en pantallas navegables, componentes reutilizables, datos tipados y comportamientos verificables. Dejamos documentadas esas decisiones para que el siguiente dev no tenga que invocar al autor mediante una sesión espiritista.

**Ocho pantallas, responsive, datos simulados y cero backend.** Carrito, favoritos, publicaciones, comentarios, filtros, reservas, registro y asesoría tienen interacción local. No se realizan cobros, envíos, registros ni reservas reales.

## Del diseño entregado al código

La referencia de diseño es [Altura 1200 en Figma](https://www.figma.com/design/GC8Nat9gSZy2Bw9jSIm8w6/Altura-1200?node-id=0-1). Figma es la herramienta en la que se presenta el diseño; mencionarla permite identificar el origen de la referencia. No es una dependencia de la aplicación ni hace falta tenerla abierta para ejecutar el proyecto.

Para esta implementación se trabajó con **ocho capturas móviles del diseño**, compartidas en la conversación. No se pudo inspeccionar el archivo de Figma directamente: no se extrajeron automáticamente sus capas, medidas, estilos o recursos. Las capturas tampoco están incluidas en el repositorio. No inventemos una integración que no ocurrió.

### Qué aporta el diseñador y qué resuelve el dev

La entrega visual muestra la composición, la jerarquía de información y las pantallas del producto. El desarrollador analiza esa referencia y decide cómo expresarla con el stack elegido: qué partes se repiten, cómo se navega, dónde vive el estado y qué pasa cuando el usuario interactúa.

Una pantalla estática no especifica por sí sola todos los estados del producto. En esta demo, el comportamiento de filtros, carrito, reservas y chat se definió durante el desarrollo. También se propuso la adaptación a escritorio, porque la referencia recibida era móvil. Son decisiones de implementación documentadas, no requisitos atribuidos al diseñador.

### Cómo se adapta al stack elegido

| Tecnología                          | Cómo traduce la referencia a una aplicación                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React**                           | Divide las pantallas en componentes: tarjetas de producto, pestañas, navegación, formularios y diálogos. Permite reutilizarlos y actualizar su contenido cuando cambia el estado.     |
| **TypeScript**                      | Define la forma de productos, cantidades y estado compartido. Ayuda a mantener coherencia entre catálogo, favoritos y pedido a medida que crece el proyecto.                          |
| **Vite**                            | Proporciona el entorno de desarrollo con recarga y genera el build de producción. Es la herramienta para trabajar y compilar; no decide el diseño.                                    |
| **Tailwind CSS 4 y CSS compartido** | Dan soporte al lenguaje visual y al responsive. Esta implementación integra Tailwind con Vite y combina utilidades con clases semánticas, tokens y estilos en `src/styles/index.css`. |
| **React Router**                    | Conecta las ocho pantallas mediante rutas y conserva la navegación dentro de la aplicación.                                                                                           |
| **CSS y APIs del navegador**        | Resuelven transiciones, carruseles con scroll snap y diálogos, respetando la preferencia de movimiento reducido.                                                                      |

### El recorrido de implementación

1. **Leer la referencia:** identificar las ocho vistas, su contenido y los elementos compartidos. Registrar lo que falta definir antes de convertir una suposición en requisito.
2. **Separar las piezas:** transformar patrones visuales repetidos en componentes de React y organizar las pantallas por funcionalidad.
3. **Modelar los datos:** crear fixtures tipados para productos, experiencias y comunidad. Mantener los importes en centavos y el cálculo del pedido fuera de la presentación.
4. **Conectar las interacciones:** implementar navegación, búsqueda, favoritos, cantidades, formularios y respuestas locales. El prototipo debe responder a lo que el usuario hace.
5. **Adaptar a cada pantalla:** reorganizar grillas y navegación para móvil, tablet y escritorio; definir desplazamiento y movimiento sin depender de una imagen fija.
6. **Verificar y documentar:** comprobar compilación, cálculos, recorridos y anchos de pantalla; dejar explícito qué se conserva del diseño, qué se reinterpretó y qué queda pendiente.

Un ejemplo concreto: la tarjeta de café de la referencia se convierte en `ProductCard` en `src/components/ui.tsx`. Su contenido sale de `src/data/catalog.ts`; añadir una unidad actualiza `src/app/store.tsx`; el pedido lee ese estado y calcula sus importes con `src/app/cart.ts`. Así la tarjeta deja de ser una imagen aislada y pasa a formar parte de un recorrido funcional.

### Alcance de la adaptación visual

Esta entrega es una **reinterpretación del diseño recibido**, con composición editorial, verdes oscuros, tonos crema e ilustraciones SVG propias. Se conservaron las ocho áreas principales y se desarrollaron sus interacciones de demostración; no se pretende una reproducción pixel a pixel ni presentar las decisiones visuales nuevas como parte de la entrega original del diseñador.

Para una siguiente iteración con mayor fidelidad, corresponde revisar junto al diseñador las diferencias, obtener los recursos originales y confirmar estilos, medidas, estados y comportamiento responsive. La base está preparada para continuar ese trabajo. Que el código compile no significa que el diseñador haya aprobado cada cambio.

## Arrancar, que para eso vinimos

Requiere **Node 24 LTS (recomendado)** y npm. También admite Node 22 desde 22.12 y Node 26 o superior; las ramas impares 23 y 25 no están soportadas por Vitest 5. Entorno verificado: Node 24.19.0 y npm 11.9.0. El archivo `.node-version` registra esa versión. Trabajá desde la raíz de `cafe`:

```bash
npm ci --cache /tmp/altura-npm-cache
npm run dev
```

Vite escucha en todas las interfaces; su puerto predeterminado es 5173. No necesitás `.env`, credenciales, base de datos ni conexión a Figma. Las ilustraciones y los tipos de letra se resuelven localmente. La instalación sí requiere acceso a `registry.npmjs.org`.

La caché explícita evita depender de un directorio personal escribible en el entorno cloud. `npm ci` usa el lockfile. No lo reemplaces por otro gestor porque hoy te levantaste inspirado.

## Comandos reales

| Comando                | Qué hace                                             |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo con recarga                   |
| `npm run build`        | TypeScript estricto y build de producción en `dist/` |
| `npm run preview`      | Sirve el build; ejecutar build primero               |
| `npm test`             | Cuatro pruebas unitarias de importes y descuentos    |
| `npm run test:e2e`     | Recorridos de navegador con Playwright               |
| `npm run format`       | Formatea código y documentación                      |
| `npm run format:check` | Comprueba el formato sin modificar archivos          |

Para las pruebas de navegador, elegí **una** de estas opciones:

```bash
# En este entorno ya existe Chromium:
CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e

# En otra máquina con acceso a las descargas oficiales:
npx playwright install chromium
npm run test:e2e
```

La descarga de Playwright está bloqueada por el proxy de este entorno; el Chromium del sistema sí fue probado. El servidor de las pruebas arranca automáticamente. Los resultados temporales se guardan en `test-results/`, ignorado por Git. No existe un script de lint: TypeScript comprueba tipos y Prettier formato; ninguno sustituye una revisión de comportamiento.

## Qué podés recorrer

| Ruta            | Vista                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| `/`             | Tienda: búsqueda, orígenes, productos, favoritos y carrusel de historias |
| `/experiencias` | Experiencias y reserva simulada con fecha                                |
| `/pedido`       | Carrito, cantidades, envío, cupón y confirmación demo                    |
| `/resumen`      | Panel, gráfico de muestra, favoritos y reservas de la sesión             |
| `/comunidad`    | Feed, publicaciones locales, me gusta, comentarios y guardados           |
| `/actividad`    | Filtros de notificaciones y seguimiento simulado                         |
| `/asesoria`     | Conversación local con recomendaciones predefinidas                      |
| `/registro`     | Formulario de correo y proveedores explicados como demostración          |

**El estado vive en memoria.** Carrito, favoritos y reservas se conservan al navegar dentro de la app y se pierden al recargar. Feed, comentarios, seguimiento y chat se reinician al salir de su pantalla. Esto es una decisión deliberada de la demo, no una base de datos que se rompió.

Precios en centavos, moneda **USD provisional**, impuestos simulados de 200 centavos por pedido no vacío y envío gratuito. Cupón de muestra: `ALTURA10`. No reutilices estas reglas como una política comercial real.

## Mapa para continuar

- [Alcance y decisiones](docs/01-alcance.md): qué se aprobó y qué es provisional.
- [Fases implementadas](docs/02-implementacion.md): lo que se construyó y lo que falta.
- [Criterios de calidad](docs/03-calidad.md): cómo comprobar una entrega.
- [Arquitectura](docs/04-arquitectura.md): dónde está cada cosa y por qué.
- [Validación y límites](docs/05-validacion.md): evidencias y comprobaciones pendientes.
- [Próximos pasos](docs/06-continuar.md): guía de trabajo para el siguiente dev o IA.
- [AGENTS.md](AGENTS.md): instrucciones para agentes. Leelas antes de tocar nada.

## Diseño y recursos

El origen de la referencia y las decisiones de adaptación se explican en «Del diseño entregado al código». Los recursos actuales son ilustraciones SVG propias y locales en `public/images/`, reemplazables por los recursos finales que se acuerden con el diseñador. Consultá [alcance y decisiones](docs/01-alcance.md) y [arquitectura](docs/04-arquitectura.md) antes de sustituirlos.

Stack instalado: React 19, TypeScript 5.9, Vite 7, Tailwind 4 con su plugin oficial, React Router 7 y Lucide. Las versiones exactas están en `package-lock.json`. No hay librería de animación: usamos CSS, desplazamiento nativo y scroll snap, respetando movimiento reducido.

## Producción, cuando toque

`npm run build` genera `dist/`. El hosting debe resolver las rutas de la SPA hacia `index.html`, preservando archivos estáticos. El proyecto asume despliegue en la raíz del dominio; un subdirectorio requiere configurar `base` y el router. No se configuró ni realizó un despliegue. No afirmes lo contrario porque apareció un archivo HTML.
