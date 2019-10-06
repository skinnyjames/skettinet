import { router } from './../../skettinet'
import { vue } from './../../skettinet'
import { AnyCnameRecord } from 'dns';

const state = {
}

const fields = [
  'file',
  'email', 
  'username', 
  'password', 
  'password_confirmation', 
  'born', 
  'first_name', 
  'last_name',
  'work_title',
  'bio',
  'email',
  'avatar'
]

fields.forEach(field => {
  state[field] = { value: null, error: ''}
});

const getters = {
  registration(state) {
    const data = {}
    for (var key in state) {
      data[key] = state[key].value
    }
    return data
  }
}
const actions = {
  async uploadAvatar({state, commit}) {
    const formData = new FormData()
    formData.append('file', state.file.value, state.file.value.name)
    try {
      const response: any = await vue.$http.post('/upload/avatar', formData, {  
        headers: {
          'Content-Type': 'mutipart/form-data'
        }
      })
      commit('avatar', response.body.filename)
    } catch(e) {

    }
  },
  async register(context) {
    const data = context.getters['registration']
    context.commit('clearErrors')
    try {
      const response = await vue.$http.post('/users/register', data)
      console.log(response)
    } catch (e) {
      if (e.body.type == 'ValidationError') {
        console.log(e.body)
        e.body.errors.forEach((error: any) => {
          context.commit(`${error.field}Error`, error.message)
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