<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { categories } from "@/data/products";

const route = useRoute();

const category = computed(() =>
  categories.find((c) => c.slug === route.params.slug),
);

const others = computed(() =>
  categories.filter((c) => c.slug !== route.params.slug),
);
</script>

<template>
  <div v-if="category" class="container">
    <section
      class="hero"
      :style="
        category.banner ? { backgroundImage: `url(${category.banner})` } : null
      "
    >
      <div class="hero_text">
        <h1>{{ category.name }}</h1>
        <p>{{ category.description }}</p>
        <RouterLink class="button button--upper" :to="{ name: 'contact' }">
          Fale connosco
        </RouterLink>
      </div>
    </section>

    <section v-if="category.groups.length" class="showcase">
      <div class="groups">
        <article
          v-for="(group, i) in category.groups"
          :key="group.title"
          class="group"
          :class="i % 2 ? 'group--light' : 'group--dark'"
        >
          <h2>{{ group.title }}</h2>

          <ul>
            <li v-for="item in group.items" :key="item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--icon)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M7.5 12.5l3 3 6-6.5" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="section-head">
        <h2>
          <RouterLink :to="{ name: 'products' }">OUTRAS CATEGORIAS</RouterLink>
        </h2>
      </div>

      <ul class="others">
        <li v-for="other in others" :key="other.slug">
          <RouterLink
            class="category"
            :style="
              other.image ? { backgroundImage: `url(${other.image})` } : null
            "
            :to="{ name: 'category', params: { slug: other.slug } }"
          >
            <h3>{{ other.name }}</h3>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>

  <div v-else class="container">
    <section class="panel section-head">
      <h1>Categoria não encontrada</h1>
      <p class="muted">A categoria que procura não existe.</p>
      <RouterLink class="button" :to="{ name: 'products' }">
        Ver produtos
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  min-height: min(60vh, 30rem);
  margin-block: 1.5rem;
  padding: clamp(2rem, 5vw, 4rem);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow);
  background: var(--green-dark) center / cover no-repeat;
  color: var(--white);
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    rgba(15, 31, 0, 0.85) 10%,
    rgba(15, 31, 0, 0.25)
  );
}

.hero_text {
  max-width: 55ch;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-wrap: balance;
}

.hero_text p {
  margin: 1rem 0 2rem;
  font-size: 1.125rem;
}

.showcase {
  margin-inline: calc(-1 * var(--gutter));
  padding: clamp(2rem, 4vw, 3.5rem) var(--gutter);
  background: var(--green-light);
}

.groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
}

.group {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: var(--radius-panel);
}

.group--dark {
  --icon: var(--green-light);

  background: var(--green-darker);
  color: var(--white);
}

.group--light {
  --icon: var(--green-dark);

  background: rgba(255, 255, 255, 0.35);
  color: var(--green-darker);
}

.group h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  color: inherit;
}

.group ul {
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.group li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
  font-size: 1.05rem;
}

.group svg {
  width: 1.35rem;
  height: 1.35rem;
  flex: none;
}

.others {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.others .category {
  min-height: 11rem;
  padding: 1.25rem;
}

@media (max-width: 600px) {
  .group {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}
</style>
