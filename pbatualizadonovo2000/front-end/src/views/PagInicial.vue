<template>
  <body>
    <!-- Botão Perfil -->
    <button class="perfil" @click="goToProfile">Perfil</button>

    <!-- IMAGEM DO SENAI -->
    <img class="logo" src="images/logo Senai.png" alt="Logo SENAI" />

    <!-- TÍTULO DA PÁGINA -->
    <div class="titulo">
      <div class="texto">Biblioteca SENAI Conhecimento e Inovação</div>
    </div>

    <!-- Botões de Cadastrar e Entrar -->
    <div v-if="!isLoggedIn" class="auth-buttons">
      <button class="cadastro">
        <a href="/cadastro">Cadastrar-se</a>
      </button>
      <button class="entrar" @click="this.$router.push('/login')">
      Entrar
      </button>
    </div>

    <!-- Seção Sobre a Biblioteca -->
    <div class="sobre">
      <p>
        A Biblioteca do SENAI dos Super-Heróis oferece um espaço de estudo e eventos especiais, onde heróis da DC e da Marvel podem aprimorar suas habilidades.
        Com mentores como Batman e Doutor Estranho, a equipe especializada ajuda no acesso a informações essenciais para suas missões.
      </p>
    </div>

    <!-- Seção Carrossel de Curiosidades -->
    <div class="carrossel">
      <h2>Curiosidades dos Heróis</h2>
      <div class="carousel-container">
        <button @click="prevSlide" class="carousel-button prev">◀</button>
        <div class="carousel-slide">
          <p>{{ curiosidades[slideIndex] }}</p>
        </div>
        <button @click="nextSlide" class="carousel-button next">▶</button>
      </div>
    </div>

    <!-- Seção Catálogo de Livros -->
    <div class="catalogo">
      <h3>Quer ter acesso ao catálogo de livros?</h3>
      <button @click="goToProfilee" class="catalogoo">Catálogo</button>
    </div>

    <!-- Destaques -->
    <div class="destaques">
      <h2>Novidades</h2>
      <div class="destaque-item">
        <h4>Eventos Especiais</h4>
        <p>Participe de eventos exclusivos com super-heróis e mentores do SENAI.</p>
      </div>
      <div class="destaque-item">
        <h4>Programas de Mentoria</h4>
        <p>Receba mentorias personalizadas de heróis experientes como Batman e Doutor Estranho.</p>
      </div>
    </div>

    <!-- Rodapé -->
    <footer>
      <button class="politica" @click="this.$router.push('/politica')">Política da Biblioteca</button>
    </footer>
  </body>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Indica se o usuário está logado
      slideIndex: 0, // Índice do slide atual no carrossel
      curiosidades: [ // Array de curiosidades para o carrossel
        "Sabia que o Superman foi originalmente concebido como um vilão?",
        "A armadura do Homem de Ferro foi feita em uma caverna por Tony Stark usando sucata.",
        "O Batman treinou com ninjas na Liga das Sombras antes de se tornar o Cavaleiro das Trevas.",
        "O Martelo de Thor, Mjölnir, é feito de um material chamado Uru e só pode ser levantado por aqueles que são dignos.",
        "O Flash já correu tão rápido que quebrou a barreira do tempo e alterou a história."
      ]
    };
  },
  mounted() {
    this.checkLoginStatus(); // Verifica o status de login ao montar o componente
  },
  methods: {
    // Verifica se o usuário está logado
    checkLoginStatus() {
      const token = localStorage.getItem("token");
      this.isLoggedIn = !!token; // Define isLoggedIn como true se o token estiver presente
    },
    // Redireciona para a página de perfil
    goToProfile() {
      if (this.isLoggedIn) {
        this.$router.push("/perfil");
      } else {
        alert("Você precisa fazer login para acessar o perfil.");
      }
    },
    // Redireciona para a página do catálogo de livros
    goToProfilee() {
      if (this.isLoggedIn) {
        this.$router.push("/bookscatalog");
      } else {
        alert("Você precisa fazer login para acessar o catálogo.");
      }
    },
    // Mostra o próximo slide do carrossel
    nextSlide() {
      this.slideIndex = (this.slideIndex + 1) % this.curiosidades.length;
    },
    // Mostra o slide anterior do carrossel
    prevSlide() {
      this.slideIndex = (this.slideIndex - 1 + this.curiosidades.length) % this.curiosidades.length;
    }
  }
};
</script>

<style scoped>

/* Corpo da Aplicação */
body {
  background-image: url('https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  color: white;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  padding: 20px;
}

/* Botão Perfil */
.perfil {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  background: linear-gradient(90deg, #000000, #cab008);
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background 0.3s ease;
}

.perfil:hover {
  transform: scale(1.1);
  background: linear-gradient(90deg, #000000, #a6820c);
}

/* Imagem do SENAI */
.logo {
  display: block;
  margin: 20px auto;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

/* Título */
.titulo {
  text-align: center;
  color: white;
  margin-top: 30px;
  background: rgba(255, 183, 0, 0.9);
  padding: 15px 20px;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  width: 90%;
  max-width: 500px;
}

.texto {
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

/* Botões de Autenticação */
.auth-buttons {
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cadastro,
.entrar {
  padding: 12px 30px;
  background: linear-gradient(90deg, #000000, #c0970d);
  color: black;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease, background 0.3s ease;
}

.cadastro:hover,
.entrar:hover {
  transform: translateY(-5px);
  background: linear-gradient(90deg, #000000, #c6a616);
}

/* Sobre a Biblioteca */
.sobre {
  text-align: center;
  color: black;
  font-size: 1.2rem;
  background: rgba(255, 183, 0, 0.9);
  width: 90%;
  max-width: 750px;
  margin-top: 40px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
}

/* Carrossel */
.carrossel {
  margin-top: 40px;
  width: 90%;
  max-width: 750px;
  text-align: center;
  background: rgba(0, 0, 0, 0.7); /* Fundo semitransparente preto */
  padding: 20px;
  border-radius: 15px; /* Borda arredondada */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); /* Sombra */
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.carousel-button {
  padding: 10px 20px;
  background: rgba(255, 183, 0, 0.9); /* Fundo amarelo para os botões */
  color: black;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background 0.3s ease;
}

.carousel-button:hover {
  transform: scale(1.2);
  background: rgba(255, 183, 0, 1);
}

.carousel-slide p {
  font-size: 1.2rem;
  color: white; /* Texto branco para contraste */
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Catálogo */
.catalogo {
  margin-top: 40px;
  text-align: center;
}

.catalogoo {
  padding: 12px 25px;
  background: linear-gradient(90deg, #000000, #d4bc03);
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease, background 0.3s ease;
}

.catalogoo:hover {
  transform: scale(1.1);
  background: linear-gradient(90deg, #000000, #000000);
}

/* Destaques */
.destaques {
  margin-top: 40px;
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.destaque-item {
  background: rgba(255, 183, 0, 0.9);
  padding: 20px;
  width: 45%;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.destaque-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
}

.destaque-item h4 {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.destaque-item p {
  font-size: 1rem;
  color: #333;
}

/* Rodapé */
footer {
  text-align: center;
  margin-top: 50px;
}

.politica {
  background: linear-gradient(90deg, #000000, #000000);
  color: white;
  padding: 12px 25px;
  border-radius: 25px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
}

.politica:hover {
  transform: scale(1.1);
  background: linear-gradient(90deg, #000000, #000000);
}

/* Responsividade */
@media (max-width: 768px) {
  .titulo {
    font-size: 1.2rem;
  }

  .destaque-item {
    width: 100%;
  }

  .sobre {
    font-size: 1rem;
  }
}

</style>



















