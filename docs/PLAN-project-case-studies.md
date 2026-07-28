# Plan case studies de proyectos — Portafolio

Guía paso a paso para que cada proyecto tenga una página propia (motivo, overview, aprendizajes), sin romper i18n, la galería scrub ni el diseño actual. Solo texto por fase, sin código en este documento.

---

## Antes de empezar

1. **Rama:** en equipo, `feat/project-case-studies`. En proyecto personal solo, se puede trabajar directo en `main` (más rápido; commits chicos igual).
2. Confirma `npm run dev` y que `/projects` muestra las cards con scrub y botones Github/Demo.
3. Regla: una fase, un commit, probar en el navegador, luego la siguiente.
4. No cambies el look general del sitio (tokens, tipografía mono, navbar). Reutiliza componentes existentes (`ProjectGallery`, `.btn`, `.project-card__link`, `Titulo` solo si encaja).
5. No traduzcas nombres de tecnologías, URLs de Github/Demo, ni el `slug`.
6. No metas certificados ni idiomas en este plan (van en CV / otro trabajo).

---

## Progreso

| Fase | Estado |
|------|--------|
| 0 Preparación | Hecho (main; slugs + borrador copy) |
| 1 Slugs + helpers | Hecho |
| 2 Diccionarios | Hecho |
| 3 Página + plantilla | Hecho |
| 4 Card CTA | Hecho |
| 5 Next + a11y | Pendiente |
| 6 QA | Pendiente |

### Slugs definitivos (Fase 0)

| id | Título | slug |
|----|--------|------|
| 1 | BusControl QR | `buscontrol-qr` |
| 2 | E-Commerce App | `ecommerce-app` |

### Borrador de copy (pegar en JSON en Fase 2)

Ajustable al implementar; sirve de base.

#### id 1 — BusControl QR (`buscontrol-qr`)

**ES**
- **motivation:** En el transporte escolar municipal el control de asistencia suele ser manual, lento y fácil de perder. Quise construir una app que permitiera registrar subidas y bajadas con QR (y respaldo manual), con viajes de ida/vuelta y un historial confiable en tiempo real para quienes coordinan las rutas.
- **overview:** BusControl QR es una app móvil (Expo / React Native) conectada a Supabase. El personal puede escanear códigos, registrar asistencia a mano cuando hace falta y seguir el estado de cada viaje sin depender de hojas sueltas.
- **highlights:** Escaneo QR · Registro manual de respaldo · Viajes ida/vuelta · Trazabilidad en tiempo real con Supabase
- **approach:** Elegí Expo para iterar rápido en móvil y Supabase para auth/datos sin armar un backend desde cero. El foco estuvo en el flujo de asistencia real, no en features de más.
- **learnings:** Modelar viajes y asistencia en tiempo real · Priorizar UX offline/manual cuando el QR falla · Separar bien el rol operativo del historial

**EN**
- **motivation:** School municipal transport often tracks attendance by hand—slow and easy to lose. I wanted an app to log boardings with QR (plus manual fallback), support round trips, and keep a reliable real-time history for route coordinators.
- **overview:** BusControl QR is a mobile app (Expo / React Native) backed by Supabase. Staff can scan codes, fall back to manual entry, and follow each trip without paper sheets.
- **highlights:** QR scanning · Manual fallback · Round-trip trips · Real-time traceability with Supabase
- **approach:** Expo for fast mobile iteration; Supabase for data/auth without a custom backend. Focus stayed on the real attendance flow, not extra features.
- **learnings:** Modeling trips and attendance in real time · Prioritizing manual fallback when QR fails · Keeping ops flow separate from history

#### id 2 — E-Commerce App (`ecommerce-app`)

**ES**
- **motivation:** Quería practicar un flujo de e-commerce completo (catálogo → carrito → checkout) con stack moderno de front, para entender bien estado del carrito, UI responsiva y cómo se conectaría una pasarela de pagos.
- **overview:** Aplicación web de comercio electrónico con listado de productos, carrito de compras y preparación para pasarela de pagos, construida con React, TypeScript y Tailwind.
- **highlights:** Catálogo de productos · Carrito de compras · Enfoque en UI responsiva · Base lista para integrar pagos
- **approach:** React + TypeScript para tipar el dominio del carrito; Tailwind para iterar UI rápido. El demo prioriza la experiencia de compra sobre un backend pesado.
- **learnings:** Estado de carrito y límites de UX · Componentizar bien listados y checkout · Separar UI de la futura integración de pagos

**EN**
- **motivation:** I wanted to practice a full e-commerce flow (catalog → cart → checkout) with a modern front-end stack—cart state, responsive UI, and how a payment gateway would plug in.
- **overview:** A web storefront with product listing, shopping cart, and a path toward payment integration, built with React, TypeScript, and Tailwind.
- **highlights:** Product catalog · Shopping cart · Responsive UI focus · Ready base for payments
- **approach:** React + TypeScript to type cart domain; Tailwind for fast UI iteration. The demo prioritizes the buying experience over a heavy backend.
- **learnings:** Cart state and UX edges · Componentizing listings and checkout · Keeping UI separate from future payment wiring

---

## Análisis del estado actual

### Qué hay hoy

| Pieza | Estado |
|-------|--------|
| Lista `/projects` + grid en home | Cards con título, Github, Demo, galería scrub, descripción corta, tags |
| Datos fijos | `projectCatalog` en `portfolio.ts` (`id`, `type`, `images`, `technologies`, `github`, `demo`) |
| Textos | `es.json` / `en.json` → `projects.items["1"|"2"]` con `title` + `description` |
| Fusión | `getProjects(locale)` une catálogo + diccionario |
| Tipos | `Project` en `types/index.ts` y `types/porfolio.d.ts` (duplicados; unificar en una fase) |
| Rutas App Router | `/`, `/projects`, `/about-me`, `/contact-me` — **no** existe `/projects/[slug]` |
| Card CTA al detalle | **No existe** (solo Github/Demo externos) |

### Problema de producto

La card solo muestra un resumen. No hay lugar para: por qué se hizo el proyecto, decisiones, aprendizajes. Quien quiera esa historia no la encuentra sin ir al repo (y el repo no cuenta el “por qué” del portafolio).

### Decisiones de UX ya acordadas (no reabrir en v1)

| Tema | Decisión |
|------|----------|
| Destino del case study | Página propia `/projects/[slug]`, no modal |
| Github / Demo | Siguen siendo links **externos** |
| Entrada al case study | Botón **Ver caso** + título como link (mismo destino) |
| Card / galería entera clickeable | **No** — el scrub del mouse chocaría con la navegación |
| Misma estructura para todos | Una plantilla; secciones vacías no se renderizan |
| Idioma en URL | **No** — slug estable en inglés kebab-case |

### Riesgos si se hace mal

| Riesgo | Mitigación |
|--------|------------|
| Duplicar un `page.tsx` por proyecto | Una sola ruta dinámica + un componente plantilla |
| Meter textos largos en `portfolio.ts` | Solo en diccionarios i18n |
| Slug = título traducido | `slug` fijo en catálogo |
| Card clickeable + scrub | Solo título + botón “Ver caso” |
| Tipos `Project` duplicados | Unificar en `types/index.ts` (o un solo archivo) en fase de datos |
| `notFound` sin cuidar | `generateStaticParams` + `notFound()` de Next |

---

## Decisiones de arquitectura (v1)

### Rutas

| Ruta | Rol |
|------|-----|
| `/projects` | Listado (como ahora) |
| `/projects/[slug]` | Case study de un proyecto |
| `/` (sección Projects) | Cards con CTA al case study; “Leer más” de sección sigue yendo a `/projects` |

Ejemplos de slug:

- BusControl QR → `buscontrol-qr`
- E-Commerce App → `ecommerce-app`

### Identificadores

- **`id`**: número interno (sigue sirviendo de clave en JSON `items["1"]`).
- **`slug`**: string estable para la URL y `getProjectBySlug`.
- Lookup: `getProjectBySlug(locale, slug)` → proyecto completo o `null`.

Opcional v1: mantener clave JSON por `id` (`"1"`, `"2"`) y mapear desde el catálogo; no hace falta renombrar las claves del JSON a slug (menos churn). Alternativa válida: claves JSON = slug. **Decisión v1: claves por `id` numérico string**, catálogo lleva `slug`.

### Modelo de datos

**Catálogo (código, no i18n):**

| Campo | Tipo | Notas |
|-------|------|--------|
| `id` | number | Clave al diccionario |
| `slug` | string | URL |
| `type` | `"mobile" \| "web"` | Galería |
| `images` | string[] | `/public/...` |
| `technologies` | `{ name }[]` | Sin traducir |
| `github` / `demo` | string? | Externos |

**Diccionario por item (`projects.items[id]`):**

| Campo | Uso | Obligatorio |
|-------|-----|-------------|
| `title` | Card + página | Sí |
| `description` | Card (teaser corto) | Sí |
| `motivation` | Sección “Por qué lo hice” | Sí |
| `overview` | Sección “Qué hace” | Sí |
| `highlights` | string[] bullets bajo overview | Recomendado (puede `[]`) |
| `approach` | Sección “Cómo lo armé” | Opcional (omitir sección si vacío) |
| `learnings` | string[] “Qué aprendí” | Recomendado |

**UI copy compartida (`projects` en JSON, fuera de items):**

| Clave | Ejemplo ES |
|-------|------------|
| `viewCase` | Ver caso |
| `backToProjects` | ← Proyectos |
| `sectionMotivation` | Por qué lo hice |
| `sectionOverview` | Qué hace |
| `sectionApproach` | Cómo lo armé |
| `sectionLearnings` | Qué aprendí |
| `nextProject` | Siguiente proyecto |
| `typeMobile` / `typeWeb` | Móvil / Web (opcional en header) |

Más las existentes: `readMore`, `github`, `demo`.

### Tipo TypeScript

Extender `Project` (un solo archivo de tipos):

- Campos actuales + `slug: string`
- Campos de case study resueltos por locale: `motivation`, `overview`, `highlights`, `approach?`, `learnings`

`getProjects(locale)` y `getProjectBySlug(locale, slug)` devuelven ese tipo completo.

### Componentes

| Pieza | Responsabilidad |
|-------|-----------------|
| `app/projects/[slug]/page.tsx` | Server: resolver slug, `notFound`, pasar props |
| `ProjectCaseStudy` (client o server+client islands) | Plantilla única del layout del caso |
| `ProjectCard` | Título `Link`, botón Ver caso, Github/Demo sin cambiar rol |
| `ProjectGallery` | **Sin cambios de navegación** (scrub intacto) |
| `getProjectBySlug` / `getAllProjectSlugs` | En `data/portfolio.ts` |

**Server vs client:** la página puede ser Server Component que lee diccionario con `getDictionary` + locale… pero el locale hoy vive en **cliente** (`LocaleProvider` / localStorage).

**Implicación v1 (importante):**

Como i18n v1 no usa cookie/middleware, el case study debe ser **Client Component** (o un wrapper client) que use `useTranslations` / `getProjects` / `getProjectBySlug` igual que `ProjectsSection`. Así ES/EN sigue funcionando al cambiar idioma **dentro** de la página del caso.

No introducir middleware solo por esto en v1.

### SEO / metadata v1

- `generateMetadata` dinámico por slug: **opcional / diferido**.
- Mínimo: título de pestaña vía `MetadataUpdater` no cubre rutas dinámicas por proyecto.
- v1 aceptable: metadata estática de layout + `document.title` manual en el case study client al montar (`title` del proyecto), o dejar el title del layout.
- **Decisión v1:** al montar `ProjectCaseStudy`, setear `document.title` a `"{project.title} · Denilson"` (y restaurar o dejar que MetadataUpdater/locale lo corrija al salir no es crítico). No bloquear el feature por SEO perfecto.

### Plantilla visual (orden fijo)

```
[ backToProjects → /projects ]

# {title}                         [Github?] [Demo?]
[chip type?]   tech · tech · tech

[ ProjectGallery — mismo scrub ]

## sectionMotivation
{motivation}

## sectionOverview
{overview}
• highlights…

## sectionApproach          ← solo si approach no vacío
{approach}

## sectionLearnings
• learnings…

[Github?] [Demo?]     [ nextProject → siguiente slug ]
```

Estilo: tipografía y tokens actuales; secciones con `#` / título simple coherente con el sitio (no inventar un design system nuevo). Espaciado generoso, una columna max-width como el resto (`max-w-6xl`).

### Navegación “siguiente proyecto”

Orden = orden del `projectCatalog`. Circular o lineal al primero: **v1 lineal con wrap** (después del último → primero).

---

## Qué NO hacer en v1

- Modal / drawer en lugar de ruta.
- Card o galería enteras como link.
- MDX / CMS / archivos `.md` por proyecto (overkill con 2 proyectos).
- Rutas `/es/projects/...`.
- Duplicar plantillas por proyecto.
- Animaciones GSAP nuevas obligatorias en el case study (opcional fade mínimo después).
- Certificados o sección idiomas.
- `generateStaticParams` + SSR locale por cookie (fuera de i18n v1).

---

## FASE 0 — Preparación

**Objetivo:** Baseline OK y copy/slugs listos (sin bloquear por rama si trabajas solo en `main`).

**Qué hacer:**
- Usar `main` (personal) o `feat/project-case-studies` (si prefieres aislar).
- Fijar slugs definitivos (ver tabla en Progreso).
- Dejar borrador ES/EN de motivation/overview/etc. en este plan (listo para Fase 2).

**Verificar:**
- Working tree limpio al empezar Fase 1.
- Slugs y borrador documentados.

**Estado:** Hecho en `main` — slugs + borrador en este documento.

**Commit sugerido:** `docs: complete case studies phase 0 (slugs and copy draft)`

---

## FASE 1 — Modelo: slug + helpers

**Objetivo:** Datos listos para enrutar, sin UI nueva todavía.

**Qué hacer:**
- Añadir `slug` a cada item de `projectCatalog`.
- Unificar tipo `Project` (eliminar divergencia `porfolio.d.ts` vs `index.ts` si aún existe).
- Implementar `getAllProjectSlugs()` y `getProjectBySlug(locale, slug)`.
- `getProjects` sigue igual en firma; incluye `slug` en el objeto devuelto.

**Verificar:**
- TypeScript compila.
- En consola/test manual mental: slug `buscontrol-qr` resuelve id 1.

**Commit sugerido:** `feat(projects): add slugs and getProjectBySlug`

---

## FASE 2 — Diccionarios case study

**Objetivo:** Textos largos ES/EN antes de la página.

**Qué hacer:**
- Extender cada `projects.items.*` con `motivation`, `overview`, `highlights`, `approach`, `learnings`.
- Añadir claves UI: `viewCase`, `backToProjects`, `sectionMotivation`, `sectionOverview`, `sectionApproach`, `sectionLearnings`, `nextProject` (+ type labels si aplica).
- Regla i18n: **primero `es.json`, luego `en.json`**, mismas claves.
- Actualizar `getProjects` / `getProjectBySlug` para mapear los campos nuevos.
- `description` de card se queda **corta**; no pegar el motivation ahí.

**Verificar:**
- `Dictionary` acepta ambos JSON.
- Sin claves undefined al leer un proyecto.

**Commit sugerido:** `feat(i18n): add project case study copy ES/EN`

---

## FASE 3 — Página dinámica + plantilla

**Objetivo:** `/projects/[slug]` renderiza el caso completo.

**Qué hacer:**
- Crear `src/app/projects/[slug]/page.tsx`.
- Crear `ProjectCaseStudy` (client) que:
  - Lea `slug` (prop desde page o `useParams`).
  - Resuelva proyecto con locale activo.
  - Si no existe → UI “no encontrado” + link a `/projects` (o `notFound()` si se resuelve en server; con client, manejar null).
  - Renderice la plantilla de secciones.
  - Reutilice `ProjectGallery`.
  - `document.title` opcional al montar.
- Estilos: CSS módulo o clases en `projects.css` con prefijo `project-case__*` (tokens, sin hex).

**Verificar:**
- `/projects/buscontrol-qr` y `/projects/ecommerce-app` OK.
- Slug inventado: mensaje o 404 amable.
- Cambio ES ↔ EN actualiza textos del caso sin recargar a ciegas.
- Light/dark se ven bien.

**Commit sugerido:** `feat(projects): add project case study pages`

---

## FASE 4 — Card: título + Ver caso

**Objetivo:** Entrada clara sin romper la galería.

**Qué hacer:**
- `ProjectCard`: envolver título en `Link` a `/projects/{slug}`.
- Añadir botón/link `viewCase` (estilo alineado a `.project-card__link` o `.btn` pequeño) → mismo href.
- Github / Demo: sin cambios de comportamiento (`target="_blank"`, `rel="noopener noreferrer"`).
- **No** poner `Link` envolviendo la card ni la galería.
- Asegurar que el click en dots/scrub no navegue.

**Verificar:**
- Scrub sigue funcionando.
- Click en Ver caso / título abre el caso.
- Click Github/Demo abre externo.
- Home y `/projects` iguales en comportamiento.

**Commit sugerido:** `feat(projects): link cards to case studies`

---

## FASE 5 — Navegación entre casos + a11y

**Objetivo:** Flujo completo entre proyectos.

**Qué hacer:**
- Bloque inferior: anterior/siguiente o solo “Siguiente proyecto” con título.
- `backToProjects` arriba.
- Focus visible en links nuevos.
- `aria-label` en Ver caso si el texto solo no basta en algún idioma.
- Revisar headings: un `h1` en el caso; secciones `h2`.

**Verificar:**
- Teclado: tab a Ver caso, Enter, back, siguiente.
- Lector de pantalla: estructura de headings coherente.

**Commit sugerido:** `feat(projects): case study prev/next and a11y`

---

## FASE 6 — QA final

**Qué hacer:**
- Recorrer home → Ver caso → back → otro proyecto.
- ES y EN en la página del caso.
- Light y dark.
- Móvil: scrub + botones sin overlap.
- `npm run lint` y `npm run build`.
- Checklist abajo.

**Commit sugerido:** solo fixes de QA si los hay.

---

## Checklist final

- [ ] `/projects/[slug]` existe para cada proyecto del catálogo
- [ ] Slug estable, independiente del idioma
- [ ] Plantilla única; approach opcional no deja huecos feos
- [ ] Card: Ver caso + título link; galería no navega
- [ ] Github / Demo siguen externos
- [ ] Copy case study en ES y EN
- [ ] `getProjectBySlug` + slugs inválidos manejados
- [ ] Siguiente proyecto funciona
- [ ] Tema claro/oscuro OK en el caso
- [ ] Build y lint OK
- [ ] Tipos `Project` unificados

---

## Commits sugeridos (uno por paso)

1. Docs del plan (si se versiona aparte)
2. Slugs + helpers
3. Diccionarios case study
4. Página + plantilla `ProjectCaseStudy`
5. Links en card (Ver caso + título)
6. Next/back + a11y
7. Fixes QA

---

## Contenido: guía rápida al escribir cada caso

| Sección | Pregunta a responder | Longitud guía |
|---------|----------------------|---------------|
| `description` (card) | ¿Qué es en una frase? | 1–2 frases |
| `motivation` | ¿Qué problema / por qué lo hice? | ~80–150 palabras |
| `overview` | ¿Qué puede hacer el usuario? | ~60–120 palabras |
| `highlights` | 3 logros o features | 3–5 bullets |
| `approach` | ¿Por qué ese stack / qué costo? | Corto o vacío |
| `learnings` | ¿Qué me llevo? | 2–4 bullets |

Tono: primera persona, concreto, sin relleno de marketing.

---

## Si algo se rompe

| Problema | Qué mirar |
|----------|-----------|
| Texto `undefined` | Misma clave en `es.json` y `en.json`; map en `getProjectBySlug` |
| Scrub abre el caso | Link no debe envolver la galería |
| Idioma no cambia en el caso | Página/plantilla debe usar `useTranslations` / locale |
| 404 en slug válido | `slug` en catálogo vs URL; typo |
| Build falla tipos | Unificar `Project`; regenerar `Dictionary` desde es.json |

---

## Tiempo estimado

| Bloque | Horas |
|--------|-------|
| Fase 0–1 (prep + slugs) | 0.5–1 h |
| Fase 2 (copy JSON) | 1–2 h (según redacción) |
| Fase 3 (página + plantilla) | 1.5–2.5 h |
| Fase 4 (card CTA) | 0.5 h |
| Fase 5 (next + a11y) | 0.5–1 h |
| Fase 6 (QA) | 0.5–1 h |
| **Total** | **~5–8 h** |

---

## Relación con otros planes

| Plan | Relación |
|------|----------|
| `PLAN-i18n-ES-EN.md` | Case study respeta locale client-side; no introduce middleware |
| `PLAN-tema-claro.md` | Case study usa tokens (`surface`, `border`, `text-muted`, etc.) |
| Galería scrub | No se modifica el modelo de interacción; solo se reutiliza el componente |

---

Última actualización: Julio 2026 — Next.js 16 App Router, i18n client (`LocaleProvider`), galería full-bleed + scrub. Decisiones UX de entrada (Ver caso + título, no card clickeable) fijadas en v1.
