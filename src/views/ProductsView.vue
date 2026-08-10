<script setup>
import { categories } from "@/data/products";
</script>

<template>
  <div class="container">
    <section class="panel">
      <h2>Produtos</h2>
      <p class="muted">&lt;descrição do catálogo&gt;</p>

      <div class="grid">
        <article
          v-for="category in categories"
          :id="category.slug"
          :key="category.slug"
          class="card"
        >
          <img v-if="category.icon" class="icon" :src="category.icon" alt="" />
          <span v-else class="icon icon--empty">&lt;ícone&gt;</span>

          <h3>{{ category.name }}</h3>
          <p class="muted">{{ category.description }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.icon {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 1rem;
  border-radius: 50%;
  object-fit: contain;
}

.icon--empty {
  background: var(--orange-soft);
  color: var(--muted);
  font-size: 0.7rem;
}
</style>
