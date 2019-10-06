import { router } from './../../skettinet'
import { vue } from './../../skettinet'

const state = {
  loading: false,
}
const getters = {
}
const actions = {
}
const mutations = {
  loading(state, data: boolean) {
    state.loading = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}