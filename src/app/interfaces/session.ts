import { Request } from 'express'

export interface Session {
  user_id: number,
  id: number,
  expires: any,
  created_at: any,
  payload: any
}

export interface ISessionRequest extends Request {
  user: any
}