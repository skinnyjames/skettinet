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
  experienceTitle(state) {
    const exp = state.experience
    let title = ''
    if (exp < 0) {
      title = 'SkettiShamed'
    } 
    if (exp === 0) {
      title = 'Newbie'
    }
    if (exp > 0) {
      title = 'SkettiPHILE'
    }
    return title
  },
  title(state) {
    let title = ''
    return (exp) => {
      if (exp < 0) {
        title = 'SkettiShamed'
      } 
      if (exp === 0) {
        title = 'Newbie'
      }
      if (exp > 0) {
        title = 'SkettiPHILE'
      }
      return title
    }
  }
}
const actions = {
  async get({commit}) {
    try {
      let response: any = await fetch('/users/me')
      const body = await response.json()
      if (body.authenticated) {
        commit('setProps', body)
      }
    } catch(e) {
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