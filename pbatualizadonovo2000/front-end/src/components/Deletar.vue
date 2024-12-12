<template>
  <div>
    <h1>Lista de Livros</h1>
    <ul>
      <!-- Itera sobre a lista de livros e renderiza cada um deles -->
      <li v-for="book in books" :key="book._id">
        <!-- Imagem do livro -->
        <img :src="book.image" alt="Imagem do Livro" width="100">
        <!-- Título do livro -->
        <h3>{{ book.title }}</h3>
        <!-- Autor e ano do livro -->
        <p>{{ book.author }} - {{ book.year }}</p>
        <!-- Botão para deletar o livro -->
        <button @click="deleteBook(book._id)">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [], // Array para armazenar a lista de livros
    };
  },
  methods: {
    // Função para buscar a lista de livros
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        this.books = response.data; // Atualiza a lista de livros com os dados recebidos
      } catch (error) {
        console.error('Erro ao buscar livros:', error); // Loga o erro no console
      }
    },
    // Função para deletar um livro
    async deleteBook(id) {
      if (confirm('Você tem certeza que deseja deletar este livro?')) {
        try {
          // Envia a requisição de deleção para o back-end com o prefixo '/api'
          await axios.delete(`http://localhost:3000/api/books/${id}`);
          
          // Exibe um alerta de sucesso
          alert('Livro deletado com sucesso');
          
          // Atualiza a lista de livros após a exclusão
          this.books = this.books.filter(book => book._id !== id);
        } catch (error) {
          console.error('Erro ao deletar livro:', error); // Loga o erro no console
          alert('Erro ao deletar o livro');
        }
      }
    },
  },
  // Chama a função fetchBooks quando o componente é montado
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
}
button {
  margin-left: 20px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #c0392b;
}
</style>
