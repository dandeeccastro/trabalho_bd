<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table v-if='loaded' :headers='headers' :items='pacientes'></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
<script>
import axios from 'axios';

export default {
  name: "Pacientes",

  data () { 
    return {
      pacientes: null,
      loaded: false,

      headers: [
        {
          text: 'ID',
          value:'id'
        },
        {
          text: 'Código de Munincípio',
          value: 'municipio'
        }
      ],
    }
  },

  async mounted() {

    await axios.get("./pacientes").then( response => {
      console.log(response.data)
      this.pacientes = response.data.pacientes.map( data => {
        return { id: data.ID_PACIENTE, municipio: data.CD_MUNICIPIO }
      });
    });

    this.loaded = true;
  }
}
</script>
