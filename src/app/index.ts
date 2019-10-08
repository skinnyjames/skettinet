import express from "express";
import path from "path";
import { SetupModel } from "./models/setup"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import setupRoutes from './routes/setup'
import uploadRoutes from './routes/upload'
import userRoutes from './routes/user'
import postRoutes from './routes/post'
import categoryRoutes from './routes/category'
const app = express();
const port = 8081;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')));
app.use('/setup', setupRoutes)
app.use('/upload', uploadRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/categories', categoryRoutes)

app.get('/', async (req, res) => {
  // check for first installation
  let required = await SetupModel.setupRequired()
  res.render('index', { setup: required })
});

if (require.main === module) {
  app.listen(port, () => {
    console.log( `server started at ${port}`);
  });
}

export = app