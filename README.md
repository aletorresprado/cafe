# Altura 1200

Una demo de café de especialidad: del diseño a una base de React que otro dev pueda continuar sin invocar a su autor mediante una sesión espiritista.

**Ocho pantallas, responsive, datos simulados y cero backend.** Carrito, favoritos, publicaciones, comentarios, filtros, reservas, registro y asesoría tienen interacción local. No se realizan cobros, envíos, registros ni reservas reales.

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

La referencia fueron ocho capturas móviles compartidas en la conversación; no están almacenadas aquí y no se pudo inspeccionar Figma. Esta entrega es una reinterpretación: composición editorial, verdes oscuros, tonos crema e ilustraciones SVG propias en lugar de las fotografías originales. Escritorio tiene una adaptación propia; no se afirma fidelidad pixel a pixel.

Stack instalado: React 19, TypeScript 5.9, Vite 7, Tailwind 4 con su plugin oficial, React Router 7 y Lucide. Las versiones exactas están en `package-lock.json`. No hay librería de animación: usamos CSS, desplazamiento nativo y scroll snap, respetando movimiento reducido.

## Producción, cuando toque

`npm run build` genera `dist/`. El hosting debe resolver las rutas de la SPA hacia `index.html`, preservando archivos estáticos. El proyecto asume despliegue en la raíz del dominio; un subdirectorio requiere configurar `base` y el router. No se configuró ni realizó un despliegue. No afirmes lo contrario porque apareció un archivo HTML.
