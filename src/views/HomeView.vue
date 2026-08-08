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
          <li v-for="n in 2" :key="n">&lt;área de negócio {{ n }}&gt;</li>
        </ul>

        <div class="hero_grid">
          <h1>&lt;título da missão&gt;</h1>

          <div class="hero_aside">
            <p>&lt;texto da missão&gt;</p>
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
        <h2>&lt;título sobre a loja&gt;</h2>
        <p class="muted">&lt;texto de apresentação&gt;</p>
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
        <h2>&lt;título dos parceiros&gt;</h2>
      </div>

      <ul class="strip">
        <li v-for="n in 5" :key="n">&lt;logótipo {{ n }}&gt;</li>
      </ul>
    </section>

    <!-- Product categories -->
    <section class="panel">
      <div class="section-head">
        <h2>&lt;título dos produtos&gt;</h2>
        <p class="muted">&lt;descrição do catálogo&gt;</p>
      </div>

      <div class="grid">
        <RouterLink
          v-for="n in 6"
          :key="n"
          class="card category"
          :to="{ name: 'products' }"
        >
          <span class="icon">&lt;ícone&gt;</span>
          <h3>&lt;categoria de produto {{ n }}&gt;</h3>
          <p class="muted">&lt;descrição&gt;</p>
        </RouterLink>
      </div>
    </section>

    <!-- Key differentiators -->
    <section class="panel panel--green">
      <div class="section-head">
        <h2>&lt;título dos diferenciadores&gt;</h2>
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

.strip {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  align-items: center;
  margin-top: 2rem;
}

.strip li {
  display: grid;
  place-items: center;
  height: 5rem;
  border-radius: var(--radius);
  background: var(--green-soft);
  color: var(--muted);
  font-size: 0.9rem;
}

.category {
  display: block;
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
