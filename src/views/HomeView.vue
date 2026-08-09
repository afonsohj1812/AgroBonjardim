<script setup>
import { onUnmounted, ref } from "vue";

import { categorias } from "@/data/products";
import { parceiros } from "@/data/partners";

const track = ref(null);

const slide = (direction) =>
  track.value.scrollBy({
    left: direction * track.value.clientWidth,
    behavior: "smooth",
  });

const step = ref(0);
const isAnimated = ref(true);

const timer = setInterval(() => {
  step.value += 1;

  if (step.value === parceiros.length) {
    setTimeout(() => {
      isAnimated.value = false;
      step.value = 0;
      requestAnimationFrame(() => (isAnimated.value = true));
    }, 700);
  }
}, 2000);

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="container">
    <!-- Hero: mission over a looping background video. -->
    <section class="panel hero">
      <video
        class="hero_video"
        autoplay
        muted
        loop
        playsinline
        poster="/hero-poster.png"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div class="hero_content">
        <ul class="badges">
          <li>Agricultura &amp; Pecuária</li>
          <li>Jardinagem &amp; Ferramentas</li>
        </ul>

        <div class="hero_grid">
          <h1>Tudo para o campo, a horta e o jardim</h1>

          <div class="hero_aside">
            <p>
              Produtos de qualidade e aconselhamento de quem conhece a região.
              Ao lado de agricultores, empresas e clientes particulares em
              Cernache do Bonjardim.
            </p>
            <RouterLink
              class="button button--accent"
              :to="{ name: 'products' }"
            >
              Os nossos produtos
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- About: text left, photos right -->
    <section class="panel about">
      <div>
        <h2>A SUA LOJA AGRÍCOLA EM CERNACHE DO BONJARDIM</h2>
        <p class="muted">
          Na Agro Bonjardim encontra tudo o que precisa para o campo, a horta e
          o jardim: produtos agrícolas e fitofarmacêuticos, rações, sementes,
          fertilizantes, ferramentas e muito mais. Apoiamos agricultores,
          empresas e clientes particulares da região com produtos de qualidade e
          um atendimento próximo e personalizado.
        </p>
        <RouterLink class="button" :to="{ name: 'about' }"
          >Saber mais</RouterLink
        >
      </div>

      <div class="photos">
        <div v-for="n in 2" :key="n" class="photo">&lt;imagem {{ n }}&gt;</div>
      </div>
    </section>

    <!-- Partners logo strip -->
    <section class="panel">
      <div class="section-head">
        <h2>OS NOSSOS PARCEIROS</h2>
      </div>

      <!-- The list is rendered twice so the loop can restart unnoticed. -->
      <div class="marquee">
        <ul
          class="strip"
          :class="{ isAnimated: isAnimated }"
          :style="{ transform: `translateX(calc(${-step} * var(--step)))` }"
        >
          <li
            v-for="(parceiro, i) in [...parceiros, ...parceiros]"
            :key="i"
            :aria-hidden="i >= parceiros.length"
          >
            <a :href="parceiro.link" target="_blank" rel="noopener noreferrer">
              <img :src="parceiro.logo" :alt="parceiro.nome" />
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Product categories -->
    <section class="panel">
      <div class="section-head">
        <h2>OS NOSSOS PRODUTOS</h2>
        <p class="muted">&lt;descrição do catálogo&gt;</p>
      </div>

      <div class="carousel">
        <button class="arrow" aria-label="Anterior" @click="slide(-1)">
          ‹
        </button>

        <ul ref="track" class="track">
          <li v-for="categoria in categorias" :key="categoria.slug">
            <RouterLink
              class="card category"
              :to="{ name: 'products', hash: `#${categoria.slug}` }"
            >
              <img
                v-if="categoria.icone"
                class="icon"
                :src="categoria.icone"
                alt=""
              />
              <span v-else class="icon icon--empty">&lt;ícone&gt;</span>

              <h3>{{ categoria.nome }}</h3>
              <p class="muted">{{ categoria.descricao }}</p>
            </RouterLink>
          </li>
        </ul>

        <button class="arrow" aria-label="Seguinte" @click="slide(1)">›</button>
      </div>
    </section>

    <!-- Key differentiators -->
    <section class="panel panel--green">
      <div class="section-head">
        <h2>O QUE NOS FAZ A ESCOLHA CERTA</h2>
      </div>

      <div class="features">
        <article v-for="n in 4" :key="n">
          <h3>&lt;vantagem {{ n }}&gt;</h3>
          <p class="muted">&lt;descrição&gt;</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: min(80vh, 44rem);
  padding: clamp(2rem, 5vw, 4.5rem);
  background: var(--green-dark);
  color: var(--white);
}

.hero_video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(31, 63, 0, 0.5), rgba(31, 63, 0, 0));
  z-index: 1;
}

.hero_content {
  position: relative;
  z-index: 2;
}

.badges {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.badges li {
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  background: var(--green-dark);
  font-weight: 600;
  font-size: 0.95rem;
}

.hero_grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;
  align-items: end;
}

.hero_grid h1 {
  font-size: clamp(2rem, 5.5vw, 4rem);
  font-weight: 800;
}

.hero_aside p {
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .hero_grid {
    grid-template-columns: 1fr;
    align-items: start;
  }
}

.about {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  align-items: center;
}

.about .button {
  margin-top: 1.5rem;
}

.about p {
  margin-top: 0.75rem;
  max-width: 65ch;
}

.photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.photo {
  display: grid;
  place-items: center;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius);
  background: var(--green-soft);
  color: var(--muted);
}

.photo:last-child {
  margin-top: 2rem;
}

.marquee {
  overflow: hidden;
  margin-top: 2rem;
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 4rem,
    #000 calc(100% - 4rem),
    transparent
  );
}

.strip {
  --step: 11.5rem;

  list-style: none;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  width: max-content;
}

.strip.isAnimated {
  transition: transform 0.7s ease;
}

@media (prefers-reduced-motion: reduce) {
  .strip.isAnimated {
    transition: none;
  }
}

.strip li {
  display: grid;
  place-items: center;
  flex: 0 0 10rem;
  height: 5rem;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
}

.strip a {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 0.75rem;
  transition: transform 0.25s ease;
}

.strip a:hover {
  transform: scale(1.08);
}

.strip img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.carousel {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.track {
  --per-view: 4;
  --gap: 1.5rem;

  list-style: none;
  display: flex;
  gap: var(--gap);
  flex: 1;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
}

.track::-webkit-scrollbar {
  display: none;
}

.track > li {
  flex: 0 0 calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view));
  scroll-snap-align: start;
  padding-block: 0.5rem;
}

@media (max-width: 1100px) {
  .track {
    --per-view: 3;
  }
}

@media (max-width: 800px) {
  .track {
    --per-view: 2;
  }
}

@media (max-width: 560px) {
  .track {
    --per-view: 1;
  }
}

.arrow {
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.arrow:hover {
  background: var(--orange);
  color: var(--white);
}

.category {
  display: block;
  height: 100%;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.icon {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
  object-fit: contain;
}

.icon--empty {
  background: var(--orange-soft);
  color: var(--muted);
  font-size: 0.7rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  text-align: center;
}

.features h3 {
  color: var(--orange);
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
}
</style>
