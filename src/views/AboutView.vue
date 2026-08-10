<script setup>
import storePhoto from '@/assets/team.png'

const values = [
  {
    title: 'Proximidade',
    description: 'Estamos sempre disponíveis para aconselhar os nossos clientes e encontrar a melhor solução para cada necessidade, garantindo um atendimento próximo, personalizado e de confiança.'
  },
  {
    title: 'Qualidade',
    description: 'Trabalhamos com marcas reconhecidas e fornecedores de confiança, disponibilizando produtos de elevada qualidade para agricultura, jardinagem e pecuária.'
  },
  {
    title: 'Experiência',
    description: 'A experiência acumulada e o conhecimento técnico da nossa equipa permitem prestar um serviço profissional, ajudando os clientes a escolher os produtos mais adequados para cada situação.'
  }
]
</script>

<template>
  <div class="container">
    <section class="panel">
      <h2>Quem Somos</h2>
      <div class="intro">
        <p class="muted">A Agro Bonjardim é uma loja especializada na comercialização de produtos agrícolas, fitofarmacêuticos, rações, sementes, fertilizantes, ferramentas e diversos artigos para agricultura e jardinagem. Localizada em Cernache do Bonjardim, Sertã, procura diariamente oferecer produtos de qualidade e um atendimento próximo e personalizado, apoiando agricultores, empresas e clientes particulares da região.</p>
        <img :src="storePhoto" alt="Agro Bonjardim" class="store-photo" />
      </div>

      <div class="grid">
        <article v-for="(value, i) in values" :key="i" class="card">
          <h3>{{ value.title }}</h3>
          <p class="muted">{{ value.description }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.store-photo {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

@media (max-width: 720px) {
  .intro {
    grid-template-columns: 1fr;
  }
}
</style>
