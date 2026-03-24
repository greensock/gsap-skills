/**
 * GSAP client-only plugin — .client.ts suffix ensures this never runs on the server.
 * Registers core plugins and provides gsap to the app via useNuxtApp().
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Lazy-load heavy plugins only when needed (keeps initial bundle small)
  const lazyLoadSplitText = () =>
    import("gsap/SplitText").then((m) => {
      gsap.registerPlugin(m.SplitText);
      return m.SplitText;
    });

  return {
    provide: {
      gsap,
      ScrollTrigger,
      lazyLoadSplitText,
    },
  };
});
