<script setup>
import { routes } from "@/router";
import logo from "@/assets/logo.png";

// Replace `href` with the real profile URLs.
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
</script>

<template>
  <footer class="container">
    <div class="panel panel--green inner">
      <div class="cols">
        <div>
          <img class="logo" :src="logo" alt="AgroBonjardim" />
          <p class="muted">Semear para Colher</p>

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
          <p>Cernache do Bonjaredim</p>
          <p>274 808 466</p>
          <p>agrobonjardim@gmail.com</p>
        </div>
      </div>

      <p class="bottom">© {{ new Date().getFullYear() }} AgroBonjardim</p>
    </div>
  </footer>
</template>

<style scoped>
.inner {
  margin-top: 3rem;
  background: var(--green-dark);
}

.cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.logo {
  height: 8rem;
  width: auto;
  margin-bottom: 1rem;
}

.social {
  list-style: none;
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.social a {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.social a:hover {
  background: var(--orange);
  color: var(--green-dark);
}

.social svg {
  width: 1.35rem;
  height: 1.35rem;
}

h3 {
  color: var(--orange);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

nav {
  display: grid;
  gap: 0.3rem;
  align-content: start;
}

a {
  color: var(--white);
  text-decoration: none;
  width: fit-content;
}

a:hover {
  color: var(--orange);
}

.bottom {
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.875rem;
}
</style>
