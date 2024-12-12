<template>
  <body>
    <div class="container">
    <!-- Botão de Voltar ao Perfil -->
    <button class="back-btn" @click="this.$router.push('/perfil')">Voltar ao Perfil</button>

    <div v-if="usersData && usersData.length">
      <h2>Lista de Usuários</h2>

      <!-- Tabela de usuários -->
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usersData" :key="user._id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.reservedBooksCount }}</td>

            <td>
              <button @click="deleteUser(user._id)">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>Carregando usuários...</p>
    </div>
  </div>  
  </body>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usersData: [], // Lista de usuários
    };
  },
  mounted() {
    this.fetchUsers(); // Carrega a lista de usuários quando o componente for montado
  },
  methods: {
    // Função para buscar todos os usuários
    async fetchUsers() {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token não encontrado, redirecionando para login...");
        this.$router.push("/login"); // Redireciona para login se o token não estiver presente
        return;
      }

      try {
        // Envia a requisição para pegar os usuários
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: {
            'x-auth-token': token, // Inclui o token no cabeçalho da requisição
          },
        });

        // Verifica a resposta e armazena os dados
        if (response.data && response.data.users) {
          this.usersData = response.data.users; // Armazena os usuários na variável 'usersData'
        } else {
          throw new Error('Nenhum usuário encontrado');
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        alert("Ocorreu um erro ao carregar os usuários.");
      }
    },

    // Função para excluir um usuário
    async deleteUser(userId) {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token não encontrado, redirecionando para login...");
        this.$router.push("/login"); // Redireciona para login se o token não estiver presente
        return;
      }

      try {
        // Envia a requisição para deletar o usuário
        const response = await axios.delete(`http://localhost:5000/api/auth/user/${userId}`, {
          headers: {
            'x-auth-token': token, // Inclui o token no cabeçalho da requisição
          },
        });

        // Se a exclusão for bem-sucedida, atualiza a lista de usuários
        if (response.data && response.data.message === 'Usuário deletado com sucesso!') {
          this.usersData = this.usersData.filter(user => user._id !== userId); // Remove o usuário da lista
          alert("Usuário deletado com sucesso!");
        } else {
          alert("Erro ao deletar o usuário.");
        }
      } catch (error) {
        console.error("Erro ao deletar o usuário:", error);
        alert("Ocorreu um erro ao deletar o usuário.");
      }
    },
  },
};
</script>

<style scoped>
/* Estilos do body e fundo */
body {
  margin: 0;
  padding: 0;
  background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Container centralizado com borda e sombra */
.container {
  width: 80%;
  max-width: 1000px;
  background-color: rgb(255, 183, 0); /* Cor dourada */
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.4);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

/* Botão de Voltar ao Perfil */
.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 15px 30px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.back-btn:hover {
  background-color: #000000;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

/* Título */
h2 {
  font-size: 32px;
  color: #333;
  font-weight: bold;
  margin-top: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Estilos para a tabela */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}

th {
  background-color: #f2f2f2;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  background-color: red;
  color: white;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: darkred;
  transform: scale(1.1);
}

/* Mensagem de Carregando */
p {
  font-size: 18px;
  color: #666;
  margin-top: 20px;
  font-style: italic;
  text-align: center;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    width: 90%;
    padding: 20px;
  }

  table {
    font-size: 14px;
  }

  .back-btn {
    left: 10px;
    top: 10px;
    padding: 12px 25px;
  }
}
</style>
