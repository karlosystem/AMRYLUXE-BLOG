import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async(req, res, next) => {
    try {
        const {name, email, password} = req.body
        const checkUser = await User.findOne({ email })

        if(checkUser){
            next(handleError(409, 'Este usuario ya ha sido registrado'))
            return;
        }   
        const hashedPassword = bcryptjs.hashSync(password)
        const user = new User({
            name, email, password: hashedPassword
        })

        await user.save();
        
        res.status(200).json({
            success: true,
            message: 'Usuario Registrado con Exito' 
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const Login = async(req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user) {
            return next(handleError(404, 'Acceso Invalido'))            
        }
        const hashedPassword = user.password
        const comparePassword = await bcryptjs.compare(password, hashedPassword);
        if (!comparePassword) {
            return next(handleError(404, 'Acceso Invalido'))                        
        }

        // 1. CORREGIDO: Ahora incluimos el campo 'role' en el Token JWT
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role // 👈 ¡CLAVE! Ahora viaja tu rol de admin
        }, process.env.JWT_SECRET)

        // 2. CORREGIDO: Configuración de SameSite adaptable para evitar bloqueos del navegador
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true, // Requerido para sameSite: 'none' en la mayoría de navegadores modernos
            sameSite: 'none', // 👈 Permite transferir la cookie del puerto 5173 al 3000
            path: '/'
        })

        const newUser = user.toObject({getters: true})
        delete newUser.password

        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Login Correcto'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body
        let user
        user = await User.findOne({ email })
        if (!user) {
            const password = Math.random().toString()
            const hashedPassword = bcryptjs.hashSync(password)
            const newUser = new User({
                name, email, password: hashedPassword, avatar
            })
            user = await newUser.save()
        }

        // 1. CORREGIDO: También incluimos el 'role' en el login con Google
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role // 👈 ¡CLAVE!
        }, process.env.JWT_SECRET)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', // 👈 ¡CLAVE!
            path: '/'
        })

        const newUser = user.toObject({ getters: true })
        delete newUser.password
        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Login successful.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const Logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none', // 👈 ¡CLAVE para limpiar en cualquier entorno!
            path: '/'
        })

        res.status(200).json({
            success: true,
            message: 'Saliendo del Sistema'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}