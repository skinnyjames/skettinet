import Vue from 'vue'
import Vuex from 'vuex'
import setup from './modules/setup'
import app from './modules/app'
import register from './modules/register'
import login from './modules/login'
import me from './modules/me'
import forum from './modules/forum'
import post from './modules/post'
import categories from './modules/categories'

Vue.config.devtools = true
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    setup,
    app,
    login,
    register,
    me,
    forum,
    post,
    categories
  }
})