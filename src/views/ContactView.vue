<script setup>
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent("Agro Bonjardim")}&z=16&output=embed`;
</script>

<template>
  <div class="container">
    <section class="panel">
      <h2>Contactos</h2>

      <div class="cols">
        <ul class="details">
          <li><strong>Morada</strong>Rua dos Pinheiros 355, 6100-266 Cernache do Bonjardim, Portugal</li>
          <li><strong>Telefone</strong>274 808 466</li>
          <li><strong>Email</strong>agrobonjardim@gmail.com</li>
          <li><strong>Horário</strong>Segunda a Sexta: 09h00-13h00, 14h30-19h00 
          Sábados: 09h00-13h00</li>
        </ul>

        <form @submit.prevent>
          <label>
            Nome
            <input type="text" required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Mensagem
            <textarea rows="5" required></textarea>
          </label>
          <button class="button" type="submit">Enviar</button>
        </form>
      </div>

      <h3 class="map-title">Onde nos pode encontrar</h3>
      <iframe
        class="map"
        :src="mapSrc"
        title="Localização da loja"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  </div>
</template>

<style scoped>
.cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.map-title {
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  color: var(--green);
}

.map {
  width: 100%;
  height: clamp(15rem, 45vw, 24rem);
  margin-top: 0;
  border: 0;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.details {
  list-style: none;
  display: grid;
  gap: 1rem;
  align-content: start;
}

.details li {
  display: grid;
  background: var(--green-soft);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
}

.details strong {
  color: var(--green);
  font-size: 0.85rem;
  text-transform: uppercase;
}

form {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.3rem;
  font-weight: 600;
  font-size: 0.9rem;
}

input,
textarea {
  font: inherit;
  font-weight: 400;
  padding: 0.7rem;
  border: none;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
}

input:focus,
textarea:focus {
  outline: 2px solid var(--orange);
}

button {
  justify-self: start;
}
</style>
