# Plan i18n Español / Inglés — Portafolio

Guía paso a paso para agregar un botón ES | EN. Solo texto por fase, sin código.

---

## Antes de empezar

1. Crea una rama nueva llamada feat/i18n-es-en desde main. No trabajes directo en main.
2. Confirma que el proyecto corre bien con npm run dev y que npm run build termina sin errores.
3. Regla: una fase, un commit, probar en el navegador, y recién ahí la siguiente fase.
4. No cambies las URLs del sitio. Las rutas /projects, /about-me, etc. se quedan igual.
5. No traduzcas nombres de tecnologías, links, emails ni el nombre Denilson.

---

## Decisiones de arquitectura (v1)

Acuerdos fijados antes de implementar. No cambiar en v1 salvo que algo falle en pruebas.

### Metadata

- `layout.tsx` mantiene metadata **fija en español** (`export const metadata`).
- La **description de SEO** también queda fija; en un portafolio personal el impacto es mínimo.
- Crear **MetadataUpdater** (client component): al cambiar idioma, actualiza `document.title` con el título del diccionario activo.
- **No** usar cookie, middleware ni `generateMetadata` dinámico en v1 (sobrekill).

### Cambio de idioma con GSAP ya ejecutado

| Sección | Comportamiento |
|---------|----------------|
| **Hero** | Solo swap de textos. GSAP ya terminó al cargar → no reiniciar timeline. |
| **About** | Reinicio controlado: matar timeline, vaciar spans del typewriter, volver a animar con párrafos del idioma nuevo. Si la sección **no** está visible (fuera de viewport), mostrar texto final sin animar. |

**Regla:** Hero = swap de texto. About = reinicio controlado de GSAP.

### Tipado de diccionarios

- Tipar desde **es.json** como fuente de verdad: `Dictionary = typeof es`.
- **en.json** debe cumplir la misma forma (mismas claves).
- En v1 basta con eso; no hace falta librería de paths tipados.
- Al agregar una clave: **primero es.json, luego en.json**.

### Server vs client components

- **Footer** sigue siendo server component. Crear **FooterContent** (client) con `useTranslations` para el texto traducible.
- **MetadataUpdater** sigue el mismo patrón: pedazo mínimo en cliente, layout en servidor.
- No convertir `layout.tsx` entero en client component.

---

## FASE 0 — Preparación

**Objetivo:** Crear la carpeta de idiomas sin tocar nada que ya funciona.

**Qué hacer:**
- Crear la carpeta src/i18n con una subcarpeta locales.
- Crear un archivo de configuración con los idiomas soportados: español e inglés, siendo español el default.
- Crear dos archivos JSON: es.json y en.json, con la estructura mínima de navegación solamente.
- Crear un archivo que cargue el JSON correcto según el idioma activo.
- Exportar tipo `Dictionary` desde es.json (`typeof es`).

**Verificar:**
- TypeScript compila sin errores.
- La página se ve exactamente igual que antes.

**Commit sugerido:** chore i18n — estructura inicial de carpetas.

---

## FASE 1 — Provider de idioma

**Objetivo:** Tener un estado global del idioma en toda la app, igual que el tema claro/oscuro.

**Qué hacer:**
- Crear LocaleProvider en la carpeta de providers, siguiendo el mismo patrón que ThemeProvider.
- El provider debe guardar el idioma en localStorage para que se recuerde al recargar.
- Al cambiar idioma, actualizar el atributo lang del HTML (es o en).
- Envolver toda la app con LocaleProvider en layout.tsx, por fuera de ThemeProvider.
- Evitar flash de idioma incorrecto al cargar: no renderizar contenido dependiente del idioma hasta que el componente esté montado en el cliente.

**Verificar:**
- La página se ve igual.
- No hay errores en consola del navegador.

**Commit sugerido:** feat i18n — LocaleProvider con persistencia.

---

## FASE 2 — Botón ES | EN

**Objetivo:** Botón visible en el Navbar para cambiar idioma.

**Qué hacer:**
- Crear LanguageToggle en la carpeta ui, con el mismo cuidado de hidratación que ThemeToggle.
- Diseño: dos opciones ES y EN, la activa resaltada con el color secondary dorado del portafolio.
- Colocarlo en Navbar junto al botón de tema, en desktop y en menú móvil.
- Agregar etiqueta de accesibilidad para lectores de pantalla.

**Verificar:**
- El botón se ve en desktop y móvil.
- Al hacer clic cambia el idioma guardado en localStorage.
- Al recargar la página se mantiene el idioma elegido.

**Commit sugerido:** feat i18n — botón de idioma en Navbar.

---

## FASE 3 — Diccionarios completos

**Objetivo:** Tener todos los textos en es.json y en.json antes de tocar componentes.

**Qué hacer:**
- Completar es.json y en.json con la misma estructura en ambos archivos.
- Secciones del JSON: metadata, nav, footer, hero, sections, projects, skills, about, contact, form.
- Incluir descripciones de cada proyecto por id.
- Incluir los tres párrafos del About para el typewriter.
- Incluir nombres traducidos de categorías de Skills con **claves estables** (`languages`, `frontend`, `mobile`, etc.) y etiqueta traducida por idioma.
- Incluir clave `metadata.title` en ambos JSON (valor traducido por idioma); la description solo en layout, no dinámica.
- Español: traducir lo que hoy está en inglés en Hero, Contact, formulario, etc.
- Inglés: usar los textos que ya tienes en el código actual.
- Regla de tipado: toda clave nueva va primero a es.json, luego a en.json.

**Verificar:**
- Ambos JSON tienen las mismas claves (TypeScript debe aceptar en.json como `Dictionary`).
- Los JSON son válidos.
- TypeScript compila.

**Commit sugerido:** feat i18n — diccionarios es y en completos.

---

## FASE 4 — Hook de traducción

**Objetivo:** Forma simple de leer textos desde cualquier componente cliente.

**Qué hacer:**
- Crear useTranslations que devuelva el diccionario tipado (`Dictionary`), el locale actual y la función para cambiar idioma.
- Los componentes cliente usarán este hook; los de servidor no lo necesitan en la v1 (FooterContent, MetadataUpdater, etc.).

**Verificar:**
- El hook existe pero aún no es obligatorio migrar todos los componentes.

**Commit sugerido:** feat i18n — hook useTranslations.

---

## FASE 5 — Migrar componentes (uno por uno)

Migrar en este orden. Probar en navegador y hacer commit después de cada uno.

### 5.1 Navbar
- Reemplazar home, projects, about-me, contacts por textos del diccionario.
- Probar cambio ES/EN en los links.

### 5.2 Footer
- Mantener Footer.tsx como server component.
- Crear FooterContent (client) con useTranslations para el rol o descripción profesional.
- Footer importa y renderiza FooterContent dentro del markup existente.

### 5.3 Hero
- Traducir título, Available, Biography, bio corta, Download CV, Contact me.
- Confirmar que las animaciones GSAP del Hero siguen funcionando al cargar.
- Al cambiar idioma: **solo actualizar textos** en el DOM; no reiniciar timeline GSAP.
- Probar cambio ES/EN con Hero ya visible (debe verse bien sin re-animación).

### 5.4 Projects
- Traducir título de sección y enlace Leer más.
- Separar en portfolio.ts los datos fijos (imágenes, links, tecnologías) de los textos traducibles (título y descripción).
- Crear función que devuelva proyectos según idioma.
- ProjectCard debe mostrar textos del idioma activo.

### 5.5 Skills
- Traducir título de sección.
- Traducir solo nombres de categorías, no nombres de tecnologías.

### 5.6 About (cuidado con GSAP)
- Mover párrafos del typewriter al JSON de idiomas.
- AboutSection debe usar textos del diccionario en placeholders y animación.
- Al cambiar idioma (reinicio controlado):
  1. Matar timeline GSAP activo.
  2. Vaciar contenido de los tres spans del typewriter.
  3. Si la sección está visible en viewport → volver a animar con párrafos del idioma nuevo.
  4. Si la sección no está visible → mostrar texto final completo sin animar.
- Añadir `locale` a dependencias del hook de typewriter para que reaccione al cambio.
- Probar typewriter en español e inglés.
- Probar cambiar idioma mientras la sección está visible y mientras está fuera de pantalla.

### 5.7 Contact y formulario
- Traducir Contact.tsx y ContactFormSection.tsx.
- Traducir ContactForm: labels, placeholders, botón, mensajes de éxito y error.

### 5.8 Metadata
- Dejar `export const metadata` en layout.tsx **fijo en español** (title + description).
- Crear MetadataUpdater (client): montarlo en layout dentro de LocaleProvider; en mount y al cambiar locale, asignar `document.title` desde `metadata.title` del diccionario activo.
- No tocar meta description en cliente; impacto SEO mínimo en v1.
- Probar: pestaña en ES al cargar, cambio a EN actualiza título, recarga mantiene idioma y título correcto.

---

## FASE 6 — API de contacto (opcional)

**Objetivo:** Mensajes de error del formulario coherentes con el idioma.

**Qué hacer:**
- Opción simple: mensajes bilingües en la API.
- Opción mejor: el formulario envía el idioma y la API responde en ese idioma.

No es bloqueante para la primera versión.

---

## FASE 7 — Pulido final

**Qué hacer:**
- Revisar accesibilidad del botón de idioma.
- Probar tema claro y oscuro en ambos idiomas.
- Probar en móvil: menú hamburguesa y toggle de idioma.
- Ejecutar npm run build y npm run lint.
- Recorrer todo el sitio buscando textos mezclados español/inglés.
- Probar rutas internas: /projects, /about-me, /contact-me (reutilizan las mismas secciones).

---

## FASE 8 — Subir a main

**Qué hacer:**
- Merge de feat/i18n-es-en a main.
- npm run build una última vez.
- Push a GitHub.

---

## Checklist final

- Botón ES/EN en desktop y móvil
- Navbar traducido
- Hero traducido y animación OK
- Projects con descripciones por idioma
- Skills con categorías traducidas
- About typewriter en ambos idiomas
- Cambiar idioma durante About no rompe nada (timeline reinicia o texto estático si no visible)
- Cambiar idioma en Hero solo actualiza textos, sin re-animar GSAP
- Contact y formulario traducidos
- Idioma persiste al recargar
- html lang correcto
- document.title cambia con el idioma (MetadataUpdater)
- metadata estática en layout sigue en español (esperado en v1)
- Build pasa sin errores
- Sin textos mezclados en ninguna sección

---

## Si algo se rompe

- Cambios sin commit: git checkout para descartar.
- Volver atrás: checkout a main.
- Un commit malo: git revert al commit problemático.

---

## Errores comunes

| Problema | Solución |
|----------|----------|
| Error de Provider | Verificar que layout envuelve todo con LocaleProvider |
| Página distinta al recargar | Usar patrón mounted como en ThemeToggle |
| About roto al cambiar idioma | Matar timeline, vaciar spans, re-animar si visible; si no, texto final |
| Hero parpadea al cambiar idioma | No reiniciar GSAP; solo cambiar textos en React |
| Texto undefined | Misma clave en es.json y en.json; agregar claves primero en es.json |
| Título de pestaña no cambia | Verificar MetadataUpdater dentro de LocaleProvider |
| Build falla por Resend | Falta .env — no relacionado con i18n |

---

## Qué NO hacer en la v1

- No instalar next-intl todavía.
- No usar cookie, middleware ni generateMetadata dinámico para i18n.
- No cambiar rutas URL a español.
- No convertir layout.tsx o Footer entero en client component.
- No duplicar imágenes por idioma.
- No poner textos sueltos en muchos archivos: solo en es.json y en.json.
- No migrar todos los componentes de una sola vez.

---

## Tiempo estimado

| Bloque | Horas |
|--------|-------|
| Fases 0–2 (infra + botón) | 2–3 h |
| Fases 3–4 (JSON + hook) | 2–3 h |
| Fase 5 (componentes) | 4–6 h |
| Fases 6–7 (API + pulido) | 1–2 h |
| **Total** | **9–14 h** |

---

## Commits sugeridos (uno por paso)

1. Estructura inicial i18n
2. LocaleProvider
3. Botón LanguageToggle
4. Diccionarios completos
5. Hook useTranslations
6. Navbar traducido
7. Footer traducido
8. Hero traducido
9. Projects traducido
10. Skills traducido
11. About con soporte GSAP
12. Contact y formulario
13. MetadataUpdater (document.title dinámico)

---

Última actualización: Junio 2026 — Next.js 16, App Router, animaciones GSAP. Decisiones de arquitectura v1 documentadas.
