# Medios de proyectos

Cada proyecto tiene su carpeta en `public/projects/<nombre>/`.

- Imagenes en WebP (`cwebp` o ffmpeg con `-c:v libwebp -quality 80`), ~1200px de ancho maximo.
- `images[0]` e `images[1]` salen en la vista previa del listado; el resto, en el caso de estudio.
- Video opcional: `clip` (corto, sin audio, ~300px de ancho, para el listado) y `video` (completo, para el caso de estudio). Comprimidos a pocos MB.

Para agregar un proyecto, edita `projectCatalog` en `src/data/portfolio.ts` y los textos en `src/i18n/locales/`.
