<script setup>
import { partners, hero } from "@/data/partners";
</script>

<template>
  <div class="container panel">
    <section class="hero">
      <img :src="hero" alt="Parceiros" />
      <h1>Parceiros</h1>
    </section>

    <section class="panel intro">
      <span class="pill">Parcerias que Fazem a Diferença</span>
      <h2>Os Nossos Parceiros</h2>
      <p class="muted">
        Selecionamos cuidadosamente os nossos fornecedores para garantir aos
        nossos clientes produtos de qualidade, inovação e fiabilidade em todas
        as áreas da agricultura e jardinagem.
      </p>
    </section>

    <section class="panel">
      <ul class="logos">
        <li v-for="(partner, i) in partners" :key="i">
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
  border-radius: 1.5rem;
  overflow: hidden;
  margin-bottom: 2rem;
  aspect-ratio: 16 / 5;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero h1 {
  position: absolute;
  left: 2rem;
  bottom: 1.5rem;
  color: var(--white);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.intro {
  text-align: center;
  margin-bottom: 2rem;
}

.pill {
  display: inline-block;
  padding: 0.4rem 1.1rem;
  border: 1px solid var(--green-dark, #1f3d20);
  border-radius: 999px;
  font-size: 0.9rem;
  color: var(--green-dark, #1f3d20);
  margin-bottom: 1rem;
}

.intro h2 {
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0 0 0.75rem;
}

.intro .muted {
  max-width: 640px;
  margin: 0 auto;
}

.logos {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-top: 2rem;
  padding: 0;
}

.logos li {
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.logos a {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 0.75rem;
  transition: transform 0.25s ease;
}

.logos a:hover {
  transform: scale(1.08);
}

.logos img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
