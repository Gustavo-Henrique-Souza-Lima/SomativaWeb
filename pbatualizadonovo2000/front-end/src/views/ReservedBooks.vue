<template>
  <body>
    <div>
    <h1>Livros Emprestados</h1>
    <div v-if="books.length > 0">
      <ul>
        <li v-for="book in books" :key="book._id">
          <strong>{{ book.title }}</strong> Emprestimo(s): {{ book.reservations }}
          <button @click="returnBook(book._id)">Devolver</button>
        </li>
      </ul>
      <button @click="this.$router.push('/perfil')">Voltar ao Perfil</button>
    </div>
    <div v-else>
      <p>Nenhum livro reservado no momento.</p>
    </div>
  </div>  
  </body>
  
</template>

<script>
import axios from "axios";

export default {
  name: "ReservedBooks",
  data() {
    return {
      books: [], // Lista de livros reservados
    };
  },
  methods: {
    // Busca livros reservados do servidor
    async fetchReservedBooks() {
      try {
        const response = await axios.get("http://localhost:3000/reservations");
        this.books = response.data; // Atualiza a lista de livros
      } catch (error) {
        console.error("Erro ao buscar livros reservados:", error.message);
        alert("Erro ao carregar livros reservados.");
      }
    },

    // Devolve um livro pelo ID
    async returnBook(bookId) {
      try {
        const response = await axios.post(`http://localhost:3000/return/${bookId}`);
        alert(`Livro devolvido com sucesso: ${response.data.title}`);
        // Atualiza a lista de livros após a devolução
        this.fetchReservedBooks();
      } catch (error) {
        console.error("Erro ao devolver livro:", error.message);
        alert("Erro ao devolver o livro.");
      }
    },
  },
  mounted() {
    // Chama a API ao montar o componente
    this.fetchReservedBooks();
  },
};
</script>

<style scoped>
body {
  background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: #f4f4f4;
}

h1 {
  color: #333;
  text-align: center;
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  padding: 5px 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  color: #999;
}

div[v-else] {
  margin-top: 20px;
}
</style>
