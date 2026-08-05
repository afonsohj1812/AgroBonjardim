<script setup>
import fotoLoja from '@/assets/team.png'

const valores = [
  {
    titulo: 'Proximidade',
    descricao: 'Estamos sempre disponíveis para aconselhar os nossos clientes e encontrar a melhor solução para cada necessidade, garantindo um atendimento próximo, personalizado e de confiança.'
  },
  {
    titulo: 'Qualidade',
    descricao: 'Trabalhamos com marcas reconhecidas e fornecedores de confiança, disponibilizando produtos de elevada qualidade para agricultura, jardinagem e pecuária.'
  },
  {
    titulo: 'Experiência',
    descricao: 'A experiência acumulada e o conhecimento técnico da nossa equipa permitem prestar um serviço profissional, ajudando os clientes a escolher os produtos mais adequados para cada situação.'
  }
]
</script>

<template>
  <div class="container">
    <section class="panel">
      <h2>Quem Somos</h2>
      <div class="quem-somos">
        <p class="muted">A Agro Bonjardim é uma loja especializada na comercialização de produtos agrícolas, fitofarmacêuticos, rações, sementes, fertilizantes, ferramentas e diversos artigos para agricultura e jardinagem. Localizada em Cernache do Bonjardim, Sertã, procura diariamente oferecer produtos de qualidade e um atendimento próximo e personalizado, apoiando agricultores, empresas e clientes particulares da região.</p>
        <img :src="fotoLoja" alt="Agro Bonjardim" class="foto-loja" />
      </div>

      <div class="grid">
        <article v-for="(valor, i) in valores" :key="i" class="card">
          <h3>{{ valor.titulo }}</h3>
          <p class="muted">{{ valor.descricao }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quem-somos {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.foto-loja {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

@media (max-width: 720px) {
  .quem-somos {
    grid-template-columns: 1fr;
  }
}
</style>
