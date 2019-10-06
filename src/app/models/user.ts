import { db, sql }  from './../lib/db'
import { ValidationError, SystemError } from '../lib/errors'
import { loginSchema, userSchema } from '../validations/user'
import { SessionModel } from './session'
import moment from 'moment'
import bcrypt from 'bcrypt'
import generator from 'generate-password'

export namespace UserModel {
  
  export function get(id: Number) {
    const query = sql('user/get')
    return db.one(query, { id: id })
  }

  export function getAll() : Promise<Array<Object>> {
    return db.manyOrNone('select id, username, born, avatar, admin, experience(id) from users')
  }

  export async function registerZiggy() {
    await create({
      username: 'Ziggy',
      password_hash: 'fffff',
      password_salt: 'ddd',
      email: 'ziggy@sketti.net',
      bio: '...',
      avatar: 'ziggy.png',
      work_title: '...',
      admin: true, 
      born: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  export async function startResetPassword(email: string): Promise<string> {
    const user = await getByEmailOrUsername(email)
    if (user) {
      const expires = moment().add(1, 'day').format()
      const sql = 'insert into reset (expires) values ($(expires)) returning uuid'
      const result: any = db.one(sql, { expires })
      return result.uuid
    } else {
      throw new SystemError('That email doesnt exist')
    }
  }

  export async function getResetUser(uuid: string) {
    const user = await db.oneOrNone('select u.id, u.username, r.expires from reset as r inner join users as u on r.user_id = u.id where r.uuid = $(uuid)', { uuid })
    if (!user) {
      throw new SystemError('User doesnt exist')
    }

    if (moment().isAfter(moment(user.expires))) {
      await db.none('delete from reset where uuid=$(uuid)', { uuid })
      throw new SystemError('Your password reset has expired')
    }
    return user
  }

  export async function resetPassword(data: any): Promise<void> {
    // whitelist validation
    validateLogin(data)
    let user = await get(data.id)
    if (!user) {
      throw new SystemError('that user doesnt exist')
    }
    data = await inflatePassword(data)
    await db.none('update users set password_hash=$(password_hash), password_salt=$(password_salt) where id=$(id)', data)
  }

  export async function registerAdmin(user: Object) {
    await validate(user)
    user = await inflatePassword(user, false)
    const record = await create(user, true)
    return SessionModel.create({ user: record })
  }

  export async function register(user: Object) {
    await validate(user)
    user = await inflatePassword(user, false)
    const record = await create(user, false)
    return SessionModel.create({ user: record })
  }

  export async function create(user: any, admin: boolean = false): Promise<Object> {
    let data = {
      ...user,
      admin: admin,
      born: moment(user.born, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss'),
    }
  
    let query = sql('user/create')
    return await db.one(query, data)
  }

  export async function validate(user: any): Promise<void> {
    let errors = userSchema.validate(user)
    if (errors.length > 0) {
      throw new ValidationError('Please check the following errors', errors)
    }
    const result = await db.oneOrNone('select id, username, email from users where username=$(username) or email=$(email)', user)
    if (result) {
      const errors = []
      if (result.username == user.username) {
        errors.push({field: 'username', message: 'That name is already taken'})
      }
      if (result.email == user.email) {
        errors.push({field: 'email', message: 'That name is already taken'})
      }
      console.log(result)
      throw new ValidationError('Please check the following errors', errors)
    }
  }

  export async function inflatePassword(user: any, random: boolean = false) {
    let password = random ? generatePassword() : user.password
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
    return {
      password_salt: salt,
      password_hash: hash,
      ...user
    }
  }

  export function generatePassword(): string{
    return generator.generate({
      length: 10, 
      numbers: true
    })
  }

  export async function validateLogin(loginData: any): Promise<void> {
    let errors = loginSchema.validate(loginData)
    if (errors.length > 0) {
      throw new ValidationError('Please correct the following errors', errors)
    }
  }

  export async function authenticate(loginData: any): Promise<String> {
    await validateLogin(loginData)
    let check = await this.comparePassword(loginData)
    if (!check.authenticated) {
      let errors = [{
        field: 'username',
        message: 'incorrect'
      },{
        field: 'password',
        message: 'incorrect'
      }]
      throw new ValidationError('Login failed', errors)
    } else {
      let sessionId = await SessionModel.create(check)
      return sessionId.toString()
    }
  }

  export async function comparePassword(loginData: any): Promise<Object> {
    let check: any = { authenticated: false, user: null }
    const user = await this.getByEmailOrUsername(loginData.username);

    if (!user) {
      return check
    } else {
      try {
        let match = await bcrypt.compare(loginData.password, user.password_hash)
        if (!match) {
          return check
        } else {
          console.log("MATCH")
          check.authenticated = true
          check.user = user
          return check
        } 
      } catch(err) {
        return check
      }
    }
  }

  export async function getByEmailOrUsername(emailOrUsername: string) : Promise<Object> | null {
    let sql = 'select * from users where email = ${data} OR username = ${data} limit 1'
    return db.oneOrNone(sql, { data: emailOrUsername })
  }
}
