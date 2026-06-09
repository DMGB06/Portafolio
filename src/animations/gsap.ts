import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.defaults({
  ease: "power3.out",
  duration: 1,
});

ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  start: "top 80%",
  markers: false,
});

export { gsap, ScrollTrigger, TextPlugin };
