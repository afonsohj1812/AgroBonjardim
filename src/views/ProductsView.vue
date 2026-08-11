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
  min-height: 18rem;
  padding: 1.5rem;
}

.category h3 {
  font-size: 1.1rem;
}
</style>
