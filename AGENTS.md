# Instrucciones para quien toque este proyecto

Lee README.md y docs/ antes de editar. Sí, antes.

## Contexto

Altura 1200 es una demo visual, sin backend, basada en ocho pantallas móviles. Stack acordado: TypeScript, React, Vite y Tailwind CSS. Consulta docs/01-alcance.md para no convertir propuestas en requisitos aprobados.

## Forma de trabajar

1. Inspecciona el estado actual, los scripts, el lockfile y los cambios del usuario. No sobreescribas trabajo ajeno.
2. Usa el checkout existente. Cada tarea cloud ya está aislada; no crees worktrees salvo petición explícita.
3. Elige el siguiente paso incompleto de docs/02-implementacion.md. Explica alcance y supuestos antes de una decisión significativa.
4. Implementa una unidad revisable y verifica su comportamiento. No construyas cinco abstracciones para resolver un botón.
5. Ejecuta los comandos existentes pertinentes. Si no hay herramienta para una comprobación, dilo; no inventes resultados.
6. Actualiza documentación y estado de las fases con evidencias reales.

## Límites

- No agregues backend, credenciales, pagos reales ni servicios de autenticación sin una nueva petición.
- No afirmes haber leído Figma: las referencias disponibles fueron capturas en la conversación.
- Si las capturas no están disponibles en tu contexto, solicítalas antes de declarar fidelidad visual.
- Mantén separados datos simulados, lógica de interacción y presentación.
- Evita `any`, dependencias innecesarias y componentes gigantes. Justifica las excepciones.
- No declares una fase completa porque compila: verifica también el recorrido del usuario.
- El tono gruñón corresponde a la documentación. La interfaz debe ser clara y amable.

## Entrega

Indica qué cambió, qué comprobaste, qué falta y cómo reproducirlo. Distingue pruebas ejecutadas de comprobaciones pendientes. Si algo falla, conserva el fallo visible y explica su causa conocida; no lo escondas desactivando validaciones.
