
const state = {
  categories: []
}

const getters = {}
const actions = {
  async getAll({ state, commit }) {
    try {
      let response: any = await fetch('/categories')
      const body = await response.json()
      if (body) {
        commit('setCategories', body)
      }
    } catch(e) {
      console.log(e)
    }
  }
}

const mutations = {
  setCategories(state, value) {
    state.categories = value
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}