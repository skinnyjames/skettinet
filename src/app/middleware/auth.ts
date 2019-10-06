import { SessionModel } from '../models/session'
import { Session } from '../interfaces/session'
import { UserModel } from '../models/user'

export namespace AuthMiddleware {

  export async function check(req: any, res: any, next: any) {
    if (req.cookies.sketti) {
      let cookie = JSON.parse(req.cookies.sketti) 
      let sessionId = cookie.sessionId
      console.log('session', sessionId)
      try {
        let session: Session = await SessionModel.get(sessionId) 
        req.user = await UserModel.get(session.user_id)
        await SessionModel.update(sessionId)
        next()
      } catch(e) {
        next()
      }
    }
  }

  export async function auth(req: any, res: any, next: any) {
    if (req.cookies.sketti) {
      let cookie = JSON.parse(req.cookies.sketti) 
      let sessionId = cookie.sessionId
      try {
        let session: Session = await SessionModel.get(sessionId) 
        req.user = await UserModel.get(session.user_id)
        await SessionModel.update(sessionId)
        next()
      } catch (err) {
        sendRedirect(res)
      }
    } else {
      sendRedirect(res)
    }
  }

  function sendRedirect(res: any) {
    res.statusCode = 303
    res.send("You are not authorized to access this page")
  }
}

