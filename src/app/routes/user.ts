import { Router } from 'express'
import { ISessionRequest } from './../interfaces/session'
import { UserModel } from './../models/user'
import { ValidationError, SystemError } from '../lib/errors'
import { AuthMiddleware } from '../middleware/auth'
import mailer from './../lib/mailer'
import move from 'move-file'
import fs from 'fs';
import util from 'util'

const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)
const stat = util.promisify(fs.stat)
const router = Router()

router.get('/me', AuthMiddleware.check, async (req: any, res: any) => {
  if (req.user) {
    req.user.authenticated = true
    res.send(req.user)
  } else {
    res.send({ authenticated: false })
  }
})

router.post('/register', async (req: any, res: any) => {
  const data = req.body
  console.log(data)
  try {
    const sessionId = await UserModel.register(data)
    res.cookie('sketti', JSON.stringify({ sessionId: sessionId }))
    cleanupAvatar(data.avatar)
    res.statusCode = 200
    res.send()
  } catch (e) {
    if (e instanceof ValidationError) {
      res.statusCode = 401
      res.send(e)
    } else {
      console.log(e)
      res.statusCode = 500
      res.send('Something went wrong')
    }
  }

  async function cleanupAvatar(filename: string): Promise<void> {
    const oldPath = `public/temp/${filename}`
    let newPath = `public/avatars/${filename}`
    await move(oldPath, newPath, {overwrite: false})
    // clear temp
    const tempFiles = await readdir('public/temp')
    const unlinks = tempFiles.map((temp) => {
      return unlink(`public/temp/${temp}`)
    })
    await Promise.all(unlinks)
  }
})

router.post('/login', async (req: any, res: any) => {
  const data = req.body
  try {
    let sessionId = await UserModel.authenticate(data)
    res.cookie('sketti', JSON.stringify({ sessionId: sessionId }))
    res.statusCode = 303
    res.send({})
  } catch (err) {
    console.log(err)
    if (err instanceof ValidationError) {
      res.statusCode = 401
      res.send(err)
    } else {
      res.statusCode = 500
      res.send(err)
    }
  }
})

router.post('/reset', async (req: any, res: any) => {
  const email = req.body.email
  try {
    const uuid = UserModel.startResetPassword(email)
    const host: string = req.get('host')
    await mailer.resetPassword({ uuid, email, host })
  } catch (e) {
    res.statusCode = 500
    res.send('cant')
  }
})

router.get('/password/:uuid', async (req: any, res: any) => {
  const uuid = req.params.uuid
  try {
    const user = UserModel.getResetUser(uuid)
    res.statusCode = 200
    res.send(user)
  } catch (e) {
    if (e instanceof SystemError) {
      res.statusCode = 500
      res.send(e.message)
    }
  }
})

router.post('/password', async (req: any, res: any) => {
  const data = req.body
  try {
    await UserModel.resetPassword(data)
  } catch (e) {
    res.statusCode(500)
    res.send('Could not reset password')
  }
})

router.get('/', async (req: any, res: any) => {
  try {
    const users = await UserModel.getAll()
    res.statusCode = 200
    res.send(users)
  } catch (e) {
    res.statusCode = 500
    res.send('Cannot fetch users')
  }
})

router.get('/:id', async (req: any, res: any) => {
  try {
    const users = await UserModel.get(req.params.id)
    res.statusCode = 200
    res.send(users)
  } catch (e) {
    res.statusCode = 500
    res.send('Cannot fetch users')
  }
})

// router.put('/:id', AuthMiddleware.auth, async (req: any, res: any) => {
// })
// router.post('/:id/ban', AuthMiddleware.auth)
// router.post('/:id/unban', AuthMiddleware.auth)
// router.post('/:id/admin', AuthMiddleware.auth)
// router.post('/:id/unadmin', AuthMiddleware.auth)
// router.post('/:id/grant', AuthMiddleware.auth)

export = router