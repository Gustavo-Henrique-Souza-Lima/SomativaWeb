<template>
  <body>
    <div>
      <!-- Botão de Voltar para Perfil -->
      <button class="back-btn" @click="goToPerfil">Voltar ao Perfil</button>

      <h1>Lista de Livros</h1>
      <div class="book-list">
        <!-- Lista de livros com v-for para renderizar cada livro -->
        <div class="caixa" v-for="book in books" :key="book._id">
          <div class="container">
            <h3>{{ book.title }}</h3>

            <!-- Imagem do livro, se disponível -->
            <img class="capalivros" :src="book.image" alt="Capa do Livro" v-if="book.image" />

            <!-- Informações do livro -->
            <p><strong>Título:</strong><br>{{ book.author }}</p>
            <p><strong>Ano:</strong><br>{{ book.year }}</p>
            <p><strong>Descrição:</strong><br>{{ book.description }}</p>
            <p><strong>Páginas:</strong><br>{{ book.pages }}</p>
            <p><strong>Linguagem:</strong><br>{{ book.language }}</p>
            <p><strong>Disponibilidade:</strong><br>{{ book.available }}</p>
            <p><strong>Editora:</strong><br>{{ book.publisher }}</p>

            <!-- Botões de Editar e Deletar -->
            <div class="button-group">
              <button @click="goToEditar(book._id)">Editar</button>
              <br />
              <button class="delete-btn" @click="goToDeletar(book._id)">Deletar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Botão para adicionar um novo livro -->
      <button class="add-book-btn" @click="addBook">Adicionar Livro</button>
    </div>
  </body>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [], // Armazena a lista de livros
    };
  },
  created() {
    this.fetchBooks(); // Busca os livros quando o componente é criado
  },
  methods: {
    // Função para buscar os livros
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        this.books = response.data; // Define a lista de livros com os dados recebidos
      } catch (error) {
        console.error('Erro ao buscar livros', error);
      }
    },
    // Função para redirecionar à página de adicionar livro
    addBook() {
      this.$router.push('/add-book');
    },
    // Função para redirecionar à página de editar livro
    goToEditar(bookId) {
      this.$router.push(`/edit/${bookId}`);
    },
    // Função para deletar um livro
    goToDeletar(bookId) {
      if (confirm('Tem certeza que deseja deletar este livro?')) {
        axios
          .delete(`http://localhost:3000/api/books/${bookId}`)
          .then(() => {
            this.fetchBooks(); // Atualiza a lista de livros após deletar
            alert('Livro deletado com sucesso!');
          })
          .catch((error) => {
            console.error('Erro ao deletar livro', error);
            alert('Erro ao deletar livro.');
          });
      }
    },
    // Função para redirecionar ao perfil
    goToPerfil() {
      this.$router.push('/perfil');
    }
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 28px;
  color: white;
  margin-top: 30px;
  margin-bottom: 20px;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 10px;
  justify-content: center;
}

.caixa {
  width: 300px;
  background-color: rgba(255, 183, 0, 0.8);
  padding: 15px;
  border-radius: 15px;
  text-align: center;
  border: 5px solid #030303;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.capalivros {
  width: 200px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s ease;
}

.capalivros:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
}

p {
  font-size: 14px;
  margin: 5px 0;
}

strong {
  color: #333;
}

.button-group button {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-group button:hover {
  background-color: #555;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.add-book-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.add-book-btn:hover {
  background-color: #218838;
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.back-btn:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .book-list {
    justify-content: flex-start;
  }

  .caixa {
    width: 100%;
  }

  .capalivros {
    width: 100%;
    height: 250px;
  }
}
</style>
