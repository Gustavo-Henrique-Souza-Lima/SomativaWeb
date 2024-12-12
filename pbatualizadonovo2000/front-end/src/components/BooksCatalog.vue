<template>
  <div class="page-container">
    <!-- Botão de voltar -->
    <button class="btn-back" @click="this.$router.push('/paginicial')">
      Página Inicial
    </button>

    <!-- Conteúdo principal -->
    <div class="content">
      <h1>Catálogo de Livros</h1>

      <!-- Barra de pesquisa -->
      <div class="search-bar">
        <!-- Campo de entrada para pesquisa -->
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Pesquisar por título ou autor" 
          class="search-input"
        />
      </div>

      <!-- Lista de livros -->
      <div class="book-list">
        <!-- Itera sobre os livros filtrados -->
        <div 
          class="book-card" 
          v-for="book in filteredBooks" 
          :key="book._id"
        >
          <!-- Link para a página de detalhes do livro -->
          <router-link :to="{ name: 'BookItem', params: { id: book._id } }">
            <!-- Imagem da capa do livro -->
            <img
              class="book-cover"
              :src="book.image"
              alt="Capa do Livro"
              v-if="book.image"
            />
          </router-link>
          <div class="book-details">
            <!-- Exibe o título e o autor do livro -->
            <p><strong>Título:</strong> {{ book.title }}</p>
            <p><strong>Autor:</strong> {{ book.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [], // Lista de livros obtidos
      searchQuery: "", // Termo de pesquisa
    };
  },
  computed: {
    // Filtra os livros com base no termo de pesquisa
    filteredBooks() {
      const query = this.searchQuery.toLowerCase();
      return this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query)
      );
    },
  },
  created() {
    this.fetchBooks(); // Busca os livros quando o componente é criado
  },
  methods: {
    // Método para buscar os livros da API
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:3000/books");
        this.books = response.data; // Define a lista de livros com os dados recebidos
      } catch (error) {
        console.error("Erro ao buscar livros", error);
      }
    },
  },
};
</script>

<style scoped>
/* Layout principal */
.page-container {
  background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  font-family: 'Arial', sans-serif;
}

/* Botão de voltar */
.btn-back {
  align-self: flex-start;
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn-back:hover {
  background-color: #e0a613;
  transform: scale(1.05);
}

/* Cabeçalho */
h1 {
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

/* Barra de pesquisa */
.search-bar {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 800px;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #000;
  border-radius: 10px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.search-input:focus {
  border-color: #e0a613;
  box-shadow: 0 0 8px rgba(224, 166, 19, 0.8);
}

/* Lista de livros */
.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.book-card {
  background-color: rgb(224, 166, 19); /* Cor de fundo dourada */
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 200px;
  text-align: center;
  padding: 10px;
  border: 15px solid black;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.book-cover {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

.book-details p {
  margin: 5px 0;
  color: #333;
  font-size: 0.9rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .book-card {
    max-width: 100%;
  }
}
</style>
