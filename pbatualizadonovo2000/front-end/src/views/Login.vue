<template>
  <body>
    <!-- Logo do Senai -->
    <img class="logo" src="images/logo Senai.png" alt="Logo Senai" />

    <!-- Container principal do login -->
    <section class="login-container">
      <div class="form-container">
        <h2>Login</h2>
        <form @submit.prevent="loginUser"> <!-- Formulário de login -->
          <!-- Campo de Email -->
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" placeholder="Email" />
          </div>

          <!-- Campo de Senha -->
          <div class="form-group">
            <label for="password">Senha</label>
            <input id="password" v-model="password" type="password" placeholder="Senha" />
          </div>

          <!-- Botão de Login -->
          <button class="submit-btn" type="submit">Login</button>

          <!-- Link para Cadastro -->
          <button type="button" class="register-btn">
            <a href="/cadastro">Não tem cadastro? Cadastre-se já</a>
          </button>
        </form>

        <!-- Botões adicionais -->
        <button class="action-btn" @click="goToHome">Voltar para Página Inicial</button>

        <!-- Mensagem de erro -->
        <p v-if="message" class="error-message">{{ message }}</p>
      </div>
    </section>
  </body>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "", // Campo de email do usuário
      password: "", // Campo de senha do usuário
      message: "", // Mensagem de erro
    };
  },
  methods: {
    // Função para fazer login do usuário
    async loginUser() {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("token", response.data.token); // Armazena o token no local storage
        alert("Login bem-sucedido!"); // Alerta de sucesso no login
        this.$router.push("/paginicial"); // Redireciona para a página inicial
      } catch (error) {
        this.message =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro ao fazer login."; // Mensagem de erro
      }
    },
    // Função para redirecionar à página inicial
    goToHome() {
      this.$router.push("/paginicial");
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

.logo {
  width: 150px;
  margin-bottom: 20px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form-container {
  background-color: rgb(255, 183, 0);
  width: 90%;
  max-width: 400px;
  padding: 20px;
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

.submit-btn {
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

.submit-btn:hover {
  background: #555;
}

.register-btn {
  margin-top: 10px;
  background: none;
  border: none;
  color: #000;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}

.register-btn a {
  color: #333;
  text-decoration: none;
}

.register-btn a:hover {
  color: #555;
}

.action-btn {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background: #555;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.action-btn:hover {
  background: #777;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
