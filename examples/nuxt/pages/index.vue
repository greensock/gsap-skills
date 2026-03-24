<!--
  Minimal GSAP Nuxt 3 example — follows gsap-frameworks skill.
  Uses useNuxtApp() for gsap access, .client.ts plugin for SSR safety,
  gsap.context(scope) for cleanup on unmount.
-->
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const { $gsap, $ScrollTrigger } = useNuxtApp();

const container = ref(null);
let ctx;

onMounted(() => {
  ctx = $gsap.context((self) => {
    // Scoped — selectors only match inside container
    $gsap.to(".box", { x: 100, duration: 0.6, ease: "power2" });
    $gsap.from(".item", { autoAlpha: 0, y: 20, stagger: 0.1 });

    // ScrollTrigger timeline
    const tl = $gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });
    tl.from(".scroll-section", { autoAlpha: 0, y: 40, duration: 0.8 });
  }, container.value); // scope
});

onUnmounted(() => {
  ctx?.revert(); // cleans up all animations + ScrollTriggers in scope
});
</script>

<template>
  <div ref="container" :style="{ padding: '2rem', fontFamily: 'sans-serif' }">
    <h1>GSAP Nuxt 3 — plugin + context + cleanup</h1>

    <div
      class="box"
      :style="{
        width: '80px',
        height: '80px',
        background: '#0fa',
        borderRadius: '8px',
        marginBottom: '1rem',
      }"
    />

    <div class="item" :style="{ margin: '0.5rem 0' }">Item 1</div>
    <div class="item" :style="{ margin: '0.5rem 0' }">Item 2</div>
    <div class="item" :style="{ margin: '0.5rem 0' }">Item 3</div>

    <div
      class="scroll-section"
      :style="{
        marginTop: '100vh',
        padding: '2rem',
        background: '#222',
        color: '#fff',
        borderRadius: '8px',
        visibility: 'hidden',
      }"
    >
      <p>This section animates in on scroll via ScrollTrigger.</p>
    </div>
  </div>
</template>
