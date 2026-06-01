import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import fs from 'fs'          // 🔥 Importado para manejar archivos
import path from 'path'      // 🔥 Importado para rutas de archivos
import AuthRoute from './routes/Auth.route.js'
import UserRoute from './routes/User.route.js'
import CategoryRoute from './routes/Category.route.js'
import BlogRoute from './routes/Blog.route.js'
import CommentRouote from './routes/Comment.route.js'
import BlogLikeRoute from './routes/Bloglike.route.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// route setup  
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)
app.use('/api/comment', CommentRouote)
app.use('/api/blog-like', BlogLikeRoute)

mongoose.connect(process.env.MONGODB_CONN, { dbName: 'amryluxe_blog' })
    .then(() => console.log('Database connected.'))
    .catch(err => console.log('Database connection failed.', err))

app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})

// 🔥 MIDDLEWARE GLOBAL DE ERRORES OPTIMIZADO CON LOGS
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error.'
    
    // 1. Formateamos la línea que se guardará en el log (Fecha, Método, Ruta y Error)
    const fecha = new Date().toLocaleString()
    const logMessage = `[${fecha}] [${req.method}] ${req.url} - Error ${statusCode}: ${message}\n`

    try {
        // 2. Definimos la ruta del archivo error.log en la raíz de la carpeta 'API'
        const logPath = path.join(process.cwd(), 'error.log')
        
        // 3. Agregamos la línea al archivo (si no existe, fs lo crea automáticamente)
        fs.appendFileSync(logPath, logMessage, 'utf8')
    } catch (fsError) {
        console.error("No se pudo escribir en el archivo error.log", fsError)
    }

    // 4. Enviamos la respuesta original a tu frontend
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})