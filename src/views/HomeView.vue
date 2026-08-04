<template>
  <div class="container">
    <!-- Hero: two halves, one per business area. -->
    <section class="hero">
      <RouterLink class="panel panel--green half" :to="{ name: 'products' }">
        <h2>&lt;área de negócio 1&gt;</h2>
        <p class="muted">&lt;descrição curta&gt;</p>
      </RouterLink>

      <RouterLink class="panel panel--orange half" :to="{ name: 'products' }">
        <h2>&lt;área de negócio 2&gt;</h2>
        <p>&lt;descrição curta&gt;</p>
      </RouterLink>
    </section>

    <!-- Mission -->
    <section class="panel">
      <div class="section-head">
        <h2>&lt;título da missão&gt;</h2>
        <p class="muted">&lt;texto da missão&gt;</p>
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-block: 1.5rem;
}

.half {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 20rem;
  margin: 0;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.half:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift);
}

.half p {
  margin-top: 0.5rem;
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
