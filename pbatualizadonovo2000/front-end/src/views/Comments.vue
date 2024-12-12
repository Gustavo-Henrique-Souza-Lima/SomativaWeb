<!-- src/components/Comments.vue -->
<template>
  <div>
    <h3>Comentários</h3>
    <div v-if="comments.length">
      <div v-for="comment in comments" :key="comment._id" class="comment">
        <p><strong>{{ comment.userId }}</strong>: {{ comment.content }}</p>
      </div>
    </div>
    <div v-else>
      <p>Sem comentários até o momento.</p>
    </div>
    <!-- Formulário para adicionar um comentário -->
    <textarea v-model="newComment" placeholder="Adicionar um comentário"></textarea>
    <button @click="addComment">Enviar</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    bookId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comments: [],      // Armazena os comentários do livro
      newComment: ''     // Armazena o novo comentário para envio
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(`http://localhost:6000/api/books/${this.bookId}/comments`);
        this.comments = response.data;
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
      }
    },
    async addComment() {
      try {
        const userId = 'id_do_usuario'; // Substitua com o ID do usuário autenticado
        const response = await axios.post(`http://localhost:6000/api/books/${this.bookId}/comments`, {
          content: this.newComment,
          userId: userId
        });
        this.comments.push(response.data);  // Adiciona o novo comentário à lista
        this.newComment = ''; // Limpa o campo de texto
      } catch (error) {
        console.error("Erro ao adicionar comentário:", error);
      }
    }
  },
  mounted() {
    this.fetchComments(); // Busca comentários ao carregar o componente
  }
};
</script>

<style scoped>
.comment {
  margin-bottom: 1em;
}
</style>
