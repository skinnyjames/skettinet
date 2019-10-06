import { router } from './../../skettinet'
import { vue } from './../../skettinet'

import Vue from 'vue'

const state = {
  authenticated: false,
  username: null,
  email: null,
  born: null,
  first_name: null,
  last_name: null,
  bio: null,
  experience: 0,
  admin: false,
  id: null,
}
const getters = {
}
const actions = {
  async get({commit}) {
    try {
      commit('app/loading', true, { root: true })
      let response: any = await fetch('/users/me')
      const body = await response.json()
      console.log(body)
      if (body.authenticated) {
        commit('setProps', body)
        commit('app/loading', false, { root: true })
      }
    } catch(e) {
      console.log(e)
    }
  }
}
const mutations = {
  setProps(state, data) {
    for(var key in data) {
      state[key] = data[key]
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}