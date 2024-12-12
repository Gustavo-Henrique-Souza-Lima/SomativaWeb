<template>
  <div>
    <!-- Título da página, depende se está adicionando ou editando um livro -->
    <h1>{{ bookToEdit ? 'Editar Livro' : 'Adicionar Livro' }}</h1>
    <!-- Formulário para adicionar ou editar um livro -->
    <form @submit.prevent="submitForm">
      <div>
        <!-- Campo para o título do livro -->
        <label for="title">Título</label>
        <input type="text" v-model="book.title" id="title" required />
      </div>
      <div>
        <!-- Campo para o autor do livro -->
        <label for="author">Autor</label>
        <input type="text" v-model="book.author" id="author" required />
      </div>
      <div>
        <!-- Campo para o ano de publicação do livro -->
        <label for="year">Ano</label>
        <input type="number" v-model="book.year" id="year" />
      </div>
      <div>
        <!-- Campo para a URL da imagem do livro -->
        <label for="image">Imagem (URL)</label>
        <input type="text" v-model="book.image" id="image" />
      </div>
      <!-- Botão para submeter o formulário, muda o texto conforme o estado -->
      <button type="submit">{{ bookToEdit ? 'Atualizar Livro' : 'Salvar Livro' }}</button>
    </form>
  </div>
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
      },
      bookToEdit: null, // Para armazenar os dados do livro a ser editado
    };
  },
  created() {
    const bookId = this.$route.params.id; // Obtém o ID do livro da URL
    if (bookId) {
      this.fetchBook(bookId); // Se houver ID, busca o livro
    }
  },
  methods: {
    // Método para buscar os dados do livro pelo ID
    async fetchBook(id) {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        this.bookToEdit = response.data;
        this.book = { ...this.bookToEdit }; // Preenche o formulário com os dados do livro
      } catch (error) {
        console.error('Erro ao buscar livro', error);
      }
    },
    // Método para enviar o formulário
    async submitForm() {
      try {
        if (this.bookToEdit) {
          // Se bookToEdit existe, atualiza o livro
          await axios.put(`http://localhost:3000/books/${this.bookToEdit._id}`, this.book);
        } else {
          // Caso contrário, adiciona um novo livro
          await axios.post('http://localhost:3000/books', this.book);
        }
        this.$router.push('/'); // Redireciona para a lista de livros
      } catch (error) {
        console.error('Erro ao salvar livro', error);
      }
    },
  },
};
</script>
