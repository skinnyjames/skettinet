import { db, sql } from './../lib/db'
import { generateMultiple } from 'generate-password';

export namespace CategoryModel {
  export async function getAll() {
    return db.manyOrNone('select * from categories')
  }
}