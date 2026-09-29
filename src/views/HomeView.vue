<script setup>
import { onUnmounted, ref } from "vue";

import { categories } from "@/data/products";
import { partners } from "@/data/partners";

const marks = Object.fromEntries(
  Object.entries(
    import.meta.glob("@/assets/features/*.svg", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  ).map(([path, url]) => [path.split("/").pop().replace(".svg", ""), url]),
);

const advantages = [
  { icon: "aconselhamento-tecnico", title: "Aconselhamento técnico", description: "Ajudamos a escolher o produto certo para cada cultura." },
  { icon: "atendimento-proximo", title: "Atendimento próximo", description: "Conhecemos os clientes e tratamos cada pedido de forma personalizada." },
  { icon: "tudo-num-so-sitio", title: "Tudo num só sítio", description: "Da horta à pecuária, do jardim à casa." },
  { icon: "zona-fitofarmaceutica-propria", title: "Zona fitofarmacêutica própria", description: "Produtos regulados numa área separada, com segurança e rigor." },
].map((advantage) => ({ ...advantage, image: marks[advantage.icon] ?? null }));

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

const rewind = () => {
  if (step.value < partners.length) return;

  animated.value = false;
  step.value = 0;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => (animated.value = true)),
  );
};

const timer = setInterval(() => (step.value += 1), 3000);

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="container">
    <section class="hero">
      <video
        v-for="(src, i) in videos"
        :key="src"
        ref="players"
        class="hero_video"
        :class="{ active: i === current }"
        :src="src"
        :autoplay="i === 0"
        :preload="i === 0 ? 'auto' : 'metadata'"
        muted
        playsinline
        @ended="next"
      ></video>

      <div class="hero_content">
        <div class="hero_grid">
          <h1>Tudo para a agricultura, a pecuária e o jardim</h1>

          <div class="hero_aside">
            <p>
              Produtos de qualidade e aconselhamento de quem conhece a região.
              Ao lado de agricultores, empresas e clientes particulares em
              Cernache do Bonjardim.
            </p>
            <RouterLink class="button" :to="{ name: 'products' }">
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
        <img class="photo" src="/outside.jpg" alt="Loja Agro Bonjardim" />
        <img class="photo" src="/inside.jpg" alt="Interior da loja" />
      </div>
    </section>

    <section class="panel">
      <div class="section-head">
        <h2>
          <RouterLink :to="{ name: 'partners' }">
            As Marcas que Temos em Loja
          </RouterLink>
        </h2>
      </div>

      <div class="marquee">
        <ul
          class="strip"
          :class="{ animated }"
          :style="{ transform: `translateX(calc(${-step} * var(--step)))` }"
          @transitionend.self="rewind"
        >
          <li
            v-for="(partner, i) in [...partners, ...partners]"
            :key="i"
            class="logo-tile"
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
        <h2>
          <RouterLink :to="{ name: 'products' }">OS NOSSOS PRODUTOS</RouterLink>
        </h2>
      </div>

      <div class="carousel">
        <button
          class="button button--round"
          aria-label="Anterior"
          @click="slide(-1)"
        >
          ‹
        </button>

        <ul ref="track" class="track">
          <li v-for="category in categories" :key="category.slug">
            <RouterLink
              class="category"
              :style="
                category.image
                  ? { backgroundImage: `url(${category.image})` }
                  : null
              "
              :to="{ name: 'category', params: { slug: category.slug } }"
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

        <button
          class="button button--round"
          aria-label="Seguinte"
          @click="slide(1)"
        >
          ›
        </button>
      </div>
    </section>

    <section class="panel panel--green">
      <div class="section-head features_head">
        <h2>
          O QUE NOS FAZ A ESCOLHA
          <span class="nowrap">
            CERTA
            <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
              <circle cx="12" cy="12" r="9.5" />
              <path d="M7.5 12.5l3 3 6-6.5" />
            </svg>
          </span>
        </h2>
      </div>

      <div class="features">
        <article v-for="advantage in advantages" :key="advantage.title">
          <img
            v-if="advantage.image"
            class="feature_icon"
            :src="advantage.image"
            alt=""
          />

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
  margin-bottom: 1.5rem;
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
  text-wrap: balance;
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
  flex: 0 0 var(--tile);
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

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  text-align: center;
}

.features_head .nowrap {
  white-space: nowrap;
}

.features_head svg {
  display: inline-block;
  vertical-align: -0.2em;
  width: 1.75rem;
  height: 1.75rem;
  margin-left: 0.15rem;
  color: var(--white);
}

.feature_icon {
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto 1rem;
  padding: 0.7rem;
  border-radius: 50%;
  background: var(--white);
  object-fit: contain;
}

.features h3 {
  color: var(--orange);
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
}
</style>
