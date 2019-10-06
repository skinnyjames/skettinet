import Vue from 'vue'
import Vuex from 'vuex'
import setup from './modules/setup'
import app from './modules/app'

Vue.config.devtools = true
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    setup,
    app
  }
})