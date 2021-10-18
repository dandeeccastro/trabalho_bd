<template>
  <v-container>
    <v-row>
      <v-col>
    <v-card class='pa-4 ma-4'>
      <v-card-title> Informações Importantes </v-card-title>
    <ul>
      <li> Os IDs são anonimizados para manter a privacidade das pessoas atendidas pelo Hospital Sírio Libanês. Por isso temos dois IDs: um hexadecimal e outro decimal </li>
      <li> O município que consta como MMMM é equivalente ao NULL, ou seja, um município não registrado </li>
    </ul>
    </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <router-link to="/exames"> Exames </router-link>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            <router-link to="/clinicas"> Clinicas </router-link>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            <router-link to="/desfechos"> Desfechos </router-link>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            <router-link to="/pacientes"> Pacientes </router-link>
          </v-card-title>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',

  components: {
  },

  data () {

    return {
    }
  },

  computed: {
  },

  async mounted() {
  }

}
</script>
