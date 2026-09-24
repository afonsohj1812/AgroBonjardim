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

    <section v-if="category.lead" class="panel section-head">
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
        <span class="topic_icon" aria-hidden="true">{{ topic.icon }}</span>
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
            <span class="topic_icon" aria-hidden="true">{{ box.icon }}</span>
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
        <span aria-hidden="true">{{ category.note.icon }}</span>
        {{ category.note.text }}
      </p>
    </section>

    <section v-if="category.cta" class="cta">
      <p>
        <span v-if="category.cta.icon" aria-hidden="true">
          {{ category.cta.icon }}
        </span>
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
          <span class="tile_icon" aria-hidden="true">{{ tile.icon }}</span>
          <h3>{{ tile.name }}</h3>
          <p class="muted">{{ tile.text }}</p>
        </li>
      </ul>
    </section>

    <section v-if="category.highlights?.length" class="highlights">
      <ul>
        <li v-for="highlight in category.highlights" :key="highlight.text">
          <span aria-hidden="true">{{ highlight.icon }}</span>
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
          :class="i % 2 ? 'group--light' : 'group--dark'"
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
  font-size: 2.25rem;
  line-height: 1;
  margin-bottom: 0.75rem;
}

.topic h2 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
}

.topic_photo {
  width: 100%;
  height: 11rem;
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
  margin-bottom: 0;
  font-size: 1.5rem;
}

.topic--compact ul {
  margin-top: 0.85rem;
}

.steps {
  margin-inline: calc(-1 * var(--gutter));
  padding: clamp(2rem, 4vw, 3rem) var(--gutter);
  background: var(--green-light);
  text-align: center;
}

.steps h2 {
  color: var(--green-darker);
}

.steps ol {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.steps li {
  display: grid;
  gap: 0.75rem;
  justify-items: center;
  align-content: start;
  font-size: 1.05rem;
  font-weight: bold;
  color: var(--green-darker);
}

.steps_number {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--orange);
  color: var(--white);
  font-size: 1.25rem;
}

.note {
  margin-inline: calc(-1 * var(--gutter));
  padding: clamp(1.25rem, 3vw, 2rem) var(--gutter);
  background: var(--green-darker);
  color: var(--white);
  text-align: center;
}

.note p {
  max-width: 60ch;
  margin-inline: auto;
  font-size: 1.05rem;
}

.note span {
  margin-right: 0.5rem;
  font-size: 1.35rem;
}

.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-block: 1.5rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow);
  background: var(--orange);
  color: var(--white);
}

.cta p {
  max-width: 55ch;
  font-size: 1.125rem;
  font-weight: bold;
}

.cta p span {
  margin-right: 0.35rem;
  font-size: 1.35rem;
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
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 0.75rem;
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

.highlights span {
  font-size: 1.75rem;
  line-height: 1;
}

.showcase {
  margin-inline: calc(-1 * var(--gutter));
  padding: clamp(2rem, 4vw, 3.5rem) var(--gutter);
  background: var(--green-light);
}

.groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
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
}

@media (max-width: 600px) {
  .group {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .highlights ul {
    grid-template-columns: 1fr;
  }
}
</style>
