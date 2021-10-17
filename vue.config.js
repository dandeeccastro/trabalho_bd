module.exports = {
  devServer: {
    proxy: "https://hsl-backend-analysis.herokuapp.com/",
  },
  transpileDependencies: [
    'vuetify'
  ]
}
