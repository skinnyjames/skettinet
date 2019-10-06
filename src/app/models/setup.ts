import { db } from './../lib/db'

export namespace SetupModel {
  export async function setupRequired() {
    const record = await db.one('select exists(select id from users limit 1)')
    return !record.exists
  }
}