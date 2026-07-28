# Plan tema claro — Portafolio

Guía paso a paso para que el tema light se vea deliberado y agradable, al mismo nivel que el dark. Solo texto por fase, sin código en este documento.

---

## Antes de empezar

1. Trabaja en una rama aparte, por ejemplo `feat/light-theme-polish`. No mezcles esto con commits a medias de i18n si aún no están cerrados.
2. Confirma que `npm run dev` abre bien y que puedes alternar claro/oscuro con el botón del sol/luna.
3. Regla: una fase, un commit, probar en el navegador, y recién ahí la siguiente.
4. No rediseñes el layout (Hero, cards, tipografía mono se quedan). Solo tokens, contraste, navbar y profundidad.
5. El dark debe seguir viéndose igual o casi igual; el foco es light.

---

## Diagnóstico (por qué se ve mal hoy)

| Problema | Causa |
|----------|--------|
| Navbar “no cambia” / se siente oscuro en light | Links, LanguageToggle y ThemeToggle usan colores fijos (`#abb2bf`, `hover:text-white`) pensados para fondo oscuro |
| Fondo apagado y plano | `--background` es gris medio (`217, 217, 219`), no un off-white limpio |
| Cards y botones “huecos” | Misma superficie que el body; sombras pensadas para dark |
| Jerarquía floja | `--muted` en light es casi negro (`40 44 51`); no sirve como texto secundario |
| Naranja duro sobre gris | Mal contraste del accent sobre el fondo actual |

---

## Decisiones de diseño (v1)

Acuerdos antes de implementar. No cambiar en v1 salvo que falle en pruebas.

### Paleta light

| Token | Rol | Dirección (aprox.) |
|-------|-----|--------------------|
| `--background` | Fondo de página | Casi blanco frío (~250, 250, 252) |
| `--foreground` / `--primary` | Texto principal | Casi negro (~28, 28, 32) |
| `--muted` | Texto secundario | Gris medio legible (~100, 105, 115) — **no** usarlo como borde de cards |
| `--secondary` | Acento naranja | Light afinado (~195, 110, 18) para mejor contraste sobre off-white |
| `--surface` | Cards, paneles, navbar | Light: blanco; dark: un peldaño sobre el background (~48, 52, 60) |
| `--border` | Bordes de cards/inputs | Gris de estructura (separado de `--muted`) |
| `--on-secondary` | Texto sobre fill naranja | Light: blanco; dark: tono oscuro legible sobre secondary |
| `--elevation-shadow` / `-sm` | Sombra de elevación | Light suave (~8% negro); dark más profunda |
| `--custom-shadow` | Foto About / media | Intensidad por tema (no hardcodear `0.6`) |
| `--media-shadow` | Marco de phone en gallery | Sombra de dispositivo por tema |

Formato: canales RGB **con comas** para que funcionen `rgb(var(--x))` y `rgba(var(--x), a)`.

Dark: no clonar el light al revés; elevar `--surface` respecto a `--background` para que las cards se lean como paneles.

### Navbar

- Fondo: `bg-surface-translucent` + `border-theme` + blur (utilidades en `globals.css`).
- Links/toggles: clase `.text-chrome` (muted → foreground al hover). **Cero** hex fijos.
- Logo: `text-foreground` + icono `text-secondary`.

### Profundidad

- Cards / skills: `background: rgb(var(--surface))` + `border: … var(--border)`.
- Hover: `var(--elevation-shadow)` **más** glow suave de `--secondary` (ambos temas).
- Chips/tags: `rgba(var(--foreground), 0.04)` — un solo estilo, sin forks `.dark .…` innecesarios.
- Botones `.btn` y links primary: hover con `color: rgb(var(--on-secondary))`, nunca `var(--background)`.

### Atmósfera (fase opcional al final)

- Gradiente muy suave en `body`, o grid/puntos al 3–4% de opacidad.
- No meter púrpura, cream/terracotta ni otro look genérico.
- Mantener identidad: mono + naranja + estética “dev”.
- Preferir limitar atmósfera a light si ensucia el dark.

### Qué NO hacer en v1

- No cambiar fuentes ni el layout de secciones.
- No rehacer animaciones GSAP.
- No tocar copy ni i18n.
- No convertir el sitio a “cards everywhere” en el hero.
- No usar `dark:` de Tailwind con colores hardcodeados para piezas nuevas: preferir CSS variables.
- No usar `bg-surface/90` de Tailwind sobre clases custom: crear utilidad (`bg-surface-translucent`) o `rgba(var(--surface), …)`.

---

## Progreso

| Fase | Estado |
|------|--------|
| 0 Git / docs | Hecho |
| 1 Tokens | Hecho |
| 2 Navbar + toggles | Hecho |
| 3 Superficies + botones | Hecho |
| 4 Hero / About / Contact | Hecho |
| 5 Atmósfera | Hecho (opción A: gradiente light) |
| 6 QA | Pendiente |

---
## FASE 0 — Git y carpeta docs

**Objetivo:** Que los `.md` de `docs/` se puedan versionar sin sorpresas.

**Qué hacer:**
- Confirmar que `.gitignore` **no** ignore `docs/` ni `*.md` de planes.
- Si aparece una regla `docs/`, quitarla.
- Dejar un comentario claro en `.gitignore`: los planes viven en `docs/` y se commitean.
- Opcional: `git add docs/` y commit solo de docs/planes cuando toque.

**Verificar:**
- `git status` muestra `docs/...` como untracked o tracked, **nunca** como ignored.
- `git check-ignore -v docs/PLAN-tema-claro.md` no imprime nada (exit code 1 = no ignorado).

**Commit sugerido:** `chore: track docs/ for project plans`

---
s
## FASE 1 — Tokens del tema claro

**Objetivo:** Nueva paleta light en `globals.css` sin tocar componentes aún.

**Qué hacer:**
- En `:root` (light): actualizar `--background`, `--foreground`, `--primary`, `--muted`, `--secondary`.
- Añadir `--surface` (y si hace falta `--border`).
- En `.dark`: copiar valores actuales de fondo/texto y definir `--surface` / `--border` acordes al dark.
- No cambiar aún Navbar ni botones.

**Verificar:**
- Al alternar tema, el fondo del body ya se ve más limpio en light.
- Dark se ve igual que antes (o casi).
- No hay errores visuales graves en Hero/Projects (pueden seguir “planos”; eso es fase 3–4).

**Commit sugerido:** `style: refresh light theme color tokens`

---

## FASE 2 — Navbar + toggles con tokens

**Objetivo:** Que la barra superior cambie de verdad con el tema.

**Qué hacer:**
- `Navbar.tsx`: fondo con `--surface` / tokens; quitar dependencia de `bg-white` + `dark:bg-[#282c33]` hardcodeados si se puede expresar con variables.
- Links: `text-muted` + hover `text-foreground` (o clases equivalentes). Logo: siempre `text-foreground`.
- `LanguageToggle.tsx`: idioma inactivo con muted; activo con secondary; hover sin `text-white` fijo.
- `ThemeToogle.tsx`: icono con muted / hover foreground (no `hover:text-white` fijo).
- Menú móvil: mismos tokens.

**Verificar:**
- Light: navbar clara, links grises legibles, ES/EN y sol/luna legibles.
- Dark: navbar oscura, links claros, mismo comportamiento de hover.
- Sticky + blur sigue bien al scrollear.
- Tema claro y oscuro del sistema / botón: sin flash raro de colores invertidos.

**Commit sugerido:** `fix: make navbar and toggles theme-aware`

---

## FASE 3 — Superficies: projects, skills, botones

**Objetivo:** Separar “página” de “tarjeta” y corregir hover de botones en light.

**Qué hacer:**
- `projects.css` / `skills.css`: fondo `rgb(var(--surface))`; bordes `rgb(var(--border))` (no `--muted`).
- Hover: `var(--elevation-shadow)` / `-sm` + glow suave de secondary.
- `.btn` y links primary fill: `color: rgb(var(--on-secondary))` en hover.
- `.custom-shadow` → `var(--custom-shadow)` (intensidad por tema).
- Gallery phone / dots: `--media-shadow`, `--shadow-color`, `--on-secondary` (sin `rgba(0,0,0,…)` sueltos).
- Chips/tags: un fondo `rgba(var(--foreground), 0.04)`; quitar reglas `.dark .chip` duplicadas si ya no aportan.

**Verificar:**
- Cards se leen como paneles sobre el fondo, no “dibujadas” en el mismo gris.
- Botones outline: hover agradable en light y dark.
- Skills chips/cards coherentes con projects.
- About foto (`custom-shadow`) no se ve “negra” de más en light.

**Commit sugerido:** `style: surfaces and button contrast for light theme`

---

## FASE 4 — Hero, About y detalles de contraste

**Objetivo:** Ajustar piezas sueltas que aún se vean lavadas o con mal contraste.

**Qué hacer:**
- Hero: tipografía secondary sobre el nuevo fondo; si el naranja falla WCAG-ish, cerrar un poco más `--secondary` en light (solo afinar tokens).
- About: foto/texto con separación del fondo; botón “Leer más” vía `.btn` (ya usa `--on-secondary`).
- Contact / formulario: labels, inputs y bordes con `--border` / `--muted` (si hay hex fijos, sustituir).
- Footer: texto muted legible en light.
- Grep: sin `#abb2bf`, `hover:text-white`, `text-zinc-*` en chrome UI.

**Verificar:**
- Recorrer home completa en light: Hero → Projects → Skills → About → Contact.
- Rutas `/projects`, `/about-me`, `/contact-me` en light.
- Dark sin regresiones visibles en esas mismas rutas.

**Commit sugerido:** `style: polish light contrast on hero about contact`

---

## FASE 5 — Atmósfera ligera (opcional)

**Objetivo:** Quitar la sensación de “plano gris” sin ensuciar el diseño.

**Qué hacer (elige una, no las dos a la vez al inicio):**
- **A)** Gradiente mínimo en `body` vía tokens `--atmosphere-from` / `--atmosphere-to` / `--atmosphere-image`.
- **B)** Patrón grid/puntos muy suave (opacidad 3–4%) fijo en body.

**Decisión v1:** opción **A**. En `.dark`, `--atmosphere-image: none` (fondo sólido, sin “suciedad”).

**Verificar:**
- No compite con el contenido ni con el naranja.
- Dark queda limpio (sin gradiente).

**Commit sugerido:** `style: subtle light theme atmosphere`

---

## FASE 6 — QA final

**Qué hacer:**
- Alternar light/dark 5–6 veces; recargar en cada uno (persistencia next-themes).
- Probar desktop y móvil (navbar hamburguesa + toggles).
- Probar con idioma ES y EN (no debe romper layout).
- `npm run lint` y `npm run build`.
- Checklist visual abajo.

**Commit sugerido:** solo si hubo fixes de QA; si no, no forzar commit vacío.

---

## Checklist final

- [x] `docs/` no está en `.gitignore`; los planes se pueden `git add`
- [x] Fondo light casi blanco / off-white, no gris medio
- [x] Navbar clara en light y oscura en dark
- [x] Links, ES|EN y tema legibles en ambos temas
- [x] Sin `#abb2bf` / `hover:text-white` en controles de chrome
- [x] Cards con `--surface` y sombra suave en light
- [x] Botones con buen contraste en hover light (`--on-secondary`)
- [x] Hero / About / Contact sin texto lavado / hex de chrome
- [x] `body` usa `color: rgb(var(--foreground))`
- [x] Skills mono-icons (Next, Express…) legibles en light (`--foreground`, no invert)
- [ ] Dark no regresionó (pase visual final)
- [ ] Build y lint OK

---

## Commits sugeridos (uno por paso)

1. Track `docs/` + planes (si aplica) — hecho
2. Tokens light (+ surface) — hecho
3. Navbar y toggles theme-aware — hecho
4. Surfaces y botones (+ `--on-secondary`, elevation) — hecho
5. Contraste Hero/About/Contact (+ skills mono, body color) — hecho
6. Atmósfera (opcional)
7. Fixes de QA (si hubo)

---

## Si algo se rompe

- Tokens raros: volver valores dark a los de antes del cambio y reabrir solo `:root`.
- Navbar ilegible: buscar hex fijos restantes con búsqueda en `Navbar`, `LanguageToggle`, `ThemeToogle`.
- Cards rotas: verificar `--surface`, `--border`, `--elevation-shadow` en `:root` y `.dark`.
- Botón hover ilegible: verificar `--on-secondary` (no uses `--background` como texto).
- Iconos negros invisibles en light: usar `.skill-chip__icon--mono`, no `filter: invert(1)` global.
- Build OK pero visual mal: comparar capturas light vs dark sección por sección.

---

## Tiempo estimado

| Bloque | Horas |
|--------|-------|
| Fase 0 (docs/git) | 0.25 h |
| Fase 1 (tokens) | 0.5–1 h |
| Fase 2 (navbar) | 0.5–1 h |
| Fase 3 (surfaces) | 1–1.5 h |
| Fase 4 (contraste) | 0.5–1 h |
| Fase 5 (atmósfera, opcional) | 0.5 h |
| Fase 6 (QA) | 0.5–1 h |
| **Total** | **~4–7 h** |

---

Última actualización: Julio 2026 — fases 0–4 aplicadas; body foreground + skills mono + form fields documentados.
