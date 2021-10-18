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
      <v-col>
        <v-card>
          <v-card-title> Exames Aplicados por Clínica </v-card-title>
          <myChart v-if='loaded' :chartdata='exs_clin_g'></myChart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Exames Aplicados em Idosos </v-card-title>
          <myChart v-if='loaded' :chartdata='exs_pac_id_g'></myChart>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Exames Aplicados por Município </v-card-title>
          <myChart v-if='loaded' :chartdata='exs_mun_g'></myChart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Todos os Exames Aplicados por Município </v-card-title>
          <v-data-table v-if='loaded' :headers='exs_mun_h' :items='exs_mun' :search='exs_mun_s'>
            <template v-slot:top>
              <v-text-field v-model='exs_mun_s' label='Pesquisar' class='mx-4'></v-text-field>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Todos os Exames Aplicados por Idade ( Média )  </v-card-title>
          <v-data-table v-if='loaded' :headers='nasc_headers' :items='exs_nasc' :search='exs_nasc_s'>
            <template v-slot:top>
              <v-text-field v-model='exs_nasc_s' label='Pesquisar' class='mx-4'></v-text-field>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Todos os Exames Aplicados em Idosos </v-card-title>
          <v-data-table v-if='loaded' :headers='exs_pac_id_h' :items='exs_pac_id' :search='exs_pac_id_s'>
            <template v-slot:top>
              <v-text-field v-model='exs_pac_id_s' label='Pesquisar' class='mx-4'></v-text-field>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Todos os Exames Aplicados por Clínica  </v-card-title>
          <v-data-table v-if='loaded' :headers='exs_clin_h' :items='exs_clin' :search='exs_clin_s'>
            <template v-slot:top>
              <v-text-field v-model='exs_clin_s' label='Pesquisar' class='mx-4'></v-text-field>
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
import myChart from '@/components/MyChart.js'

export default {
  name: 'Exames',

  components: {
    myChart,
  },

  data () {

    return {
      loaded: false, 
      data_by_chart: 4,

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

      exs_clin: null,
      exs_clin_g: null,
      exs_clin_h: [
        {
          text: 'Clínica',
          value: 'name',
        },
        {
          text: 'Exame',
          value: 'exame'
        },
        {
          text: 'Quantidade',
          value: 'quant'
        }
      ],
      exs_clin_s: '',

      exs_pac_id: null,
      exs_pac_id_g: null,
      exs_pac_id_h: [
        {
          text: 'Exame',
          value: 'name',
        },
        {
          text: 'Data',
          value: 'dia'
        },
        {
          text: 'Quantidade',
          value: 'quant'
        }
      ],
      exs_pac_id_s: '',

      exs_mun: null,
      exs_mun_g: null,
      exs_mun_h: [
        {
          text: 'Exame',
          value: 'name',
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
      exs_mun_s: '',

      exs_nasc: null,
      nasc_headers: [
        {
          text: 'Exame',
          value: 'name'
        },
        {
          text: 'Ano de Nascimento',
          value: 'idade'
        },
      ],
      exs_nasc_s: '',

      exs_clin_pg: 1,
      exs_clin_pgs: 0,
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

    await axios.get("./exames/clinica").then( response => { 
      console.log(response.data)
      this.exs_clin_g = response.data.graphics 
      this.exs_clin = response.data.clinicas.map( data => { 
        return { name:data.clinica, exame:data.nome_exame, quant:data.quantidade }
      });
    });

    await axios.get("./exames/paciente_idoso").then( response => {
      console.log(response.data)
      this.exs_pac_id_g = response.data.graphics 
      this.exs_pac_id = response.data.exames.map( data => {
        return { name: data.exame, dia: data.dia_atendimento, quant: data.quantidade }
      })
    });

    await axios.get("./exames/municipio").then( response => {
      console.log(response.data)
      this.exs_mun_g = response.data.graphics 
      this.exs_mun = response.data.exames.map( data => {
        return { name: data.exame, mun: data.municipio, quant: data.quantidade } 
      })
    });

    await axios.get("./exames/avg_nasc").then( response => {
      this.exs_nasc = response.data.exams.map( data => {
        return { name: data.exame, idade: data.media_idade }
      })
    });

    // Seto loaded = true e todos os componentes "problemáticos" carregam
    this.loaded = true;
  },

  methods: {
    exClinParse: function( data ) {
      console.log( data ) 
      /*
      const clinicas = data.map( d => d.clinica ).filter((value, index, self) => self.indexOf(value) === index);
      const exames = data.map( d => d.nome_exame ).filter((value, index, self) => self.indexOf(value) === index);
      console.log(clinicas.length, exames.length)
      */
    }
  }

}
</script>
