<script setup>
import { ref, watch } from "vue";
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
          <RouterLink
            v-for="r in centreRoutes"
            :key="r.name"
            :to="{ name: r.name }"
          >
            {{ r.meta.label }}
          </RouterLink>
        </nav>

        <nav class="contact" :class="{ open }">
          <RouterLink :to="{ name: contactRoute.name }">
            {{ contactRoute.meta.label }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  margin-top: 1rem;
}

.bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--green-darker);
  border-radius: var(--radius-panel);
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

.nav a {
  font-weight: bold;
  color: var(--white);
  text-decoration: none;
  padding: 0.5rem 1rem;
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
  color: var(--orange-dark);
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: background 0.1s ease;
}

.contact a:hover {
  background: var(--white);
}

@media (max-width: 720px) {
  .bar {
    grid-template-columns: 1fr auto;
    padding-bottom: 1.5rem;
    border-radius: 2rem;
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
