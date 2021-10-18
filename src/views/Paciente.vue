<template>
  <v-container>
    <v-card>
      <v-card-title> Exames feitos pelo Paciente {{ this.$route.params.id }}</v-card-title>
      <v-data-table v-if='loaded' :headers='headers' :items='exame'></v-data-table>
    </v-card>
  </v-container>
</template>
<style></style>
<script>
import axios from 'axios'
export default {
  name: 'Paciente',
  data() {
    return {
      exame: null,
      loaded: false, 
      headers: [
        {
          text: 'Nome do Exame',
          value: 'name'
        }
      ],
    }
  },
  async mounted() {
    await axios.get(`/exames/paciente/${this.$route.params.id}`).then( response => {
      this.exame = response.data.exames.map( data => { return { name: data.exame } })
    });
    this.loaded = true;
  },
}
</script>
