<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Exames Feitos </v-card-title>
          <v-data-table v-if='loaded' :headers='headers' :items='exames' :search='search'>
            <template v-slot:top>
              <v-text-field v-model='search' label='Pesquisar' class='mx-4'></v-text-field>
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

export default {
  name: 'Exames',

  components: {
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
  },

  async mounted() {

    // Pra componentes que usam v-data-table, esse map pega eles e bota num formato bom
    await axios.get("./exames").then( response => {
      this.exames = response.data.exames.map( data => {
        return { name: data.exame, quant: data.quantidade }
      });
    });

    await axios.get("./exames/clinica").then( response => this.exClinParse(response.data.pacientes) );

    await axios.get("./exames/paciente_idoso").then( response => {
      console.log ( response.data ) 
    });

    await axios.get("./exames/municipio").then( response => {
      console.log ( response.data ) 
    });

    /*
    await axios.get("./exames/avg_nasc").then( response => {
      console.log ( response.data ) 
    });
    */

    // Seto loaded = true e todos os componentes "problemáticos" carregam
    this.loaded = true;
  },

  methods: {
    exClinParse: function( data ) {
      console.log( data ) 
      const clinicas = data.map( d => d.clinica ).filter((value, index, self) => self.indexOf(value) === index);
      const exames = data.map( d => d.nome_exame ).filter((value, index, self) => self.indexOf(value) === index);
      console.log(clinicas.length, exames.length)
    }
  }

}
</script>
