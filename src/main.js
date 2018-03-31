import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './style/main.styl'
import App from './App'

window.Vue = Vue

Vue.use(Vuetify, {
  theme: {
    primary: '#40B181'
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
