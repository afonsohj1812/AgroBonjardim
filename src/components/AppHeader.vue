<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { routes } from "@/router";
import logo from "@/assets/logo.png";

const open = ref(false);
const route = useRoute();

const centreRoutes = routes.filter((r) => r.name !== "contact");
const contactRoute = routes.find((r) => r.name === "contact");

watch(
  () => route.path,
  () => (open.value = false),
);

const scrolled = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 10);

const solid = computed(() => scrolled.value || route.name !== "home");

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <header class="header">
    <div class="bar" :class="{ solid }">
      <RouterLink :to="{ name: 'home' }" class="logo">
        <img :src="logo" alt="AgroBonjardim" />
      </RouterLink>

      <button class="toggle" :aria-expanded="open" @click="open = !open">
        Menu
      </button>

      <nav class="nav" :class="{ open }">
        <RouterLink v-for="r in centreRoutes" :key="r.name" :to="{ name: r.name }">
          {{ r.meta.label }}
        </RouterLink>
      </nav>

      <nav class="contact" :class="{ open }">
        <RouterLink :to="{ name: contactRoute.name }">
          {{ contactRoute.meta.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
}

.bar {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  height: var(--header-height);
  padding-inline: var(--gutter);
  background: transparent;
  transition:
    background 0.3s ease,
    backdrop-filter 0.3s ease;
}

.bar::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(15, 31, 0, 0.85),
    rgba(15, 31, 0, 0)
  );
  transition: opacity 0.3s ease;
}

.bar.solid::before {
  opacity: 0;
}

.bar.solid {
  background: rgba(15, 31, 0, 0.55);
  backdrop-filter: blur(12px);
}

.logo img {
  height: 5rem;
}

.toggle {
  display: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: 2px solid var(--orange);
  border-radius: 999px;
  background: transparent;
  color: var(--orange);
  cursor: pointer;
}

.contact {
  justify-self: end;
}

.nav {
  display: flex;
  justify-content: center;
}

.nav a {
  font-weight: bold;
  color: var(--white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.nav a:hover,
.nav a.router-link-active {
  color: var(--green-light);
}

.contact a {
  text-align: center;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  background: var(--orange);
  color: var(--green-darker);
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  transition: background 0.1s ease;
}

.contact a:hover {
  background: var(--white);
}

@media (max-width: 720px) {
  .bar {
    grid-template-columns: 1fr auto;
    height: auto;
    padding-block: 1rem;
  }

  .toggle {
    display: block;
  }

  .nav,
  .contact {
    display: none;
    grid-column: 1 / -1;
    flex-direction: column;
    justify-self: stretch;
    width: 100%;
  }

  .nav.open,
  .contact.open {
    display: flex;
  }
}
</style>
