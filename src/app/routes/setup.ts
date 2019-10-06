import express from 'express'
import { SetupModel } from './../models/setup'
import { UserModel } from './../models/user'
import { ValidationError } from '../lib/errors'
import move from 'move-file'
import fs from 'fs';
import util from 'util'
import * as bluebird from 'bluebird'

const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)
const stat = util.promisify(fs.stat)
const router = express.Router()

router.post('/', async (req, res) => {
  //only allow setup if database isn't set up
  const needsSetup = await SetupModel.setupRequired()
  if (needsSetup) {
    // handle logic here
    const data = req.body
    try {
      await UserModel.registerZiggy()
      const sessionId = await UserModel.registerAdmin(data)
      await cleanupAvatar(data.avatar)
      res.cookie('sketti', JSON.stringify({ sessionId: sessionId }))
      res.redirect('/')

    } catch(err) {
      if (err instanceof ValidationError) {
        data.errors = err.errors
        data.message = err.message
        res.render('setup', data)
      } else {
        res.statusCode = 500
        res.send('Something bad happened')
      }
    }
  } else {
    res.statusCode = 401
    res.send('Unauthorized')
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

export = router