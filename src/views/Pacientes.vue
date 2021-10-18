<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table v-if='loaded' :headers='headers' :items='pacientes'>
            <template v-slot:item.id='{item}'>
              <router-link :to='idToLink(item.num_id)'> {{ item.id }} </router-link>
            </template>
          </v-data-table>
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
          text: 'ID Anônimo',
          value:'id'
        },
        {
          text: 'ID',
          value: 'num_id',
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
        return { id: data.ID_PACIENTE, num_id: data.ID, municipio: data.CD_MUNICIPIO }
      });
    });

    this.loaded = true;
  },
  methods: {
    idToLink: function(id) {
      return `/paciente/${id}`
    }
  }
}
</script>
