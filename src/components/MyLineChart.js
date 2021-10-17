import { Line } from 'vue-chartjs';
export default { 
  name:"myLineChart",
  extends: Line,
  data: () => ({
    chartdata: {
      labels: ['Janeiro', 'Fevereiro','Março','Abril'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
          ],
          borderWidth: 1,
          data: [40,20,30,10]
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }),
  mounted() {
    this.renderChart(this.chartdata,this.options);
  }
} 
