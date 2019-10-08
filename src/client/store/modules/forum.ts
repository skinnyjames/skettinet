import { router } from './../../skettinet'
import { vue } from './../../skettinet'

const state = {
  posts: [],
}
const getters = {
}
const actions = {
  async posts({commit}) {
    try {
      let response: any = await fetch('/posts')
      const body = await response.json()
      console.log(body)
      if (body) {
        commit('posts', body)
      }
    } catch(e) {
      console.log(e)
    }
  }
}

const mutations = {
  posts(state, posts) {
    state.posts = posts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}