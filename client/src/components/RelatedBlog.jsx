import { getEnv } from '../helpers/getEnv'
import { RouteBlogDetails } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RelatedBlog = ({ props }) => {
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-related-blog/${props.category}/${props.currentBlog}`, {
        method: 'get',
        credentials: 'include',
    })

    if (loading) return <div className="text-gray-400 text-sm animate-pulse">Cargando sugerencias...</div>

    return (
        <div className="mt-4">
            {/* Título del Widget con línea decorativa inferior en el color acento de la plantilla */}
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-100 relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-16 after:h-[2px] after:bg-[#e44a7a]">
                Blogs Relacionados
            </h2>
            
            <div className="flex flex-col gap-4">
                {data && data.relatedBlog.length > 0 ? (
                    data.relatedBlog.map(blog => {
                        return (
                            <Link 
                                key={blog._id} 
                                to={RouteBlogDetails(props.category, blog.slug)}
                                className="group flex items-start gap-4 pb-4 border-b border-gray-100 last:border-none last:pb-0"
                            >
                                {/* Contenedor de la Imagen Fija con zoom suave */}
                                <div className="w-[90px] h-[70px] flex-shrink-0 overflow-hidden rounded bg-gray-50 border border-gray-100">
                                    <img 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                        src={blog.featuredImage} 
                                        alt={blog.title}
                                    />
                                </div>
                                
                                {/* Detalles del post relacionado */}
                                <div className="flex flex-col justify-center min-w-0 pt-0.5">
                                    <h4 className="line-clamp-2 text-sm font-bold text-gray-800 group-hover:text-[#e44a7a] transition-colors duration-200 leading-snug">
                                        {blog.title}
                                    </h4>
                                    
                                    {/* Fecha de publicación integrada en formato limpio */}
                                    {blog.createdAt && (
                                        <span className="text-[11px] text-gray-400 mt-1.5 font-normal flex items-center gap-1">
                                            {moment(blog.createdAt).format("DD MMM, YYYY")}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <div className="text-gray-400 text-sm italic py-2">
                        No hay Blogs Relacionados en esta categoría.
                    </div>
                )}
            </div>
        </div>
    )
}

export default RelatedBlog;