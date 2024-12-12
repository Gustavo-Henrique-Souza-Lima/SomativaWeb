<template>
  <body>
    <!-- Container principal do perfil -->
    <div v-if="userData" class="profile-container">
      <h2>Perfil de {{ userData.username }}</h2>
      <div class="profile-info">
        <!-- Informação do usuário -->
        <p><strong>E-mail:</strong> {{ userData.email }}</p>
        <p><strong>Telefone:</strong> {{ userData.telefone || 'Não disponível' }}</p>
        <p><strong>Endereço:</strong> {{ userData.endereco || 'Não disponível' }}</p>
        <p><strong>Idade:</strong> {{ userData.idade || 'Não disponível' }}</p>
        <p><strong>Gênero:</strong> {{ userData.genero || 'Não disponível' }}</p>
        <p><strong>Escolaridade:</strong> {{ userData.escolaridade || 'Não disponível' }}</p>
        <p><strong>Preferência de Quadrinhos:</strong> {{ userData.preferenciaQuadrinhos || 'Não disponível' }}</p>
        <p><strong>Papel:</strong> {{ userData.role === 'admin' ? 'Administrador' : 'Usuário' }}</p>
      </div>

      <!-- Grupo de botões -->
      <div class="button-group">
        <!-- Botões apenas para administradores -->
        <div v-if="userData.role === 'admin'" class="admin-buttons">
          <button @click="this.$router.push('/grafico')">Gráficos</button>
          <button @click="this.$router.push('/crud')">Edição dos Livros</button>
          <button @click="this.$router.push('/usuarios')">Gerenciar Usuários</button>
          <button @click="this.$router.push('/reservedbooks')">Status de Emprestimos</button>
        </div>

        <!-- Botões comuns -->
        <button @click="this.$router.push('/paginicial')">Página Inicial</button>
        <button @click="logout" class="logout">Sair</button>
      </div>
    </div>
    <!-- Mensagem de carregamento -->
    <div v-else class="loading">
      <p>Carregando...</p>
    </div>
  </body>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userData: null, // Dados do usuário
    };
  },
  mounted() {
    this.fetchUserProfile(); // Chama a função para buscar o perfil do usuário quando o componente é montado
  },
  methods: {
    // Função para buscar o perfil do usuário
    async fetchUserProfile() {
      const token = localStorage.getItem("token"); // Obtém o token de autenticação do local storage

      if (!token) {
        this.$router.push("/login"); // Redireciona para a página de login se não houver token
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { 'x-auth-token': token }, // Inclui o token no cabeçalho da requisição
        });

        if (response.data && response.data.user) {
          this.userData = response.data.user; // Define os dados do usuário
        } else {
          throw new Error('Dados do usuário não encontrados');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Sessão expirada, faça login novamente.");
          this.$router.push("/login");
        } else {
          console.error("Erro ao carregar o perfil:", error);
          alert("Ocorreu um erro ao carregar o perfil.");
          this.$router.push("/login");
        }
      }
    },
    // Função para realizar o logout
    logout() {
      localStorage.removeItem("token"); // Remove o token de autenticação do local storage
      alert("Você saiu da sua conta.");
      this.$router.push("/paginicial"); // Redireciona para a página inicial
    },
  },
};
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
  color: white;
}

/* Estilização do container de perfil */
.profile-container {
  background-color: rgba(255, 183, 0, 0.85);
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.profile-info p {
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
}

strong {
  color: #444;
}

/* Botões comuns */
button {
  background-color: #333;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  margin: 10px 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555;
}

/* Botões para administradores */
.admin-buttons button {
  background-color: #007bff;
}

.admin-buttons button:hover {
  background-color: #0056b3;
}

/* Botão de logout */
.logout {
  background-color: #e74c3c;
}

.logout:hover {
  background-color: #c0392b;
}

/* Mensagem de carregamento */
.loading p {
  font-size: 16px;
  text-align: center;
}
</style>
