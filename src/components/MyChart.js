import { Bar } from 'vue-chartjs';

export default {
  name: "myChart",
  extends: Bar,

  props: {
    chartdata: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  }),

  watch: {
    chartdata(val) {
      this.renderChart(val, this.options);
    }
  },

  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
}
