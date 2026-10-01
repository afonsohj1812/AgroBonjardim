<script setup>
import { partners, hero } from "@/data/partners";
</script>

<template>
  <div class="container">
    <section class="hero">
      <img :src="hero" alt="Marcas" />
      <h1>Marcas</h1>
    </section>

    <section class="panel intro">
      <h2>Com Quem Trabalhamos</h2>
      <p class="muted">
        Selecionamos cuidadosamente os nossos fornecedores para garantir aos
        nossos clientes produtos de qualidade, inovação e fiabilidade em todas
        as áreas da agricultura e jardinagem.
      </p>
    </section>

    <section class="panel">
      <ul class="logos">
        <li v-for="(partner, i) in partners" :key="i" class="logo-tile">
          <a :href="partner.link" target="_blank" rel="noopener noreferrer">
            <img :src="partner.logo" :alt="partner.name" />
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  border-radius: var(--radius-panel);
  overflow: hidden;
  margin-bottom: 2rem;
  aspect-ratio: 16 / 5;
  min-height: 9rem;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero h1 {
  position: absolute;
  left: clamp(1rem, 4vw, 2rem);
  bottom: clamp(0.75rem, 3vw, 1.5rem);
  color: var(--white);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.intro {
  text-align: center;
  margin-bottom: 2rem;
}

.intro h2 {
  margin: 0 0 0.75rem;
}

.intro .muted {
  max-width: 640px;
  margin: 0 auto;
}

.logos {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(9rem, 100%), 1fr));
  gap: clamp(1rem, 3vw, 3rem);
  margin-top: 2rem;
  padding: 0;
}

@media (max-width: 720px) {
  .hero {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 480px) {
  .hero {
    aspect-ratio: 3 / 2;
  }
}

</style>
