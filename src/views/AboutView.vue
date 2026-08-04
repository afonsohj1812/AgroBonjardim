<template>
  <div class="container">
    <section class="panel">
      <h2>Quem Somos</h2>
      <p class="muted">&lt;história e apresentação da loja&gt;</p>

      <div class="grid">
        <article v-for="n in 3" :key="n" class="card">
          <h3>&lt;valor {{ n }}&gt;</h3>
          <p class="muted">&lt;descrição&gt;</p>
        </article>
      </div>
    </section>
  </div>
</template>
