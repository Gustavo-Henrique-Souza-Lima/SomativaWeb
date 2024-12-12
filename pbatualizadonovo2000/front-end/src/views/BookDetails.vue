<template>
  <div>
    <h1>Detalhes do Livro</h1>
    <!-- Seção de comentários -->
    <section>
      <h2>Comentários</h2>
      <!-- Lista de comentários -->
      <div v-for="comment in comments" :key="comment._id">
        <p><strong>{{ comment.userId.username }}:</strong> {{ comment.content }}</p>
      </div>
    </section>
    
    <section>
      <h3>Adicionar Comentário</h3>
      <!-- Área para adicionar novo comentário -->
      <textarea v-model="newComment"></textarea>
      <button @click="addComment">Enviar</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          bookId: 'ID_DO_LIVRO_AQUI', // ID do livro, pode ser obtido via rota ou props
          comments: [], // Array para armazenar comentários
          newComment: '', // Novo comentário a ser adicionado
      };
  },
  methods: {
      // Método para buscar comentários do livro
      async fetchComments() {
          try {
              const response = await axios.get(`http://localhost:6000/api/books/${this.bookId}/comments`);
              this.comments = response.data; // Atualiza o array de comentários
          } catch (error) {
              console.error('Erro ao buscar comentários:', error); // Loga o erro no console
          }
      },
      // Método para adicionar um novo comentário
      async addComment() {
          try {
              const response = await axios.post(`http://localhost:6000/api/books/${this.bookId}/comments`, {
                  content: this.newComment, // Conteúdo do novo comentário
                  userId: 'ID_DO_USUARIO_AQUI' // ID do usuário, pode ser obtido do sistema de autenticação
              });
              alert(response.data.message); // Alerta com a mensagem de resposta
              this.newComment = ''; // Reseta o campo de novo comentário
              this.fetchComments(); // Atualiza a lista de comentários
          } catch (error) {
              console.error('Erro ao adicionar comentário:', error); // Loga o erro no console
          }
      }
  },
  mounted() {
      this.fetchComments(); // Carrega comentários ao montar o componente
  }
};
</script>
