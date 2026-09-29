<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { categories } from "@/data/products";

const route = useRoute();

const category = computed(() =>
  categories.find((c) => c.slug === route.params.slug),
);

const others = computed(() =>
  categories.filter((c) => c.slug !== route.params.slug),
);

const related = computed(() =>
  (category.value?.related ?? [])
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean),
);
</script>

<template>
  <div v-if="category" class="container">
    <section
      class="hero"
      :style="
        category.banner ? { backgroundImage: `url(${category.banner})` } : null
      "
    >
      <div class="hero_text">
        <h1>{{ category.name }}</h1>
        <p>{{ category.description }}</p>
        <RouterLink class="button button--upper" :to="{ name: 'contact' }">
          Fale connosco
        </RouterLink>
      </div>
    </section>

    <section v-if="category.lead" class="lead">
      <img v-if="category.icon" class="lead_mark" :src="category.icon" alt="" />
      <p>{{ category.lead }}</p>
    </section>

    <section
      v-if="category.topics?.length"
      class="topics"
      :class="{ 'topics--pairs': category.topics.length === 4 }"
    >
      <article
        v-for="(topic, i) in category.topics"
        :key="topic.title"
        class="topic"
        :class="i % 2 ? 'topic--white' : 'topic--soft'"
      >
        <img v-if="topic.icon" class="topic_icon" :src="topic.icon" alt="" />
        <h2>{{ topic.title }}</h2>

        <img
          v-if="topic.image"
          class="topic_photo"
          :src="topic.image"
          :alt="topic.title"
        />
        <div
          v-else-if="topic.photo"
          class="topic_photo topic_photo--empty"
          aria-hidden="true"
        ></div>

        <ul>
          <li v-for="item in topic.items" :key="item">{{ item }}</li>
        </ul>
      </article>
    </section>

    <section v-if="category.split" class="split">
      <div class="split_text">
        <h2>{{ category.split.title }}</h2>
        <p>{{ category.split.text }}</p>
      </div>

      <div class="split_boxes">
        <article
          v-for="(box, i) in category.split.boxes"
          :key="box.title"
          class="topic topic--compact"
          :class="i % 2 ? 'topic--white' : 'topic--soft'"
        >
          <h3>
            <img v-if="box.icon" class="topic_icon" :src="box.icon" alt="" />
            {{ box.title }}
          </h3>

          <ul>
            <li v-for="item in box.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section v-if="category.steps" class="steps">
      <h2>{{ category.steps.title }}</h2>

      <ol>
        <li v-for="(step, i) in category.steps.items" :key="step">
          <span class="steps_number" aria-hidden="true">{{ i + 1 }}</span>
          {{ step }}
        </li>
      </ol>
    </section>

    <section v-if="category.note" class="note">
      <p>
        <img class="inline_icon" :src="category.note.icon" alt="" />
        <span>
          <span v-for="line in category.note.lines" :key="line">
            {{ line }}
          </span>
        </span>
      </p>
    </section>

    <section v-if="category.cta" class="cta">
      <p>
        <img
          v-if="category.cta.icon"
          class="inline_icon"
          :src="category.cta.icon"
          alt=""
        />
        {{ category.cta.text }}
      </p>
      <RouterLink class="button button--upper" :to="{ name: 'contact' }">
        {{ category.cta.label }}
      </RouterLink>
    </section>

    <section v-if="category.intro" class="intro panel">
      <div class="intro_text">
        <h2>{{ category.intro.title }}</h2>
        <p>{{ category.intro.text }}</p>
      </div>

      <img
        v-if="category.intro.image"
        class="intro_media"
        :src="category.intro.image"
        :alt="category.name"
      />
      <div v-else class="intro_media intro_media--empty">
        <img v-if="category.icon" :src="category.icon" alt="" />
      </div>
    </section>

    <section v-if="category.tiles?.length" class="panel">
      <ul class="tiles">
        <li v-for="tile in category.tiles" :key="tile.name" class="tile">
          <img v-if="tile.icon" class="tile_icon" :src="tile.icon" alt="" />
          <h3>{{ tile.name }}</h3>
          <p class="muted">{{ tile.text }}</p>
        </li>
      </ul>
    </section>

    <section v-if="category.highlights?.length" class="highlights">
      <ul>
        <li v-for="highlight in category.highlights" :key="highlight.text">
          <img class="badge_icon" :src="highlight.icon" alt="" />
          {{ highlight.text }}
        </li>
      </ul>
    </section>

    <section v-if="category.groups.length" class="showcase">
      <div class="groups">
        <article
          v-for="(group, i) in category.groups"
          :key="group.title"
          class="group"
          :class="[
            i % 2 ? 'group--light' : 'group--dark',
            group.photo && 'group--media',
          ]"
        >
          <div class="group_head">
            <h2>{{ group.title }}</h2>
            <p v-if="group.text">{{ group.text }}</p>
          </div>

          <ul :class="{ 'is-split': group.columns === 2 }">
            <li v-for="item in group.items" :key="item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--icon)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M7.5 12.5l3 3 6-6.5" />
              </svg>
              {{ item }}
            </li>
          </ul>

          <img
            v-if="group.image"
            class="group_photo"
            :src="group.image"
            :alt="group.title"
          />
          <div
            v-else-if="group.photo"
            class="group_photo group_photo--empty"
            aria-hidden="true"
          ></div>
        </article>
      </div>
    </section>

    <p v-if="related.length" class="related">
      Veja também:
      <RouterLink
        v-for="other in related"
        :key="other.slug"
        :to="{ name: 'category', params: { slug: other.slug } }"
      >
        {{ other.name }}
      </RouterLink>
    </p>

    <section class="panel">
      <div class="section-head">
        <h2>
          <RouterLink :to="{ name: 'products' }">OUTRAS CATEGORIAS</RouterLink>
        </h2>
      </div>

      <ul class="others">
        <li v-for="other in others" :key="other.slug">
          <RouterLink
            class="category"
            :style="
              other.image ? { backgroundImage: `url(${other.image})` } : null
            "
            :to="{ name: 'category', params: { slug: other.slug } }"
          >
            <h3>{{ other.name }}</h3>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>

  <div v-else class="container">
    <section class="panel section-head">
      <h1>Categoria não encontrada</h1>
      <p class="muted">A categoria que procura não existe.</p>
      <RouterLink class="button" :to="{ name: 'products' }">
        Ver produtos
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  min-height: min(60vh, 30rem);
  margin-block: 1.5rem;
  padding: clamp(2rem, 5vw, 4rem);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow);
  background: var(--green-dark) center / cover no-repeat;
  color: var(--white);
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    rgba(15, 31, 0, 0.85) 10%,
    rgba(15, 31, 0, 0.25)
  );
}

.hero_text {
  max-width: 55ch;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-wrap: balance;
}

.hero_text p {
  margin: 1rem 0 2rem;
  font-size: 1.125rem;
}

.lead {
  position: relative;
  max-width: 44ch;
  margin-inline: auto;
  padding-block: clamp(3rem, 7vw, 5rem);
  text-align: center;
}

.lead_mark {
  width: 2.5rem;
  height: 2.5rem;
  margin-inline: auto;
}

/* Duas linhas finas a ladear o ícone, como um separador de secção. */
.lead::before,
.lead::after {
  content: "";
  position: absolute;
  top: calc(clamp(3rem, 7vw, 5rem) + 1.25rem);
  width: clamp(1.5rem, 8vw, 5rem);
  height: 2px;
  border-radius: 1000px;
  background: linear-gradient(to right, transparent, var(--green-light));
}

.lead::before {
  right: calc(50% + 2rem);
}

.lead::after {
  left: calc(50% + 2rem);
  background: linear-gradient(to left, transparent, var(--green-light));
}

.lead p {
  margin-top: 1.5rem;
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  line-height: 1.55;
  color: var(--green-dark);
  text-wrap: balance;
}

.topics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-block: 1.5rem;
}

.topics--pairs {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.topic {
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow);
}

.topic--soft {
  background: var(--green-soft);
}

.topic--white {
  background: var(--white);
}

.topic_icon {
  display: block;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 0.9rem;
}

.topic h2 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
}

.topic_photo {
  width: 100%;
  height: clamp(14rem, 22vw, 22rem);
  margin-top: 1.25rem;
  object-fit: cover;
  border-radius: var(--radius);
}

.topic_photo--empty {
  background: var(--green-light);
  opacity: 0.35;
}

.topic ul {
  list-style: none;
  display: grid;
  gap: 0.6rem;
  margin-top: 1.25rem;
}

.topic li {
  padding-left: 1.25rem;
  position: relative;
}

.topic li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--orange);
}

.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: start;
  margin-block: 1.5rem;
}

.split_text {
  position: sticky;
  top: calc(var(--header-height) + 1.5rem);
}

.split_text p {
  margin-top: 1rem;
  font-size: 1.05rem;
}

.split_boxes {
  display: grid;
  gap: 1rem;
}

.topic--compact {
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
}

.topic--compact h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.15rem;
  color: var(--green);
}

.topic--compact .topic_icon {
  width: 2rem;
  height: 2rem;
  margin-bottom: 0;
}

.topic--compact ul {
  margin-top: 0.85rem;
}

.steps {
  margin-inline: calc(-1 * var(--gutter));
  padding: clamp(2.5rem, 5vw, 4rem) var(--gutter);
  background: var(--green-darker);
  color: var(--white);
  text-align: center;
}

.steps h2 {
  color: var(--white);
}

.steps ol {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.steps li {
  position: relative;
  display: grid;
  gap: 1rem;
  justify-items: center;
  align-content: start;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.9);
}

/* Fio a ligar os passos, sem sobrar nas pontas. */
.steps li:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 1.6rem;
  left: calc(50% + 2.5rem);
  right: calc(-50% + 2.5rem);
  height: 2px;
  background: rgba(255, 255, 255, 0.25);
}

.steps_number {
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  background: var(--orange);
  color: var(--white);
  font-size: 1.35rem;
  font-weight: bold;
  box-shadow: 0 0 0 6px rgba(247, 143, 31, 0.2);
}

.note {
  margin-inline: calc(-1 * var(--gutter));
  padding: clamp(1.25rem, 3vw, 2rem) var(--gutter);
  background: var(--green-darker);
  color: var(--white);
  text-align: center;
}

.note p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  margin-inline: auto;
  font-size: 1.05rem;
  text-align: left;
}

.note p span span {
  display: block;
}

.inline_icon {
  flex: none;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.4rem;
  border-radius: 50%;
  background: var(--white);
}

.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(1.25rem, 3vw, 2.5rem);
  margin-block: 1.5rem;
  padding: clamp(1rem, 2.2vw, 1.5rem) clamp(1.5rem, 4vw, 2.5rem);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow);
  background: var(--orange);
  color: var(--white);
}

.cta p {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: bold;
}



.cta .button {
  background: var(--white);
  color: var(--green);
}

.cta .button:hover {
  background: var(--green-darker);
  color: var(--white);
}

.intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
}

.intro_text p {
  margin-top: 1rem;
  font-size: 1.05rem;
}

.intro_media {
  width: 100%;
  height: 100%;
  min-height: 16rem;
  max-height: 24rem;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.intro_media--empty {
  display: grid;
  place-items: center;
  background: var(--green-soft);
  box-shadow: none;
}

.intro_media--empty img {
  width: 5rem;
  opacity: 0.5;
}

.tiles {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.tile {
  padding: 1.5rem;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
  border-top: 4px solid var(--orange);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.tile:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift);
}

.tile_icon {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.9rem;
}

.tile h3 {
  color: var(--green);
  font-size: 1.05rem;
  margin-bottom: 0.35rem;
}

.highlights {
  margin-inline: calc(-1 * var(--gutter));
  padding: clamp(1.5rem, 3vw, 2.5rem) var(--gutter);
  background: var(--green-darker);
  color: var(--white);
}

.highlights ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  text-align: center;
}

.highlights li {
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  font-size: 1.05rem;
  font-weight: bold;
}

.badge_icon {
  width: 3rem;
  height: 3rem;
  padding: 0.6rem;
  border-radius: 50%;
  background: var(--white);
}

.showcase {
  margin-inline: calc(-1 * var(--gutter));
  padding: clamp(2rem, 4vw, 3.5rem) var(--gutter);
  background: var(--green-light);
}

.groups {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  align-items: start;
}

.group {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: var(--radius-panel);
}

.group--dark {
  --icon: var(--green-light);

  background: var(--green-darker);
  color: var(--white);
}

.group--light {
  --icon: var(--green-dark);

  background: rgba(255, 255, 255, 0.35);
  color: var(--green-darker);
}

.group_head {
  max-width: 30ch;
}

/* Com foto, o texto e a lista ficam numa coluna e a imagem ao lado de tudo. */
.group--media {
  grid-template-columns: 1fr 1fr;
  /* A segunda linha absorve a altura da foto, para a lista não descolar do texto. */
  grid-template-rows: auto 1fr;
  gap: 1.25rem 2rem;
}

.group--media .group_head {
  grid-column: 1;
  max-width: none;
}

.group--media ul {
  grid-column: 1;
}

.group--media .group_photo {
  grid-column: 2;
  grid-row: 1 / -1;
  align-self: center;
  height: auto;
  max-height: 20rem;
  aspect-ratio: 4 / 3;
}

.group_photo {
  width: 100%;
  height: 100%;
  min-height: clamp(9rem, 14vw, 12rem);
  object-fit: cover;
  border-radius: var(--radius);
}

.group_photo--empty {
  background: rgba(255, 255, 255, 0.15);
  border: 2px dashed currentColor;
  opacity: 0.4;
}

.group h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  color: inherit;
}

.group_head p {
  margin-top: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.85;
}

.group ul {
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.group ul.is-split {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.5rem;
}

.group li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
  font-size: 1.05rem;
}

.group svg {
  width: 1.35rem;
  height: 1.35rem;
  flex: none;
}

.related {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin-top: 2rem;
  font-weight: bold;
  color: var(--muted);
}

.related a {
  font-weight: bold;
  text-decoration: none;
}

.related a:hover {
  color: var(--orange);
}

.others {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.others .category {
  min-height: 11rem;
  padding: 1.25rem;
}

@media (max-width: 1000px) {
  .topics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .groups {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .intro {
    grid-template-columns: 1fr;
  }

  .tiles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .topics,
  .topics--pairs,
  .split {
    grid-template-columns: 1fr;
  }

  .split_text {
    position: static;
  }

  .steps ol {
    grid-template-columns: 1fr;
  }

  .steps li:not(:last-child)::after {
    display: none;
  }
}

@media (max-width: 600px) {
  .group,
  .group--media {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .group--media .group_photo {
    grid-column: 1;
    grid-row: auto;
  }

  .highlights ul {
    grid-template-columns: 1fr;
  }
}
</style>
