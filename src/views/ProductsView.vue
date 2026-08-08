<script setup>
import { categorias } from "@/data/products";
</script>

<template>
  <div class="container">
    <section class="panel">
      <h2>Produtos</h2>
      <p class="muted">&lt;descrição do catálogo&gt;</p>

      <div class="grid">
        <article
          v-for="categoria in categorias"
          :id="categoria.slug"
          :key="categoria.slug"
          class="card"
        >
          <img v-if="categoria.icone" class="icon" :src="categoria.icone" alt="" />
          <span v-else class="icon icon--empty">&lt;ícone&gt;</span>

          <h3>{{ categoria.nome }}</h3>
          <p class="muted">{{ categoria.descricao }}</p>
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
