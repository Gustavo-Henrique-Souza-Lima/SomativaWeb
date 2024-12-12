<template>
  <body>
    <div class="chart-container">
      <h1 class="chart-title">Gráfico de Reservas</h1>
      <!-- Mensagem de carregamento -->
      <p v-if="loading" class="loading-message">Carregando dados...</p>
      <!-- Componente de gráfico ApexCharts -->
      <ApexCharts
        v-else
        :options="chartOptions"
        :series="chartData"
        type="bar"
        height="600"
      />
      <!-- Botão para voltar ao perfil -->
      <button class="back-button" @click="this.$router.push('/perfil')">Voltar ao Perfil</button>
    </div>
  </body>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import ApexCharts from "vue3-apexcharts";

export default defineComponent({
  components: {
    ApexCharts, // Registra o componente ApexCharts
  },
  data() {
    return {
      loading: true, // Indicador de carregamento de dados
      chartData: [
        {
          name: "Reservas", // Nome da série de dados do gráfico
          data: [], // Dados da série do gráfico
        },
      ],
      chartOptions: {
        chart: {
          type: "bar", // Tipo do gráfico
        },
        xaxis: {
          categories: [], // Categorias do eixo x, será preenchido com títulos dos livros
          title: {
            text: "Livros", // Título do eixo x
          },
        },
        yaxis: {
          title: {
            text: "Número de Reservas", // Título do eixo y
          },
        },
        title: {
          text: "Gráfico de Reservas de Livros", // Título do gráfico
          align: "center", // Alinhamento do título
        },
        plotOptions: {
          bar: {
            horizontal: false, // Barras verticais
            dataLabels: {
              position: "top", // Posição dos rótulos dos dados
            },
          },
        },
        dataLabels: {
          enabled: true, // Habilita rótulos de dados
          style: {
            fontSize: "12px", // Tamanho da fonte dos rótulos de dados
            colors: ["#304758"], // Cor da fonte dos rótulos de dados
          },
        },
      },
    };
  },
  mounted() {
    this.loadReservations(); // Carrega as reservas quando o componente é montado
  },
  methods: {
    // Função para carregar reservas
    loadReservations() {
      axios
        .get("http://localhost:3000/reservations") // Requisição à API para buscar reservas
        .then((response) => {
          const books = response.data; // Recebe os dados dos livros
          this.chartData[0].data = books.map((book) => book.reservations); // Mapeia o número de reservas para os dados do gráfico
          this.chartOptions.xaxis.categories = books.map((book) => book.title); // Mapeia os títulos dos livros para as categorias do eixo x
          this.loading = false; // Indica que os dados foram carregados
        })
        .catch((error) => {
          console.error("Erro ao carregar as reservas:", error); // Loga o erro no console
          this.loading = false; // Indica que houve um erro ao carregar os dados
        });
    },
  },
});
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  flex-direction: column;
  background-size: cover;
  background-image: url("https://img.elo7.com.br/product/zoom/22E441C/painel-cidade-herois-g-frete-gratis-lona.jpg");
}

.chart-container {
  width: 90%;
  max-width: 900px;
  padding: 20px;
  background-color: rgb(255, 183, 0);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.chart-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.loading-message {
  font-size: 1.2rem;
  color: #555;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.back-button:hover {
  background-color: #555;
}
</style>
