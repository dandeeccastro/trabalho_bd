<template>
  <v-container>
    <v-row>

      <v-col>
        <v-card>
          <v-card-title> Desfechos </v-card-title>
          <myPieChart v-if='loaded' :chartdata='desf'></myPieChart>
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
          <v-card-title> Todos os Desfechos por Idade </v-card-title>
          <v-data-table v-if='loaded' :headers='des_id_h' :items='des_id' :search='des_id_s'>
            <template v-slot:top>
              <v-text-field v-model='des_id_s' label='Pesquisar' class='mx-4'></v-text-field>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

    </v-row>
    <v-row>

      <v-col>
        <v-card>
          <v-card-title> Todos os Desfechos por Município </v-card-title>
          <v-data-table v-if='loaded' :headers='des_mun_h' :items='des_mun' :search='des_mun_s'>
            <template v-slot:top>
              <v-text-field v-model='des_mun_s' label='Pesquisar' class='mx-4'></v-text-field>
            </template>
          </v-data-table>
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
          text: 'Município',
          value: 'mun'
        },
        {
          text: 'Quantidade',
          value: 'quant'
        }
      ],
      des_mun_s: '',

      des_id_g: null,
      des_id: null,
      des_id_h: [
        {
          text: 'Desfecho',
          value: 'name'
        },
        {
          text: 'Idade',
          value: 'idade'
        },
        {
          text: 'Quantidade',
          value: 'quant'
        }
      ],
      des_id_s: '',
    }
  },

  computed: {
  },

  async mounted() {

    await axios.get("./desfechos").then( response => {
      this.desf = response.data.graphics;
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
