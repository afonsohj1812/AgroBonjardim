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
  <header class="header" :class="{ open }">
    <div class="bar" :class="{ solid }">
      <RouterLink :to="{ name: 'home' }" class="logo">
        <img :src="logo" alt="AgroBonjardim" />
      </RouterLink>

      <button
        class="toggle"
        :class="{ open }"
        :aria-expanded="open"
        aria-label="Menu"
        @click="open = !open"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="menu" :class="{ open }">
        <nav class="nav">
          <RouterLink
            v-for="r in centreRoutes"
            :key="r.name"
            :to="{ name: r.name }"
          >
            {{ r.meta.label }}
          </RouterLink>
        </nav>

        <nav class="contact">
          <RouterLink
            class="button button--upper"
            :to="{ name: contactRoute.name }"
          >
            {{ contactRoute.meta.label }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  --bar-bg: rgba(15, 31, 0, 0.55);
  --bar-blur: blur(12px);

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
    background 0.25s ease,
    backdrop-filter 0.25s ease;
}

.bar::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(15, 31, 0, 0.75),
    rgba(15, 31, 0, 0)
  );
  transition: opacity 0.25s ease;
}

.bar.solid::before {
  opacity: 0;
}

.bar.solid {
  background: var(--bar-bg);
  backdrop-filter: var(--bar-blur);
}

.logo img {
  height: 6rem;
}

.menu {
  display: contents;
}

.toggle {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0.6rem;
  border: none;
  background: transparent;
  cursor: pointer;
}

.toggle span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--orange);
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.toggle span + span {
  margin-top: 5px;
}

.toggle.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.toggle.open span:nth-child(2) {
  opacity: 0;
}

.toggle.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
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
}

@media (max-width: 720px) {
  .header {
    position: fixed;
    left: 0;
    right: 0;
  }

  .bar {
    grid-template-columns: 1fr auto;
    height: auto;
    min-height: var(--header-height);
    padding-block: 0.75rem;
  }

  .toggle {
    display: block;
  }

  .menu {
    display: none;
    grid-column: 1 / -1;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 0.75rem;
  }

  .menu.open {
    display: flex;
  }

  .nav {
    flex-direction: column;
    align-items: stretch;
  }

  .contact {
    justify-self: stretch;
  }
}
</style>
