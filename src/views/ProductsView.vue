<template>
  <div class="container">
    <section class="panel">
      <h2>Produtos</h2>
      <p class="muted">&lt;descrição do catálogo&gt;</p>

      <div class="grid">
        <article v-for="n in 6" :key="n" class="card">
          <h3>&lt;categoria de produto {{ n }}&gt;</h3>
          <p class="muted">&lt;descrição&gt;</p>
        </article>
      </div>
    </section>
  </div>
</template>
