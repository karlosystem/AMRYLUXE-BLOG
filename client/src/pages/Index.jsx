import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import AboutWidget from '@/components/AboutWidget'; 
import SearchBox from '@/components/SearchBox'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'; 
import { 
  FaFacebookF, 
  FaTwitter, 
  FaPinterestP, 
  FaInstagram, 
  FaYoutube,
  FaChevronRight
} from "react-icons/fa";

const Index = () => {
    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include'
    })
   
    if (loading) return (
        <>
            <Helmet>
                <title>AMRY LUXE | Tendencia que Impone Glamour - Blog de Moda y Estilo</title>
                <meta name="description" content="Bienvenido a AMRY LUXE. Tu espacio exclusivo de moda, alta costura y sofisticación. Inspiración diaria con las últimas tendencias que imponen glamour en el buen vestir." />
                <meta name="keywords" content="amry luxe, tendencia glamour, moda de alta gama, alta costura, estilo sofisticado, amryluxe blog" />
            </Helmet>
            <Loading />
        </>
    )

    // 💡 Extraemos la lista de blogs de forma segura tolerando tanto 'blog' como 'blogs' desde la API
    const articles = blogData?.blog || blogData?.blogs || [];

    // Agrupamos las categorías únicas para el widget lateral de forma dinámica
    const categories = articles.length > 0 
      ? Array.from(new Set(articles.map(b => JSON.stringify(b.category)))).map(c => JSON.parse(c))
      : [];

    // Tomamos los 3 blogs más recientes para el widget de "Popular Posts"
    const popularBlogs = articles.length > 0 ? [...articles].slice(0, 3) : [];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-0">
            <Helmet>
                <title>AMRY LUXE | Tendencia que Impone Glamour - Blog de Moda y Estilo</title>
                <meta name="description" content="Bienvenido a AMRY LUXE. Tu espacio exclusivo de moda, alta costura y sofisticación. Inspiración diaria con las últimas tendencias que imponen glamour en el buen vestir." />
                <meta name="keywords" content="amry luxe, tendencia glamour, moda de alta gama, alta costura, estilo sofisticado, amryluxe blog" />
                
                <meta property="og:title" content="AMRY LUXE | Tendencia que Impone Glamour" />
                <meta property="og:description" content="Tu espacio exclusivo de moda, alta costura y sofisticación." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* COLUMNA IZQUIERDA: Flujo de artículos */}
                <div className="w-full lg:w-[73%] flex flex-col gap-12">
                    {/* 💡 Usamos la constante 'articles' de forma limpia y ultra segura */}
                    {articles.length > 0 ? (
                        articles.map(blog => (
                            <BlogCard key={blog._id} props={blog} />
                        ))
                    ) : (
                        <div className="text-zinc-500 py-10 font-light">No se encontraron artículos publicados.</div>
                    )}
                </div>

                {/* COLUMNA DERECHA: Sidebar de la Maqueta */}
                <aside className="w-full lg:w-[27%] flex flex-col gap-10">

                    <AboutWidget />
                    
                    {/* WIDGET 1: Buscador */}
                    <div className="bg-white p-6 border border-zinc-100 rounded-sm">
                        <h4 className="text-lg font-bold text-zinc-900 border-b-2 border-[#e44a7a] pb-2 mb-5 tracking-wide uppercase text-sm">
                            Buscar Artículo
                        </h4>
                        <SearchBox />
                    </div>

                    {/* WIDGET 2: Categorías Estilizadas */}
                    <div className="bg-white p-6 border border-zinc-100 rounded-sm">
                        <h4 className="text-lg font-bold text-zinc-900 border-b-2 border-[#e44a7a] pb-2 mb-5 tracking-wide uppercase text-sm">
                            Categorías
                        </h4>
                        <ul className="flex flex-col divide-y divide-zinc-100">
                            {categories.map((cat) => (
                                <li key={cat?._id} className="py-3 flex justify-between items-center group">
                                    <Link 
                                        to={`/blog/category/${cat?.slug}`} 
                                        className="text-zinc-600 group-hover:text-[#e44a7a] transition-colors duration-300 flex items-center gap-2 text-[15px]"
                                    >
                                        <FaChevronRight size={10} className="text-zinc-400 group-hover:text-[#e44a7a]" />
                                        {cat?.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* WIDGET 3: Post Populares / Recientes */}
                    <div className="bg-white p-6 border border-zinc-100 rounded-sm">
                        <h4 className="text-lg font-bold text-zinc-900 border-b-2 border-[#e44a7a] pb-2 mb-5 tracking-wide uppercase text-sm">
                            Publicaciones Populares
                        </h4>
                        <div className="flex flex-col gap-4">
                            {popularBlogs.map((b) => (
                                <div key={b._id} className="flex gap-3 items-start group">
                                    <img 
                                        src={b.featuredImage} 
                                        alt={b.title} 
                                        className="w-20 h-16 object-cover rounded-sm grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                                    />
                                    <div className="flex flex-col">
                                        <Link 
                                            to={`/blog/${b.category?.slug}/${b.slug}`}
                                            className="text-sm font-semibold text-zinc-800 line-clamp-2 leading-tight hover:text-[#e44a7a] transition-colors duration-300"
                                        >
                                            {b.title}
                                        </Link>
                                        <span className="text-xs text-zinc-400 mt-1">
                                            {new Date(b.createdAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* WIDGET 4: Redes Sociales */}
                    <div className="bg-white p-6 border border-zinc-100 rounded-sm">
                        <h4 className="text-lg font-bold text-zinc-900 border-b-2 border-[#e44a7a] pb-2 mb-5 tracking-wide uppercase text-sm">
                            Síguenos
                        </h4>
                        <div className="grid grid-cols-5 gap-2">
                            <a href="#" className="bg-[#3b5998] text-white py-3 flex justify-center items-center rounded-sm hover:opacity-90 transition-opacity"><FaFacebookF size={16} /></a>
                            <a href="#" className="bg-[#1da1f2] text-white py-3 flex justify-center items-center rounded-sm hover:opacity-90 transition-opacity"><FaTwitter size={16} /></a>
                            <a href="#" className="bg-[#db4437] text-white py-3 flex justify-center items-center rounded-sm hover:opacity-90 transition-opacity"><FaPinterestP size={16} /></a>
                            <a href="#" className="bg-[#c32aa3] text-white py-3 flex justify-center items-center rounded-sm hover:opacity-90 transition-opacity"><FaInstagram size={16} /></a>
                            <a href="#" className="bg-[#ff0000] text-white py-3 flex justify-center items-center rounded-sm hover:opacity-90 transition-opacity"><FaYoutube size={16} /></a>
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    )
}

export default Index;