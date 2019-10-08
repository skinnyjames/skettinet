import express from 'express'
import { CategoryModel } from './../models/category'
import { AuthMiddleware } from '../middleware/auth';

const router = express.Router()

router.get('/', async(req, res) => {
  try {
    const categories = await CategoryModel.getAll()
    res.statusCode = 200
    res.send(categories)
  } catch(e) {
    console.log(e)
    res.statusCode = 500
    res.send('oops')
  }
})

export = router