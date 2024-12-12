<template>
  <div id="app">
    <!-- Exibe o formulário apenas quando necessário -->
    <BookForm 
      v-if="bookToEdit" 
      :bookToEdit="bookToEdit" 
      @book-added="fetchBooks" 
      @book-updated="fetchBooks" 
    />
    <BookList @edit-book="setBookToEdit" ref="bookList" />
  </div>
  </template>
  

<script>
import BookList from '../components/BookList.vue';
import BookForm from '../components/BookForm.vue';

export default {
  data(){
    return {
      bookToEdit: null, // inicializa o estado do livro a ser editado
    };
  },
components: {
  BookList,
  BookForm
},
methods: {
  // funcao para definir o livro que sera editado
  setBookToEdit(book) {
    this.bookToEdit = book; 
  },
  // funcao para atualizar a lista delivros apos adicionar ou editar
  fetchBooks() {
    this.$refs.bookList.fetchBooks();
    this.bookToEdit = null; // Limpa o formulario apos a acao
  },
},
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
