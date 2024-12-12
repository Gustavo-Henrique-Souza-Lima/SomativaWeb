<template>
    <div class="dashboard">
      <h1>Bem-vindo a Biblioteca Senai Roberto Mange!</h1>
      <p>Você está autenticado.</p>
      <button @click="getToPage">Sair</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      getToPage() {
        window.location.href = 'paginaincial.html'
      },
      logout() {
        localStorage.removeItem('token'); // Remove o token JWT
        this.$router.push('/login'); // Redireciona para a página de login
      }
    }
  };
  </script>
  <style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Arial', sans-serif;
    text-align: center;
  }
  /* TITULO DO TEXTO */
  h1 {
    color: white;
    margin-bottom: 20px;
  }
  
  p {
    color: white;
    margin-bottom: 30px;
  }
  
  button {
    padding: 10px 20px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  button:hover {
    background-color: #c82333;
    transform: scale(1.4);
  }
  
  button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.5);
  }
  </style>
  