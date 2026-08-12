<script setup>
import { categories } from "@/data/products";
</script>

<template>
  <div class="container">
    <section class="panel">
      <h2>Produtos</h2>

      <div class="grid">
        <RouterLink
          v-for="category in categories"
          :key="category.slug"
          class="category"
          :style="
            category.image ? { backgroundImage: `url(${category.image})` } : null
          "
          :to="{ name: 'category', params: { slug: category.slug } }"
        >
          <img v-if="category.icon" class="icon" :src="category.icon" alt="" />

          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </RouterLink>
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
