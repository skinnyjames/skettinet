import Validator from '../lib/validator'

const PostSchema = new Validator({
  presence: ['category_id', 'user_id', 'title', 'body']
})

export { PostSchema }