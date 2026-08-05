<script setup>
import logoPlaceholder from '@/assets/partners/logo.png'

const parceiros = [
  { nome: 'Parceiro 1',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 2',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 3',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 4',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 5',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 6',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 7',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 8',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 9',  logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 10', logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 11', logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 12', logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 13', logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 14', logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 15', logo: logoPlaceholder, link: 'https://example.com' },
  { nome: 'Parceiro 16', logo: logoPlaceholder, link: 'https://example.com' }
]
</script>

<template>
  <div class="container">
    <section class="panel">
      <h2>Parcerias que Fazem a Diferença</h2>
      <p class="muted">Selecionamos cuidadosamente os nossos fornecedores para garantir aos nossos clientes produtos de qualidade, inovação e fiabilidade em todas as áreas da agricultura e jardinagem.</p>

      <ul class="logos">
        <li v-for="(parceiro, i) in parceiros" :key="i">
          <a :href="parceiro.link" target="_blank" rel="noopener noreferrer">
            <img :src="parceiro.logo" :alt="parceiro.nome" />
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.logos {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-top: 2rem;
  padding: 0;
}

.logos li {
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.logos a {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 0.75rem;
  transition: transform 0.25s ease;
}

.logos a:hover {
  transform: scale(1.08);
}

.logos img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
