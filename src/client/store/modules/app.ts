import { router } from './../../skettinet'

const state = {
  username: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: ''
  }
}
const getters = {
}
const actions = {
}
const mutations = {
  username(state, value) {
    state.username.value = value
  },
  password(state, value) {
    state.password.value = value
  },
  error(state, data) {
    state[data.field].error = data.error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}