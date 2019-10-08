import { db, sql } from './../lib/db'
import { Session } from './../interfaces/session'
import { SessionError, ValidationError } from './../lib/errors'
import { PostSchema } from './../validations/post'
import moment from 'moment'

export namespace PostModel {

  export async function get(id: Number) {
  }

  export async function getAll() {
    const query = sql('post/get-all')
    return db.manyOrNone(query)
  }

  export async function validate(post: any): Promise<void> {
    const errors = PostSchema.validate(post)
    if (errors.length > 0) {
      throw new ValidationError('Please check the following errors', errors)
    }
  }

  export async function create(post: any): Promise<Number> {
    await validate(post)
    post = {
      quote: '',
      quotee: '',
      ...post
    }
    const query = sql('post/create')
    const result: any = await db.one(query, post) 
    return result.id
  }

  export async function update(post: any) {

  }
  export async function destroy(id: Number) {
    return db.none('delete from posts where id = $(id)', { id })
  }

}