<template>
  <div>
    <!-- Canvas para renderizar o gráfico com uma borda para visualização -->
    <canvas ref="chart" style="border: 1px solid #000;"></canvas>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { Chart } from 'chart.js';

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chartRef = ref(null);
    let chartInstance = null;

    // Quando o componente for montado
    onMounted(() => {
      console.log('Componente GraphChart montado');
      console.log('Dados do gráfico:', props.chartData); // Verifique os dados que estão sendo passados

      if (chartRef.value) {
        // Criação do gráfico quando o canvas estiver disponível
        chartInstance = new Chart(chartRef.value, {
          type: 'bar', // Tipo de gráfico
          data: props.chartData, // Dados do gráfico
          options: props.chartOptions, // Opções do gráfico
        });
      }
    });

    // Para atualizar o gráfico quando os dados mudarem
    watch(
      () => props.chartData,
      (newData) => {
        if (chartInstance) {
          chartInstance.data = newData; // Atualizando os dados
          chartInstance.update(); // Atualiza o gráfico
        }
      },
      { deep: true }
    );

    return {
      chartRef,
    };
  },
};
</script>
