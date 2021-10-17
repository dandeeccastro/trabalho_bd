<template>
  <v-container>
    <v-row>

      <v-col>
        <v-card>
          <v-card-title> Desfechos </v-card-title>
          <myPieChart v-if='loaded' :chartdata='desfechosChartData'></myPieChart>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>
<style></style>
<script>
// @ is an alias to /src
import axios from 'axios'
import myPieChart from "@/components/MyPieChart.js"

export default {
  name: 'Desfechos',

  components: {
    myPieChart,
  },

  data () {

    return {
      loaded: false, 
      data_by_chart: 10,

      search: '',
      headers: [
        {
          text: "Exames",
          value: "name"
        },
        {
          text: "Quantidade",
          value: "quant"
        },
      ],

      exames: null,

      aten_cli: null,
      aten_cli_pg: 1,
      aten_cli_pgs: 0,

      desf: null,
    }
  },

  computed: {
    desfechosChartData: function() {
      const labels = this.desf.map( data => { return data.name })
      const data = this.desf.map( data => { return data.quant })
      return { labels:labels, datasets:[{  data:data }] } 
    },
  },

  async mounted() {

    await axios.get("./desfechos").then( response => {
      this.desf = response.data.desfechos.map( data => {
        return { name: data.desfecho, quant: data.quantidade }
      });
    });
    await axios.get("./desfechos/municipio").then( response => {
      console.log( response.data ) 
    });
    await axios.get("./desfechos/idade").then( response => {
      console.log( response.data ) 
    });

    // Seto loaded = true e todos os componentes "problemáticos" carregam
    this.loaded = true;
  }

}
</script>
