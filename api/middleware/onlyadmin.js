import jwt from 'jsonwebtoken'
import { handleError } from '../helpers/handleError.js' // 👈 Importamos tu manejador de errores

export const onlyadmin = async (req, res, next) => {
    try {
        // Validamos que la propiedad cookies exista en la petición
        if (!req.cookies) {
            return next(handleError(403, 'No se detectaron cookies en la petición. Asegúrate de usar cookie-parser.'))
        }

        const token = req.cookies.access_token
        if (!token) {
            return next(handleError(403, 'Acceso denegado. No se encontró ningún token.'))
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        
        if (decodeToken.role === 'admin') {
            req.user = decodeToken
            next() // Todo bien, continúa al controlador
        } else {
            return next(handleError(403, 'Acceso denegado. Se requieren permisos de administrador.'))
        }
    } catch (error) {
        // En caso de que el token haya expirado o falle req.cookies
        next(handleError(500, error.message)) 
    }
}