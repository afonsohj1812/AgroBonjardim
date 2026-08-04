<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { routes } from "@/router";
import logo from "@/assets/logo.png";

const open = ref(false);
const route = useRoute();

watch(
  () => route.path,
  () => (open.value = false),
);
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="bar">
        <RouterLink :to="{ name: 'home' }" class="logo">
          <img :src="logo" alt="AgroBonjardim" />
        </RouterLink>

        <button class="toggle" :aria-expanded="open" @click="open = !open">
          Menu
        </button>

        <nav class="nav" :class="{ open }">
          <RouterLink v-for="r in routes" :key="r.name" :to="{ name: r.name }">
            {{ r.meta.label }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  top: 0;
  z-index: 10;
  padding-block: 1rem;
  background: var(--white);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--white);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow);
}

.logo {
  display: block;
  line-height: 0;
}

.logo img {
  height: 5rem;
  width: auto;
}

.toggle {
  display: none;
  font: inherit;
  padding: 0.4rem 0.9rem;
  border: 2px solid var(--green);
  border-radius: 999px;
  background: var(--white);
  color: var(--green);
  cursor: pointer;
}

.nav {
  display: flex;
  gap: 0.5rem;
}

.nav a {
  color: var(--text);
  text-decoration: none;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
}

.nav a:hover {
  background: var(--green-soft);
}

.nav a.router-link-active {
  background: var(--green);
  color: var(--white);
}

@media (max-width: 720px) {
  .toggle {
    display: block;
  }

  .nav {
    display: none;
    flex-direction: column;
    width: 100%;
  }

  .nav.open {
    display: flex;
  }
}
</style>
