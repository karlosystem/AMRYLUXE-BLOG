import Loading from "@/components/Loading";
import { Avatar } from "@/components/ui/avatar";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { AvatarImage } from "@radix-ui/react-avatar";
import { decode } from "entities";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async'; // 1. IMPORTACIÓN DE HELMET
import Comment from "../components/Comment";
import CommentList from '@/components/CommentList'
import CommentCount from "../components/CommentCount";
import LikeCount from "../components/LikeCount";
import RelatedBlog from "../components/RelatedBlog";
import FollowUs from "@/components/FollowUs";

const SingleBlogDetails = () => {
  const { blog, category } = useParams();

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },
    [blog, category],
  );

  // 2. SEO PROVISIONAL MIENTRAS SE CARGAN LOS DATOS DEL ARTÍCULO
  if (loading) return (
    <>
      <Helmet>
        <title>Cargando artículo... | AMRY LUXE</title>
      </Helmet>
      <Loading />
    </>
  );

  // Función auxiliar para limpiar el HTML de 'blogContent' y crear un resumen plano para el SEO
  const getCleanSummary = (htmlContent) => {
    if (!htmlContent) return "";
    const decodedHtml = decode(htmlContent);
    // Elimina todas las etiquetas HTML para dejar texto limpio
    const plainText = decodedHtml.replace(/<\/?[^>]+(>|$)/g, ""); 
    // Corta el texto a 155 caracteres (máximo ideal para Meta Description)
    return plainText.length > 155 ? `${plainText.substring(0, 152)}...` : plainText;
  };

  const blogPost = data?.blog;
  const seoDescription = blogPost ? getCleanSummary(blogPost.blogContent) : "Lee el último artículo en el blog oficial de AMRY LUXE.";
  
  // Creamos dinámicamente palabras clave basadas en el título del blog y su categoría
  const seoKeywords = blogPost 
    ? `${category}, ${blogPost.title.toLowerCase().split(' ').slice(0, 5).join(', ')}, amry luxe, blog de moda`
    : "moda, tendencias, amryluxe";

  return (
    <div className="md:flex-nowrap flex-wrap flex justify-between gap-20">
      
      {/* 3. INYECCIÓN DEL HELMET COMPLETAMENTE DINÁMICO */}
      {blogPost && (
        <Helmet>
          <title>{`${blogPost.title} | AMRY LUXE`}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={seoKeywords} />

          {/* Etiquetas Open Graph dinámicas para que al compartir en Redes se visualice hermoso */}
          <meta property="og:title" content={`${blogPost.title} | AMRY LUXE`} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:image" content={blogPost.featuredImage} />
          <meta property="og:type" content="article" />
        </Helmet>
      )}

      {data && data.blog && (
        <>
          <div className="border rounded md:w-[70%] w-full p-5">
            <h1 className="text-2xl font-bold mb-5">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                  <AvatarImage src={data.blog.author.avatar} />
                </Avatar>
                <div>
                  <p className="font-bold">{data.blog.author.name}</p>
                  <p>
                    Publicación: {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                 <CommentCount props={{ blogid: data.blog._id }} />
                 <LikeCount props={{ blogid: data.blog._id }} /> 
              </div>
            </div>
            <div className="my-5">
              <img src={data.blog.featuredImage} className="rounded" />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decode(data.blog.blogContent) || "",
              }}
            ></div>

            <div className="border-t mt-5 pt-5">
              <Comment props={{ blogid: data.blog._id}} />
            </div>

          </div>
        </>
      )}
      <div className="border rounded md:w-[30%] w-full p-5">
         <FollowUs />
         <RelatedBlog props={{ category: category, currentBlog: blog }} />
      </div>
    </div>
  );
};

export default SingleBlogDetails;