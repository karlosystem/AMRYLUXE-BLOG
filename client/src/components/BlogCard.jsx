import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io"; // Icono de flecha elegante
import usericon from "@/assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";
// 1. Importamos decode de entities para limpiar los caracteres raros HTML
import { decode } from "entities";

const BlogCard = ({ props }) => {
  const user = useSelector((state) => state.user);

  // 2. Función mágica para limpiar etiquetas HTML (<p>, <strong>, etc.) y dejar texto plano limpio
  const stripHtmlAndDecode = (htmlString) => {
    if (!htmlString) return "";
    // Decodifica entidades como &lt; o &quot;
    const decodedHtml = decode(htmlString);
    // Remueve cualquier etiqueta HTML restante (<p>, etc.) usando una expresión regular
    return decodedHtml.replace(/<[^>]*>/g, "");
  };

  // Procesamos el contenido para la descripción corta de la tarjeta
  const cleanDescription = stripHtmlAndDecode(props.blogContent);

  return (
    <Link
      to={RouteBlogDetails(props.category.slug, props.slug)}
      className="block group"
    >
      <Card className="pt-5 overflow-hidden border border-zinc-100 hover:shadow-md transition-shadow duration-300 h-full flex flex-col justify-between">
        <CardContent className="flex flex-col h-full justify-between gap-4">
          {/* CABECERA DE LA TARJETA (Autor y Rol) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-7 h-7">
                {/* 💡 Agregamos ?. al avatar para evitar que colapse si author es solo un ID */}
                <AvatarImage src={props.author?.avatar || usericon} />
              </Avatar>
              <span className="text-xs font-semibold text-[#e44a7a] tracking-wide">
                {/* 💡 Si props.author es un objeto muestra el nombre, si no, ponemos un texto temporal */}
                Por :{" "}
                {typeof props.author === "object"
                  ? props.author?.name
                  : "Administrador"}
              </span>
            </div>
            {/* 💡 Agregamos ?. a role */}
            {props.author?.role === "admin" && (
              <Badge
                variant="outline"
                className="bg-zinc-900 text-white border-none text-[10px] uppercase tracking-wider px-2 py-0.5"
              >
                Admin
              </Badge>
            )}
          </div>

          {/* IMAGEN DESTACADA */}
          <div className="my-1 overflow-hidden rounded-sm aspect-[16/10]">
            <img
              src={props.featuredImage}
              alt={props.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* DETALLES Y TEXTO */}
          <div className="flex-1 flex flex-col gap-2">
            <p className="flex items-center gap-1.5 text-xs text-zinc-400 font-light">
              <FaRegCalendarAlt size={12} className="text-[#e44a7a]" />
              <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
            </p>

            {/* Título del artículo */}
            <h2 className="text-lg font-bold text-zinc-800 line-clamp-2 uppercase tracking-wide leading-snug group-hover:text-[#e44a7a] transition-colors duration-200">
              {props.title}
            </h2>

            {/* DESCRIPCIÓN REPARADA: Texto completamente limpio y limitado a 3 líneas */}
            <p className="text-zinc-500 text-sm font-light line-clamp-3 leading-relaxed">
              {cleanDescription}
            </p>
          </div>

          {/* 🔘 NUEVO BOTÓN: VER MÁS (Estilo Editorial) */}
          <div className="pt-2 border-t border-zinc-50 flex items-center justify-start">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-[#e44a7a] transition-colors duration-300">
              Ver más
              <IoIosArrowRoundForward
                size={18}
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
