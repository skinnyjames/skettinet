import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import Sketti from './components/sketti.vue'
import Setup from './components/setup.vue'
import Forum from './components/forum.vue'

Vue.config.devtools = true
Vue.use(Router)
Vue.use(Vuex)

const routes = [
  { path: '/', component: Forum },
  { path: '/setup', component: Setup }
]

export const router = new Router({
  routes
})

declare global {
  interface Window { setup: boolean; }
}

new Vue({
  vuetify,
  store, 
  router,
  render: h => h(Sketti),
  mounted() {
    if (window.setup) {
      router.push('/setup')
    }
  },
}).$mount('#app')