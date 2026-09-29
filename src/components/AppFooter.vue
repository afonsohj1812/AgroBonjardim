<script setup>
import { routes } from "@/router";
import logo from "@/assets/logo.png";

const social = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61574836633312",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/agrobonjardim/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

const contacts = [
  {
    href: "https://www.google.com/maps?q=Agro+Bonjardim",
    text: "Rua dos Pinheiros 355, 6100-266 Cernache do Bonjardim",
    path: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  },
  {
    href: "tel:274808466",
    text: "274 808 466",
    path: "M4 5.5A1.5 1.5 0 0 1 5.5 4h2A1.5 1.5 0 0 1 9 5.2l.5 3a1.5 1.5 0 0 1-.7 1.5l-1.3.8a12 12 0 0 0 5 5l.8-1.3a1.5 1.5 0 0 1 1.5-.7l3 .5A1.5 1.5 0 0 1 20 16.5v2a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 4 5.6z",
  },
  {
    href: "mailto:agrobonjardim@gmail.com",
    text: "agrobonjardim@gmail.com",
    path: "M4 6h16v12H4z M4 7l8 6 8-6",
  },
];

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const hours = [
  { days: "Segunda a Sexta", time: "09h00 - 13h00 · 14h30 - 19h00" },
  { days: "Sábado", time: "09h00 - 13h00" },
];

const call = () => (window.location.href = "tel:274808466");
</script>

<template>
  <footer class="footer">
    <div class="cta">
      <div class="inner cta_row">
        <p>Tem alguma dúvida? Passe pela loja ou ligue-nos.</p>
        <button class="button" @click="call">Ligar agora</button>
      </div>
    </div>

    <div class="inner">
      <div class="cols">
        <div>
          <img class="logo" :src="logo" alt="AgroBonjardim" />
          <p class="slogan">Semear para Colher</p>

          <ul class="social">
            <li v-for="s in social" :key="s.label">
              <a
                :href="s.href"
                :aria-label="s.label"
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path :d="s.path" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <nav>
          <h3>Navegação</h3>
          <RouterLink v-for="r in routes" :key="r.name" :to="{ name: r.name }">
            {{ r.meta.label }}
          </RouterLink>
        </nav>

        <div>
          <h3>Contactos</h3>
          <ul class="contacts">
            <li v-for="c in contacts" :key="c.text">
              <a :href="c.href" target="_blank" rel="noopener">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path :d="c.path" />
                </svg>
                {{ c.text }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Horário</h3>
          <ul class="hours">
            <li v-for="h in hours" :key="h.days">
              <strong>{{ h.days }}</strong>
              <span>{{ h.time }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="bottom">
        <p>© {{ new Date().getFullYear() }} Agro Bonjardim - Afonso Lemos & Ricardo Miguel</p>
        <button class="top" @click="scrollTop">Voltar ao topo ↑</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  color: var(--white);
  background: var(--green-dark);
}

.footer::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background-color: var(--orange);
}

.cta {
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.inner {
  padding-inline: var(--gutter);
}

.cta_row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.5rem;
}

.cta_row p {
  font-size: 1.125rem;
  font-weight: bold;
}

.cols {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr 1fr;
  gap: 2.5rem;
  padding-top: clamp(2rem, 4vw, 3.5rem);
}

@media (max-width: 900px) {
  .cols {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

.logo {
  height: 8rem;
}

.slogan {
  margin: 0.75rem 0 0 1rem;
  font-style: italic;
  color: var(--green-light);
}

ul {
  list-style: none;
  display: grid;
  gap: 1rem;
}

.social {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social a {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.social a:hover {
  background: var(--orange);
  color: var(--green-darker);
  transform: translateY(-2px);
}

.social svg {
  width: 1.5rem;
  height: 1.5rem;
}

h3 {
  position: relative;
  color: var(--white);
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

h3::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2rem;
  height: 2px;
  background: var(--orange);
}

nav {
  display: grid;
  gap: 0.5rem;
  align-content: start;
}

nav a {
  width: fit-content;
  transition: transform 0.2s ease;
}

nav a:hover {
  transform: translateX(5px);
}

a {
  color: var(--white);
  text-decoration: none;
}

a:hover {
  color: var(--orange);
}

.contacts a {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: start;
  font-size: 0.95rem;
  line-height: 1.4;
}

.contacts svg {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--orange);
}

.hours {
  font-size: 0.95rem;
}

.hours strong {
  display: block;
  color: var(--green-light);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 4rem;
  padding-block: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.top {
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

.top:hover {
  color: var(--orange);
}
</style>
