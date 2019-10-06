import Validator from '../lib/validator'

const userSchema = new Validator({
  presence: ['username', 'work_title', 'first_name', 'last_name', 'bio', 'born', 'email','password', 'password_confirmation'],
  regex: {
    born: /^\d{4}-\d{2}-\d{2}$/
  },
  custom: [
    (user: any) => {
      return {
        condition: user.password == user.password_confirmation, 
        message: "passwords don't match", 
        fields: ['password', 'password_confirmation']
      }
    },
  ]
})

const loginSchema = new Validator({
  presence: ['username', 'password']
})

const passwordReset = new Validator({
  presence: ['password', 'password_confirmation'],
  custom: [
    (artistData: any) => {
      return {
        condition: artistData.password === artistData.password_confimration, 
        error: "passwords don't match", 
        fields: ['password', 'password_confirmation']
      }
    },
  ]
})

export { passwordReset, loginSchema, userSchema }