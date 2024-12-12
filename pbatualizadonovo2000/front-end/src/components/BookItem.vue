<template>
  <body>
    <div class="container">
      <h1 class="title">Detalhes do Livro</h1>

      <!-- Se os detalhes do livro estiverem disponíveis, exibe-os -->
      <div v-if="book" class="book-details">
        <img :src="book.image" alt="Capa do Livro" class="book-image" />

        <div class="book-info">
          <!-- Exibe o título, autor, ano e descrição do livro -->
          <p><strong>Título:</strong> {{ book.title }}</p>
          <p><strong>Autor:</strong> {{ book.author }}</p>
          <p><strong>Ano:</strong> {{ book.year }}</p>
          <p><strong>Descrição:</strong> {{ book.description }}</p>
        </div>

        <!-- Botão para reservar o livro -->
        <button class="button reserve" @click="reservarLivro">
          Reservar
        </button>
      </div>

      <!-- Mensagem de carregamento enquanto os detalhes do livro são carregados -->
      <div v-else class="loading">
        <p>Carregando detalhes do livro...</p>
      </div>

      <!-- Botão para voltar ao catálogo de livros -->
      <button class="button back" @click="$router.push('/bookscatalog')">
        Voltar para o Catálogo
      </button>
    </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"], // ID do livro passado como uma propriedade
  data() {
    return {
      book: null, // Objeto para armazenar os detalhes do livro
    };
  },
  created() {
    this.fetchBookDetails(); // Busca os detalhes do livro quando o componente é criado
  },
  methods: {
    // Método para buscar os detalhes do livro
    async fetchBookDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/books/${this.id}`);
        this.book = response.data; // Armazena os detalhes do livro
      } catch (error) {
        console.error("Erro ao buscar detalhes do livro:", error);
        alert("Não foi possível carregar os detalhes do livro.");
      }
    },
    // Método para reservar o livro
    async reservarLivro() {
      try {
        await axios.post(`http://localhost:3000/reserve/${this.book._id}`);
        alert("Reserva realizada com sucesso!");
      } catch (error) {
        console.error("Erro ao reservar o livro:", error);
        alert("Erro ao reservar o livro. Tente novamente.");
      }
    },
  },
};
</script>

<style scoped>
/* Container Principal */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url("https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg");
  background-size: cover;
  color: white;
  padding: 20px;
}

/* Título */
.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

/* Detalhes do Livro */
.book-details {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  text-align: left;
}

.book-image {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  display: block;
}

.book-info p {
  font-size: 1.1rem;
  margin: 10px 0;
}

.book-info strong {
  font-weight: bold;
  color: #ffc107;
}

/* Botões */
.button {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.button.reserve {
  background: linear-gradient(90deg, #000000, #000000);
  color: white;
}

.button.reserve:hover {
  background: linear-gradient(90deg, #000000, #e0b336);
}

.button.back {
  background: #333;
  color: white;
}

.button.back:hover {
  background: #555;
}

/* Carregando */
.loading {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Responsividade */
@media (max-width: 768px) {
  .book-details {
    padding: 15px;
  }

  .title {
    font-size: 2rem;
  }

  .book-info p {
    font-size: 1rem;
  }
}
</style>
