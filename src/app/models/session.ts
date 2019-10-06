import { db, sql } from './../lib/db'
import { Session } from './../interfaces/session'
import { SessionError } from './../lib/errors'
import moment from 'moment'

export namespace SessionModel {
  export async function get(id: string): Promise<Session> {
    let sql = 'select * from sessions where guid = ${id}'
    let session: Session = await db.oneOrNone(sql, { id: id })
    if (!session) {
      throw new SessionError('no session')
    } else {
      // check expiration
      let expires = moment(session.expires)
      let now = moment() 
      if (now.isAfter(expires)) {
        // clear session
        await this.deleteById(id)
        throw new SessionError('session expired')
      } else {
        return session
      }
    }
  }

  export async function update(id: string): Promise<void> {
    await this.get(id)
    const expires = moment().add(1, 'day').format()
    const sql = 'update sessions set expires = ${expires} where guid = ${id}'
    await db.none(sql, { id: id, expires: expires })
  }

  export async function create(data: any): Promise<String> {
    await this.deleteByUser(data)
    const query = sql('session/create')
    const expires = moment().add(1, 'day').format()
    const id =  data.user.id
    const payload = { id, expires }
    let result = await db.one(query, payload)
    console.log(result, 'SesSION RESULT')
    return result.guid
  }

  export async function deleteById(id: string): Promise<void> {
    let sql = 'delete from sessions where guid = ${id}'
    await db.none(sql, {id: id})
  }

  export async function deleteByUser(data: any): Promise<void> {
    let sql = 'delete from sessions where user_id = ${id}'
    await db.none(sql, { id: data.user.id })
  }
}