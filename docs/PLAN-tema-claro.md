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
| `--muted` | Texto secundario, bordes suaves | Gris medio legible (~100, 105, 115) |
| `--secondary` | Acento naranja | Un poco más cerrado que en dark (mejor contraste en claro) |
| `--surface` | **Nuevo.** Cards, paneles, navbar | Blanco puro (~255, 255, 255) |
| `--border` | **Nuevo opcional.** Bordes | Negro al ~10% de opacidad o RGB gris claro |

Dark: conservar valores actuales; solo añadir `--surface` / `--border` equivalentes para no romper CSS nuevo.

### Navbar

- En light: fondo `--surface` (o blanco semitransparente + `backdrop-blur`) + borde inferior sutil.
- En dark: mantener aspecto actual (`#282c33` o token equivalente).
- **Cero** hex fijos de UI (`#abb2bf`, `hover:text-white`) en Navbar, LanguageToggle y ThemeToggle.
- Usar solo tokens: `text-muted`, `text-foreground`, `text-secondary`, hover a foreground.

### Profundidad

- Cards / paneles sobre `--surface`, no sobre el mismo gris del body.
- Sombra suave en light (gris, no solo glow naranja).
- Botones `.btn`: en light, hover con texto que contraste (blanco o foreground oscuro), no el color del background gris.

### Atmósfera (fase opcional al final)

- Gradiente muy suave en `body`, o grid/puntos al 3–4% de opacidad.
- No meter púrpura, cream/terracotta ni otro look genérico.
- Mantener identidad: mono + naranja + estética “dev”.

### Qué NO hacer en v1

- No cambiar fuentes ni el layout de secciones.
- No rehacer animaciones GSAP.
- No tocar copy ni i18n.
- No convertir el sitio a “cards everywhere” en el hero.
- No usar `dark:` de Tailwind con colores hardcodeados para piezas nuevas: preferir CSS variables.

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
- `projects.css` / `skills.css`: fondo de cards con `--surface`; bordes con muted o `--border`.
- Hover light: sombra gris suave (`rgba(0,0,0,0.08)` aprox.) además del acento naranja.
- Revisar `.btn` en `globals.css`: color de texto en hover debe contrastar en light (p. ej. blanco o foreground fijo de contraste), no `rgb(var(--background))` si background es claro.
- Revisar sombras `.custom-shadow` si se usan en light (hoy `0.6` es muy dura/oscurasolo-dark).

**Verificar:**
- Cards se leen como paneles sobre el fondo, no “dibujadas” en el mismo gris.
- Botones outline: hover agradable en light y dark.
- Skills chips/cards coherentes con projects.

**Commit sugerido:** `style: surfaces and button contrast for light theme`

---

## FASE 4 — Hero, About y detalles de contraste

**Objetivo:** Ajustar piezas sueltas que aún se vean lavadas o con mal contraste.

**Qué hacer:**
- Hero: tipografía secondary sobre el nuevo fondo; si el naranja falla WCAG-ish, cerrar un poco más `--secondary` en light (ya definido en fase 1; solo afinar).
- About: foto/texto con suficiente separación del fondo; botón “Leer más” coherente con `.btn`.
- Contact / formulario: labels, inputs y bordes con tokens (si hay hex fijos, sustituir).
- Footer: texto muted legible en light.

**Verificar:**
- Recorrer home completa en light: Hero → Projects → Skills → About → Contact.
- Rutas `/projects`, `/about-me`, `/contact-me` en light.
- Ningún texto `#abb2bf` o `text-white` hardcodeado en UI cromática (grep rápido).

**Commit sugerido:** `style: polish light contrast on hero about contact`

---

## FASE 5 — Atmósfera ligera (opcional)

**Objetivo:** Quitar la sensación de “plano gris” sin ensuciar el diseño.

**Qué hacer (elige una, no las dos a la vez al inicio):**
- **A)** Gradiente mínimo en `body` (p. ej. arriba un pelo más claro, abajo un pelo más frío), o
- **B)** Patrón grid/puntos muy suave (opacidad 3–4%) fijo en body.

**Verificar:**
- No compite con el contenido ni con el naranja.
- Dark no queda “sucio”; si molesta en dark, limitar el efecto a `:root` sin `.dark`.

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

- [ ] `docs/` no está en `.gitignore`; los planes se pueden `git add`
- [ ] Fondo light casi blanco / off-white, no gris medio
- [ ] Navbar clara en light y oscura en dark
- [ ] Links, ES|EN y tema legibles en ambos temas
- [ ] Sin `#abb2bf` / `hover:text-white` en controles de chrome
- [ ] Cards con `--surface` y sombra suave en light
- [ ] Botones con buen contraste en hover light
- [ ] Hero / About / Contact sin texto lavado
- [ ] Dark no regresionó
- [ ] Build y lint OK

---

## Commits sugeridos (uno por paso)

1. Track `docs/` + planes (si aplica)
2. Tokens light (+ surface)
3. Navbar y toggles theme-aware
4. Surfaces y botones
5. Contraste Hero/About/Contact
6. Atmósfera (opcional)
7. Fixes de QA (si hubo)

---

## Si algo se rompe

- Tokens raros: volver valores dark a los de antes del cambio y reabrir solo `:root`.
- Navbar ilegible: buscar hex fijos restantes con búsqueda en `Navbar`, `LanguageToggle`, `ThemeToogle`.
- Cards rotas: revisar que `--surface` exista en `:root` y `.dark`.
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

Última actualización: Julio 2026 — Next.js 16, next-themes, tokens en `globals.css`.
