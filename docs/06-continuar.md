# Siguiente dev o IA: trabajá en este orden

## Primero, comprobar lo que recibiste

1. Leer README.md, AGENTS.md y alcance. Revisar `git status` antes de editar.
2. Instalar con el lockfile y correr build y tests. Registrar cualquier fallo previo.
3. Recorrer las ocho rutas. Si necesitás comparar con el diseño, conseguir las capturas o acceso legítimo a Figma. No reconstruirlas desde una descripción y afirmar que son exactas.
4. Elegir una mejora concreta; escribir qué comportamiento cambiará y cómo se comprobará.

## Prioridad 1: cerrar la referencia visual

Solicitar recursos originales y confirmar identidad, moneda y diseño de escritorio. Reemplazar las ilustraciones si corresponde. Comparar móvil y escritorio con capturas de antes/después. Conservar interacciones y estados accesibles.

## Prioridad 2: fortalecer la base

Separar vistas agrupadas cuando crezcan. Mover reglas repetidas a funciones tipadas. Añadir lint si el equipo lo requiere, sin confundir formato con análisis estático. Ampliar pruebas con la próxima necesidad concreta: no empezar escribiendo cien tests de componentes que repiten el JSX.

Revisar accesibilidad con lector de pantalla, contraste y dispositivo táctil. Las pruebas actuales no certifican WCAG ni sustituyen uso humano.

## Prioridad 3: acordar persistencia

Hoy cada recarga reinicia el estado. Si se pide mantener carrito o favoritos, definir qué se persiste, su versión, caducidad y cómo limpiar datos. Probar almacenamiento corrupto y catálogo modificado. No persistir dirección o correo por comodidad.

## Ejemplo: añadir un producto

1. Añadir una entrada con `id` estable a `src/data/catalog.ts`; precio en centavos y origen existente o explícitamente incorporado.
2. Añadir un recurso local y revisar el texto alternativo.
3. Verificar filtros, favorito, añadir al carrito y cambios de cantidad.
4. Comprobar importes calculados, no escribir un nuevo total fijo.
5. Ejecutar build, unitarios y el recorrido afectado. Actualizar documentación si cambia una regla.

## Ejemplo: añadir una pantalla

1. Crear el componente en `src/features/` con sus estados vacíos y de error pertinentes.
2. Registrar la ruta en `src/main.tsx` y la navegación que la necesite en Layout.
3. Definir si el estado es de la pantalla o compartido. No elevarlo todo por reflejo.
4. Reutilizar `PageIntro`, `Tabs`, tarjetas o `Modal` cuando el comportamiento encaje.
5. Probar acceso directo, navegación, móvil, escritorio, foco y vuelta atrás.
6. Actualizar la tabla de rutas del README y el mapa de arquitectura.

## Para una entrega revisable

Describir cambios, decisiones, comandos ejecutados, resultados y limitaciones. No borrar un test porque descubrió un problema. No declarar despliegues, conexiones o compras que no ocurrieron. Acá se viene a dejar una base confiable, no una novela de éxitos imaginarios.
