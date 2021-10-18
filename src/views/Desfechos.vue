<template>
  <v-container>
    <v-row>

      <v-col>
        <v-card>
          <v-card-title> Desfechos </v-card-title>
          <myPieChart v-if='loaded' :chartdata='desfechosChartData'></myPieChart>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title> Desfechos por Munincipio </v-card-title>
          <myChart v-if='loaded' :chartdata='des_mun_g'></myChart>
        </v-card>
      </v-col>

    </v-row>
    <v-row>

      <v-col>
        <v-card>
          <v-card-title> Desfechos por Idade </v-card-title>
          <myChart v-if='loaded' :chartdata='des_id_g'></myChart>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title> Desfechos por Idade </v-card-title>
          <v-data-table v-if='loaded' :headers='des_id_h' :items='des_id'></v-data-table>
        </v-card>
      </v-col>

    </v-row>
    <v-row>

      <v-col>
        <v-card>
          <v-card-title> Desfechos por Idade </v-card-title>
          <v-data-table v-if='loaded' :headers='des_mun_h' :items='des_mun'></v-data-table>
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
import myChart from "@/components/MyChart.js"

export default {
  name: 'Desfechos',

  components: {
    myChart,
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

      des_mun_g: null,
      des_mun: null,
      des_mun_h: [
        {
          text: 'Desfecho',
          value: 'name'
        },
        {
          text: 'asdfi',
          value: 'mun'
        },
        {
          text: 'asdklfj',
          value: 'quant'
        }
      ],

      des_id_g: null,
      des_id: null,
      des_id_h: [
        {
          text: 'Desfecho',
          value: 'name'
        },
        {
          text: 'asdfi',
          value: 'idade'
        },
        {
          text: 'asdklfj',
          value: 'quant'
        }
      ],
    }
  },

  computed: {
    desfechosChartData: function() {
      const labels = this.desf.map( data => { return data.name })
      const data = this.desf.map( data => { return data.quant })
      console.log ({ labels:labels, datasets:[{  data:data }] } )
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
      this.des_mun_g = response.data.graphics 
      this.des_mun = response.data.desfechos.map ( data => {
        return { name: data.desfecho, mun: data.municipio, quant: data.quantidades } 
      })
    });
    await axios.get("./desfechos/idade").then( response => {
      this.des_id_g = response.data.graphics 
      this.des_id = response.data.desfechos.map( data => { 
        return { name: data.desfecho, idade: data.idade, quant: data.quantidade }
      }); 
    });

    // Seto loaded = true e todos os componentes "problemáticos" carregam
    this.loaded = true;
  }

}
</script>
