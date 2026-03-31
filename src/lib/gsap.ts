import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Configuración global para todas las animaciones
gsap.defaults({
  ease: "power3.out",
  duration: 1
});

// Configuración por defecto de ScrollTrigger
ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  start: "top 80%",
  markers: false // Cambiar a true para debugging
});

export { gsap, ScrollTrigger, TextPlugin };
