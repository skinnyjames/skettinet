import express from 'express'
import { PostModel } from './../models/post'
import { ValidationError } from '../lib/errors'
import { AuthMiddleware } from '../middleware/auth';

const router = express.Router()

router.get('/', async(req, res) => {
  try {
    const posts = await PostModel.getAll()
    res.statusCode = 200
    res.send(posts)
  } catch(e) {
    res.statusCode = 500
    res.send('oops')
  }
})

export = router