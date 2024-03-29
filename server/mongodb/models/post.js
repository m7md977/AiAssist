import mongoose from 'mongoose'

const Post = new mongoose.Schema({
    name: { type: String, required: true},
    prompt: { type: String, required: true},
    text: { type: String, required: true},
})
const PostSchema = mongoose.model('post', Post)

export default PostSchema