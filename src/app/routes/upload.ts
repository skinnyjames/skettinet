import multer from 'multer'
import { Router } from 'express'
import path from 'path'
import fs from 'fs';
import util from 'util'

const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)
const stat = util.promisify(fs.stat)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '.', '../../public/temp/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
const router =  Router()
router.post('/avatar', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.send({
    ...req.file,
    status: 'success'
  })
})

export = router