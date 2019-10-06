import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import Sketti from './components/sketti.vue'
import Setup from './components/setup.vue'
import Forum from './components/forum.vue'
import Register from './components/register/register.vue'
import VueResource from 'vue-resource';

Vue.config.devtools = true
Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueResource);

const routes = [
  { 
    path: '/', 
    component: Forum, 
    async beforeEnter(to, from, next) {
      if (from.path !== '/') {
        await store.dispatch('me/get')
      }
      next()
    } 
  },
  { path: '/setup', component: Setup }, 
  { path: '/register', component: Register }
]

export const router = new Router({
  routes
})

declare global {
  interface Window { setup: boolean; }
}

const interceptor = (request) => {
  router.app.$store.commit('app/loading', true)
  return function(response) {
    if (response.status == 303) {
      router.push('/')
    }
    router.app.$store.commit('app/loading', false)
  }
}

(Vue as any).http.interceptors.push(interceptor)

export const vue = new Vue({
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

