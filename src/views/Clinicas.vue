<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Atendimentos por Clinicas </v-card-title>
          <v-pagination v-model='aten_cli_pg' :length='aten_cli_pgs'></v-pagination>
          <myChart v-if='loaded' :chartdata='atendimentosChartData'></myChart>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Desistências por Clinicas </v-card-title>
          <v-pagination v-model='aten_des_pg' :length='aten_des_pgs'></v-pagination>
          <myChart v-if='loaded' :chartdata='desistenciasChartData'></myChart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Altas e Óbitos por Clínicas </v-card-title>
          <myChart v-if='loaded' :chartdata='cli_alt_ob_g'></myChart>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Altas e Óbitos por Clínicas </v-card-title>
          <v-data-table v-if='loaded' :headers='cli_alt_ob_h' :items='cli_alt_ob'></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
<script>
// @ is an alias to /src
import axios from 'axios'
import myChart from "@/components/MyChart.js"

export default {
  name: 'Exames',

  components: {
    myChart,
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

      aten_cli: null,
      aten_cli_pg: 1,
      aten_cli_pgs: 0,

      aten_des: null,
      aten_des_pg: 1,
      aten_des_pgs: 0,

      cli_alt_ob: null,
      cli_alt_ob_g: null,
      cli_alt_ob_h: [
        {
          text: 'Clinica',
          value: 'name',
        },
        {
          text: 'Desfecho',
          value: 'desfecho'
        },
        {
          text: 'Quantidade',
          value: 'quant'
        }
      ],
    }
  },

  computed: {
    // Isso retorna os dados no formato necessário para o chart.js entender
    // Recomendo copiar e colar, porque é meio chato refatorar isso pra não depender 
    // dos dados da API 
    atendimentosChartData: function() {
      const i = ( this.aten_cli_pg - 1 ) * this.data_by_chart;
      const j = i + this.data_by_chart;
      const labels = this.aten_cli.map( data => { return data.name }).slice(i,j)
      const data = this.aten_cli.map( data => { return data.quant }).slice(i,j)
      return { labels:labels, datasets:[{ label: "Pelamordedeus", data:data }] } 
    },
    desistenciasChartData: function() {
      const i = ( this.aten_des_pg - 1 ) * this.data_by_chart;
      const j = i + this.data_by_chart;
      const labels = this.aten_des.map( data => { return data.name }).slice(i,j)
      const data = this.aten_des.map( data => { return data.quant }).slice(i,j)
      return { labels:labels, datasets:[{ label: "Pelamordedeus", data:data }] } 
    },
  },

  async mounted() {
    // Pra componentes que não usam v-data-table, como os do chart.js, eu deixo no formato
    // do v-data-table e mudo eles via métodos do computed
    await axios.get("./clinicas/atendimento").then( response => {
      this.aten_cli = response.data.clinicas.map( data => {
        return { name: data.clinica, quant: data.atendimentos }
      });
      // Pra paginação, precisamos saber qual o número total de páginas que vai ter 
      this.aten_cli_pgs = Math.floor( this.aten_cli.length / this.data_by_chart );
    });

    await axios.get("./clinicas/desistencia").then( response => {
      this.aten_des = response.data.clinicas.map( data => {
        return { name: data.clinica, quant: data.desistencias }
      });
      // Pra paginação, precisamos saber qual o número total de páginas que vai ter 
      this.aten_des_pgs = Math.floor( this.aten_des.length / this.data_by_chart );
    });

    await axios.get("./clinicas/altas_obitos").then( response => {
      console.log(response.data)
      this.cli_alt_ob_g = response.data.graphics;
      this.cli_alt_ob = response.data.clinicas.map( data => {
        return { name: data.clinica, desfecho: data.desfecho, quant: data.quantidade } 
      });
    });


    // Seto loaded = true e todos os componentes "problemáticos" carregam
    this.loaded = true;
  }

}
</script>
