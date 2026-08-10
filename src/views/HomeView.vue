<script setup>
import { onUnmounted, ref } from "vue";

import { categories } from "@/data/products";
import { partners } from "@/data/partners";

const advantages = [
  { title: "<vantagem 1>", description: "<descrição>" },
  { title: "<vantagem 2>", description: "<descrição>" },
  { title: "<vantagem 3>", description: "<descrição>" },
  { title: "<vantagem 4>", description: "<descrição>" },
];

const videos = Object.entries(
  import.meta.glob("@/assets/hero/*.mp4", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);
const players = ref([]);
const current = ref(0);

const next = () => {
  current.value = (current.value + 1) % videos.length;

  const upcoming = players.value[current.value];
  upcoming.currentTime = 0;
  upcoming.play();
};

const track = ref(null);

const slide = (direction) =>
  track.value.scrollBy({
    left: direction * track.value.clientWidth,
    behavior: "smooth",
  });

const step = ref(0);
const animated = ref(true);

const timer = setInterval(() => {
  step.value += 1;

  if (step.value === partners.length) {
    setTimeout(() => {
      animated.value = false;
      step.value = 0;
      requestAnimationFrame(() => (animated.value = true));
    }, 1600);
  }
}, 3000);

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="container">
    <section class="panel hero">
      <video
        v-for="(src, i) in videos"
        :key="src"
        ref="players"
        class="hero_video"
        :class="{ active: i === current }"
        :src="src"
        :autoplay="i === 0"
        :preload="i === 0 ? 'auto' : 'metadata'"
        poster="/hero-poster.png"
        muted
        playsinline
        @ended="next"
      ></video>

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
        <img class="photo" src="/fora_vertical.jpg" alt="Loja Agro Bonjardim" />
        <img class="photo" src="/dentro.jpg" alt="Interior da loja" />
      </div>
    </section>

    <section class="panel">
      <div class="section-head">
        <h2>OS NOSSOS PARCEIROS</h2>
      </div>

      <div class="marquee">
        <ul
          class="strip"
          :class="{ animated }"
          :style="{ transform: `translateX(calc(${-step} * var(--step)))` }"
        >
          <li
            v-for="(partner, i) in [...partners, ...partners]"
            :key="i"
            :aria-hidden="i >= partners.length"
          >
            <a :href="partner.link" target="_blank" rel="noopener noreferrer">
              <img :src="partner.logo" :alt="partner.name" />
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section class="panel">
      <div class="section-head">
        <h2>OS NOSSOS PRODUTOS</h2>
      </div>

      <div class="carousel">
        <button class="arrow" aria-label="Anterior" @click="slide(-1)">
          ‹
        </button>

        <ul ref="track" class="track">
          <li v-for="category in categories" :key="category.slug">
            <RouterLink
              class="category"
              :style="
                category.image ? { backgroundImage: `url(${category.image})` } : null
              "
              :to="{ name: 'products', hash: `#${category.slug}` }"
            >
              <img
                v-if="category.icon"
                class="icon"
                :src="category.icon"
                alt=""
              />

              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </RouterLink>
          </li>
        </ul>

        <button class="arrow" aria-label="Seguinte" @click="slide(1)">›</button>
      </div>
    </section>

    <section class="panel panel--green">
      <div class="section-head">
        <h2>O QUE NOS FAZ A ESCOLHA CERTA</h2>
      </div>

      <div class="features">
        <article v-for="advantage in advantages" :key="advantage.title">
          <h3>{{ advantage.title }}</h3>
          <p class="muted">{{ advantage.description }}</p>
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
  min-height: 100vh;
  margin-inline: calc(-1 * var(--gutter));
  margin-top: calc(-1 * var(--header-height));
  padding: clamp(2rem, 5vw, 4.5rem);
  padding-top: calc(var(--header-height) + clamp(2rem, 5vw, 4.5rem));
  border-radius: 0;
  box-shadow: none;
  background: var(--green-dark);
  color: var(--white);
}

.hero_video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.5s ease;
}

.hero_video.active {
  opacity: 1;
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
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius);
}

.photo:last-child {
  margin-top: 2rem;
}

.marquee {
  container-type: inline-size;
  overflow: hidden;
  margin-top: 2rem;
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 2rem,
    #000 calc(100% - 2rem),
    transparent
  );
}

.strip {
  --per-view: 10;
  --gap: 1rem;
  --tile: calc((100cqi - (var(--per-view) - 1) * var(--gap)) / var(--per-view));
  --step: calc(var(--tile) + var(--gap));

  list-style: none;
  display: flex;
  gap: var(--gap);
  align-items: center;
  width: max-content;
}

@media (max-width: 1100px) {
  .strip {
    --per-view: 6;
  }
}

@media (max-width: 700px) {
  .strip {
    --per-view: 3;
  }
}

.strip.animated {
  transition: transform 1.6s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .strip.animated {
    transition: none;
  }
}

.strip li {
  display: grid;
  place-items: stretch;
  flex: 0 0 var(--tile);
  aspect-ratio: 1;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
}

.strip a {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  transition: transform 0.25s ease;
}

.strip a:hover {
  transform: scale(1.08);
}

.strip img {
  width: 100%;
  height: 100%;
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
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  min-height: 17rem;
  padding: 1.25rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  background: var(--green-dark) center / cover no-repeat;
  color: var(--white);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.category:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift);
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
  font-size: 1.05rem;
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
