<script setup>
import { routes } from "@/router";
import logo from "@/assets/logo.png";
</script>

<template>
  <footer class="container">
    <div class="panel panel--green inner">
      <div class="cols">
        <div>
          <img class="logo" :src="logo" alt="AgroBonjardim" />
          <p class="muted">&lt;slogan da loja&gt;</p>
        </div>

        <nav>
          <h3>Navegação</h3>
          <RouterLink v-for="r in routes" :key="r.name" :to="{ name: r.name }">
            {{ r.meta.label }}
          </RouterLink>
        </nav>

        <div>
          <h3>Contactos</h3>
          <p>&lt;morada&gt;</p>
          <p>&lt;telefone&gt;</p>
          <p>&lt;email&gt;</p>
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
