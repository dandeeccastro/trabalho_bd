<template>
  <v-container>
    <h1> Sobre o que você deseja ver hoje? </h1>
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
