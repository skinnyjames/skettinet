import { router } from './../../skettinet'
import { vue } from './../../skettinet'

const state = {
}

const fields = [
  'username', 
  'password', 

]
fields.forEach(field => {
  state[field] = { value: null, error: ''}
});

const getters = {
  data(state) {
    const data = {}
    for (var key in state) {
      data[key] = state[key].value
    }
    return data
  }
}
const actions = {
  async login({ state, commit, getters }) {
    const data = getters['data']
    commit('clearErrors')
    try {
      await vue.$http.post('/users/login', data)
  
    } catch(e) {
      if (e.body.type == 'ValidationError') {
        e.body.errors.forEach((error: any) => {
          commit(`${error.field}Error`, error.message)
        })
      }
    }
  }
}

const mutations = {
  clearErrors(state, value) {
    for(var key in state) {
      state[key].error = null
    }
  }
}

fields.forEach((field: string) => {
  mutations[field] = (state, value) => {
    state[field].value = value
  }
  mutations[`${field}Error`] = (state, value) => {
    state[field].error = value
  }
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}