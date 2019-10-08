import { vue } from './../../skettinet'

const state = {
}

const fields = [
  'user_id',
  'category_id',
  'title',
  'body',
  'quote',
  'quotee'
]

fields.forEach(field => {
  state[field] = { value: null, error: ''}
});

const getters = {
  values(state) {
    const data = {}
    for (var key in state) {
      data[key] = state[key].value
    }
    return data
  }
}

const mutations = {
  clearErrors(state, value) {
    for(var key in state) {
      state[key].error = null
    }
  },
  clearAll(state, value) {
    for (var key in state) {
      state[key].error = null
      state[key].value = null
    }
  }
}

const actions = {
  async post({getters, commit}) {
    const data = getters['values']
    commit('clearErrors')
    try {
      const response = await vue.$http.post('/posts', data)
    } catch (e) {
      if (e.body.type == 'ValidationError') {
        e.body.errors.forEach((error: any) => {
          commit(`${error.field}Error`, error.message)
        })
      }
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