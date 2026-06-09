# Imágenes de proyectos

Coloca aquí las capturas de cada proyecto en su propia carpeta.

## Estructura

```
public/projects/
├── control-asistencia/
│   ├── cover.png      ← se muestra primero
│   └── dashboard.png  ← aparece al pasar el mouse (carrusel)
└── otro-proyecto/
    ├── cover.png
    └── screen-2.png
```

## Cómo agregar un proyecto

1. Crea una carpeta con el nombre del proyecto (sin espacios, usa guiones).
2. Guarda tus imágenes dentro (PNG o JPG, recomendado ~1200px de ancho).
3. Edita `src/data/portfolio.ts` y agrega un objeto en el array `projects`:

```ts
{
  id: 2,
  title: "Mi App",
  description: "Descripción corta del proyecto.",
  images: [
    "/projects/mi-app/cover.png",
    "/projects/mi-app/screen-2.png",
  ],
  technologies: [{ name: "React Native" }],
  github: "https://github.com/tu-usuario/mi-app",
}
```

- `images`: mínimo 1 imagen. Con 2 o más, al pasar el mouse rota como carrusel.
- En móvil, toca la imagen para cambiar de captura.
