import Vue from 'vue'
import App from './App.vue'
import home from './home'

Vue.component("app-server",home)

new Vue({
  el: '#app',
  render: h => h(App)
})
