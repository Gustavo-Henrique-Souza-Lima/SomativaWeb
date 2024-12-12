<template>
  <body>
    <div class="form-container">
      <h2>Cadastro</h2>

      <!-- Campo de Usuário -->
      <div class="form-group">
        <label for="username">Usuário</label>
        <input id="username" v-model="username" placeholder="Usuário" />
      </div>

      <!-- Campo de E-mail -->
      <div class="form-group">
        <label for="email">E-mail</label>
        <input id="email" v-model="email" type="email" placeholder="E-mail" />
      </div>

      <!-- Campo de Senha -->
      <div class="form-group">
        <label for="password">Senha</label>
        <input id="password" v-model="password" type="password" placeholder="Senha" />
      </div>

      <!-- Campo de Telefone -->
      <div class="form-group">
        <label for="telefone">Telefone</label>
        <input id="telefone" v-model="telefone" type="tel" placeholder="Telefone" />
      </div>

      <!-- Campo de Endereço -->
      <div class="form-group">
        <label for="endereco">Endereço</label>
        <input id="endereco" v-model="endereco" placeholder="Endereço Completo" />
      </div>

      <!-- Campo de Idade -->
      <div class="form-group">
        <label for="idade">Idade</label>
        <input id="idade" v-model="idade" type="number" placeholder="Idade" min="0" max="120" />
      </div>

      <!-- Campo de Gênero -->
      <div class="form-group">
        <label for="genero">Gênero</label>
        <select id="genero" v-model="genero">
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
          <option value="prefiro_nao_dizer">Prefiro não dizer</option>
        </select>
      </div>

      <!-- Campo de Escolaridade -->
      <div class="form-group">
        <label for="ed">Escolaridade</label>
        <select id="ed" v-model="ed">
          <option value="fundamental">Ensino Fundamental</option>
          <option value="medio">Ensino Médio</option>
          <option value="superior">Ensino Superior</option>
          <option value="pos_graduacao">Pós Graduação</option>
          <option value="mestre">Mestrado</option>
          <option value="doutorado">Doutorado</option>
        </select>
      </div>

      <!-- Preferência de Quadrinhos -->
      <div class="form-group">
        <label for="comicPreference">Tema</label>
        <select id="comicPreference" v-model="comicPreference">
          <option value="marvel">Marvel</option>
          <option value="dc">DC</option>
          <option value="nenhuma">Nenhuma</option>
        </select>
      </div>

      <!-- Campo de Role -->
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="role">
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <!-- Botão -->
      <button class="submit-btn" @click="registerUser">Cadastrar</button>
    </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      telefone: "",
      endereco: "",
      idade: null,
      genero: "",
      ed: "",
      comicPreference: "",
      role: "user", // Default role is user
    };
  },
  methods: {
    async registerUser() {
      if (
        !this.username ||
        !this.email ||
        !this.password ||
        !this.telefone ||
        !this.endereco ||
        !this.idade ||
        !this.genero ||
        !this.ed ||
        !this.comicPreference
      ) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      if (this.idade < 0 || this.idade > 120) {
        alert("Idade inválida. Por favor, insira uma idade válida.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username: this.username,
            email: this.email,
            password: this.password,
            telefone: this.telefone,
            endereco: this.endereco,
            idade: this.idade,
            genero: this.genero,
            escolaridade: this.ed,
            preferenciaQuadrinhos: this.comicPreference,
            role: this.role,
          }
        );

        alert(response.data.message);
        localStorage.setItem("isRegistered", "true");
        this.$router.push("/login");
      } catch (error) {
        alert("Erro ao cadastrar: " + error.response.data.error);
      }
    },
  },
};
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
  background-size: cover;
  margin: 0;
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

input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

input:focus,
select:focus {
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
</style>
