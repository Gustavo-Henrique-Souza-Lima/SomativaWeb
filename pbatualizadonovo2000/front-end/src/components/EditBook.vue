<template>
  <body>
    <div class="edit-book">
      <h2>Editar Livro</h2>
      <!-- Mensagem de sucesso exibida após carregar os dados do livro -->
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <!-- Formulário para editar as informações do livro -->
      <form @submit.prevent="updateBook">
        <div>
          <label for="title">Título:</label>
          <input v-model="book.title" id="title" type="text" required />
        </div>
        <br>
        <div>
          <label for="author">Autor:</label>
          <input v-model="book.author" id="author" type="text" required />
        </div>
        <br>
        <div>
          <label for="year">Ano:</label>
          <input v-model="book.year" id="year" type="number" required />
        </div>
        <br>
        <div>
          <label for="image">Imagem (URL)</label>
          <textarea v-model="book.image" id="image" rows="2" placeholder="Cole a URL da imagem aqui"></textarea>
        </div>
        <br>
        <div>
          <label for="description">Descrição</label>
          <textarea v-model="book.description" id="description" rows="4" placeholder="Digite a descrição do livro"></textarea>
        </div>
        <br>
        <div>
          <label for="pages">Páginas</label>
          <input type="text" v-model="book.pages" id="pages" />
        </div>
        <br>
        <div>
          <label for="language">Linguagem</label>
          <input type="text" v-model="book.language" id="language" />
        </div>
        <br>
        <div>
          <label for="publisher">Publicação</label>
          <input type="text" v-model="book.publisher" id="publisher" />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  </body>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Objeto para armazenar os dados do livro
      book: {
        title: '',
        author: '',
        year: '',
        description: '',
        pages: '',
        language: '',
        publisher: '',
        image: '',
      },
      bookId: '', // ID do livro a ser editado
      successMessage: '', // Mensagem de sucesso
    };
  },
  methods: {
    // Função para buscar os dados do livro
    async fetchBook() {
      try {
        const response = await axios.get(`http://localhost:3000/books/${this.bookId}`);
        this.book = response.data;
        this.successMessage = 'Dados do livro carregados com sucesso!';
      } catch (error) {
        console.error('Erro ao buscar o livro:', error.response?.data || error.message);
        alert('Não foi possível carregar os dados do livro.');
      }
    },
    // Função para atualizar os dados do livro
    async updateBook() {
      try {
        await axios.put(`http://localhost:3000/api/books/${this.bookId}`, this.book);
        alert('Livro atualizado com sucesso!');
        this.$router.push('/crud');
      } catch (error) {
        console.error('Erro ao atualizar o livro:', error.response?.data || error.message);
        alert(`Erro ao atualizar o livro: ${error.response?.data?.message || error.message}`);
      }
    },
  },
  // Chama a função fetchBook quando o componente é montado
  mounted() {
    this.bookId = this.$route.params.id;
    if (this.bookId) {
      this.fetchBook();
    } else {
      alert('ID do livro não fornecido.');
    }
  },
};
</script>

<style scoped>
/* Estilos do formulário */
.edit-book div {
  margin-bottom: 1em;
}
.edit-book label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5em;
}
.edit-book input,
.edit-book textarea {
  width: 450px;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; /* Remove o redimensionamento manual */
}
.edit-book button {
  background-color: #090909;
  color: white;
  border: none;
  padding: 0.5em 1em;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
}
.edit-book button:hover {
  
  background-color: green;
}
.success-message {
  color: green;
  font-weight: bold;
  margin-bottom: 1em;
}

/* Caixa do editar */
.edit-book {
  background-color: rgb(224, 166, 19);
  width: 500px;
  text-align: center;
  border-radius: 30px;
  margin-top: 20px;
}

/* Corpo do site */
body {
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  background-image: url("https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg");
}
</style>
