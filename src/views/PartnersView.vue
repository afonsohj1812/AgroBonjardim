<template>
  <div class="container">
    <section class="panel">
      <h2>Parceiros</h2>
      <p class="muted">&lt;descrição das parcerias&gt;</p>

      <ul class="logos">
        <li v-for="n in 6" :key="n">&lt;logótipo {{ n }}&gt;</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.logos {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.logos li {
  display: grid;
  place-items: center;
  height: 6rem;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--muted);
}
</style>
