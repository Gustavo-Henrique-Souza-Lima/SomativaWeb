<template>
  <body>
    <!-- Container principal -->
    <div class="caixa">
      <h1>Adicionar Livro</h1>
      <!-- Formulário para adicionar um livro -->
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <!-- Campo para o título do livro -->
          <label for="title">Título</label>
          <input type="text" v-model="book.title" id="title" required />
        </div>
        
        <div class="form-group">
          <!-- Campo para o autor do livro -->
          <label for="author">Autor</label>
          <input type="text" v-model="book.author" id="author" required />
        </div>

        <div class="form-group">
          <!-- Campo para o ano de publicação do livro -->
          <label for="year">Ano</label>
          <input type="number" v-model="book.year" id="year" />
        </div>

        <div class="form-group">
          <!-- Campo para a URL da imagem do livro -->
          <label for="image">Imagem (URL)</label>
          <input type="text" v-model="book.image" id="image" />
        </div>

        <div class="form-group">
          <!-- Campo para a descrição do livro -->
          <label for="description">Descrição</label>
          <input type="text" v-model="book.description" id="description" />
        </div>

        <div class="form-group">
          <!-- Campo para o número de páginas do livro -->
          <label for="pages">Páginas</label>
          <input type="text" v-model="book.pages" id="pages" />
        </div>

        <div class="form-group">
          <!-- Campo para a linguagem do livro -->
          <label for="language">Linguagem</label>
          <input type="text" v-model="book.language" id="language" />
        </div>

        <div class="form-group">
          <!-- Campo para a editora do livro -->
          <label for="publisher">Publicação</label>
          <input type="text" v-model="book.publisher" id="publisher" />
        </div>

        <!-- Botão para submeter o formulário -->
        <button type="submit">Salvar Livro</button>
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
        image: '',
        description: '',
        pages: '',
        language: '',
        publisher: '',
      },
    };
  },
  methods: {
    // Função para submeter o formulário e salvar os dados do livro
    async submitForm() {
      try {
        await axios.post('http://localhost:3000/books', this.book);
        this.$router.push('/crud'); // Redireciona para a lista de livros após salvar
      } catch (error) {
        console.error('Erro ao adicionar livro', error);
      }
    },
  },
};
</script>


<style scoped>
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
  background-size: cover;
}

.form-container {
  background-color: rgb(255, 183, 0);
  width: 90%;
  max-width: 450px;
  padding: 30px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-weight: bold;
  color: #000;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

input:focus {
  border-color: #ff9800;
  outline: none;
}

button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #555;
}

.caixa {
  background-color: rgb(255, 183, 0);
  width: 90%;
  max-width: 400px;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
