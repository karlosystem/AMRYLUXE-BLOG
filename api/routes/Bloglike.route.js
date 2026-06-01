import express from 'express'
import { doLike, likeCount } from '../controllers/BlogLike.controller.js'
import { authenticate } from '../middleware/authenticate.js'

const BlogLikeRoute = express.Router()

BlogLikeRoute.post('/do-like', authenticate, doLike)

//BlogLikeRoute.get('/get-like/:blogid/:userid?', likeCount)

// 🔥 SOLUCIÓN: Separamos la ruta en dos para evitar el parámetro opcional '?'
BlogLikeRoute.get('/get-like/:blogid', likeCount)
BlogLikeRoute.get('/get-like/:blogid/:userid', likeCount)

export default BlogLikeRoute