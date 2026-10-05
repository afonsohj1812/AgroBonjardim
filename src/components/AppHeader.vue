<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { routes } from "@/router";
import { categories } from "@/data/products";
import logo from "@/assets/logo.png";

const open = ref(false);
const submenu = ref(false);
// Fecha a lista do rato depois de navegar, ate o ponteiro sair do menu.
const hushed = ref(false);
const route = useRoute();

const centreRoutes = routes.filter((r) => r.name !== "contact");
const contactRoute = routes.find((r) => r.name === "contact");

watch(
  () => route.path,
  () => {
    open.value = false;
    submenu.value = false;
    hushed.value = true;
    document.activeElement?.blur();
  },
);

// Ao fechar o menu, as categorias voltam a ficar recolhidas.
watch(open, (isOpen) => {
  if (!isOpen) submenu.value = false;
});

const scrolled = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 10);

const solid = computed(() => scrolled.value || route.name !== "home");

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <header class="header" :class="{ open }">
    <div class="bar" :class="{ solid: solid || open }">
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
          <div
            v-for="r in centreRoutes"
            :key="r.name"
            class="item"
            :class="{ 'item--menu': r.name === 'products', hushed }"
            @mouseleave="hushed = false"
          >
            <RouterLink :to="{ name: r.name }">{{ r.meta.label }}</RouterLink>

            <button
              v-if="r.name === 'products'"
              class="expand"
              :class="{ open: submenu }"
              :aria-expanded="submenu"
              aria-label="Ver categorias"
              @click="submenu = !submenu"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9.5l6 6 6-6" />
              </svg>
            </button>

            <ul
              v-if="r.name === 'products'"
              class="dropdown"
              :class="{ open: submenu }"
            >
              <li v-for="c in categories" :key="c.slug">
                <RouterLink :to="{ name: 'category', params: { slug: c.slug } }">
                  {{ c.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
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

.item {
  position: relative;
  display: flex;
  align-items: center;
}

/* Só serve o menu de telemóvel; no ecrã grande a lista abre ao passar o rato. */
.expand {
  display: none;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--white);
  cursor: pointer;
}

.expand svg {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.25s ease;
}

.expand.open svg {
  transform: rotate(180deg);
}

.item--menu > a::after {
  content: "";
  display: inline-block;
  margin-left: 0.4rem;
  vertical-align: middle;
  border: 0.3rem solid transparent;
  border-top-color: currentColor;
  transform: translateY(0.15rem);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: none;
  min-width: min(16rem, 90vw);
  padding: 0.5rem;
  list-style: none;
  background: var(--green-darker);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* Só no ecrã grande: no telemóvel quem manda é o botão de expandir, e o foco
   que fica no botão depois do toque manteria a lista aberta para sempre. */
@media (min-width: 721px) {
  .item--menu:hover .dropdown,
  .item--menu:focus-within .dropdown {
    display: block;
  }

  /* Vem depois, por isso ganha às duas regras acima. */
  .item--menu.hushed .dropdown {
    display: none;
  }
}

.dropdown a {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius);
  font-weight: 600;
  white-space: nowrap;
  text-shadow: none;
}

.dropdown a:hover {
  background: var(--green-dark);
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

  .logo img {
    height: 3.75rem;
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

  /* Com o menu aberto, a barra tem de tapar a pagina por tras. */
  .header.open .bar.solid {
    background: rgba(15, 31, 0, 0.97);
    max-height: calc(100vh - 1rem);
    max-height: calc(100svh - 1rem);
    overflow-y: auto;
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

  .item {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .item--menu > a::after {
    display: none;
  }

  .expand {
    display: grid;
  }

  .dropdown {
    position: static;
    display: none;
    grid-column: 1 / -1;
    min-width: 0;
    transform: none;
    padding: 0 0 0.5rem 1rem;
    background: transparent;
    box-shadow: none;
  }

  .dropdown.open {
    display: block;
  }

  .dropdown a {
    font-weight: normal;
  }

  .contact {
    justify-self: stretch;
  }
}
</style>
