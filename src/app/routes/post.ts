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

router.post('/', async(req, res) => {
  try {
    const data = req.body
    const id = await PostModel.create(data)
    res.statusCode = 200
    res.send({id: id})
  } catch(e) {
    if (e instanceof ValidationError) {
      res.statusCode = 401
      res.send(e)
    } else {
      console.log(e)
      res.statusCode = 500
      res.send('Something went wrong')
    }
  }
})

export = router