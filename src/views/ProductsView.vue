<script setup>
import { categories } from "@/data/products";
</script>

<template>
  <div class="container">
    <section class="panel">
      <h2>Produtos</h2>

      <div class="grid">
        <article
          v-for="category in categories"
          :id="category.slug"
          :key="category.slug"
          class="category"
          :style="
            category.image ? { backgroundImage: `url(${category.image})` } : null
          "
        >
          <img v-if="category.icon" class="icon" :src="category.icon" alt="" />

          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.category {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 18rem;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  background: var(--green-dark) center / cover no-repeat;
  color: var(--white);
}

.category::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    rgba(15, 31, 0, 0.9) 30%,
    rgba(15, 31, 0, 0.25)
  );
}

.category h3 {
  font-size: 1.1rem;
  margin-bottom: 0.35rem;
}

.category p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
}

.icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: auto;
  padding: 0.6rem;
  border-radius: 50%;
  background: var(--white);
  object-fit: contain;
}
</style>
