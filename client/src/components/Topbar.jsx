import React from "react";
import logo from "@/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { 
    RouteBlogAdd, 
    RouteIndex, 
    RouteProfile, 
    RouteSignIn, 
    RouteBlogByCategory,
    RouteBlog, 
    RouteCommentDetails, 
    RouteCategoryDetails, 
    RouteUser 
} from "../helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "../helpers/getEnv";
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/showToast';
import { ChevronDown, LogOut, Plus, User, FileText, MessageSquare, FolderOpen, Users } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import usericon from '@/assets/images/user.png';

const Topbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    // Traemos las categorías directo al menú superior
    const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    });

    const handleLogout = () => {
        dispatch(removeUser());
        showToast("success", "Sesión cerrada correctamente");
        navigate(RouteIndex);
    };

    return (
        <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto h-20 px-4 md:px-8 flex items-center justify-between gap-4">
                
                {/* LOGO */}
                <Link to={RouteIndex} className="shrink-0">
                    <img src={logo} alt="AMRYLUXE" className="w-44 md:w-52 h-auto object-contain" />
                </Link>

                {/* MENÚ DE NAVEGACIÓN CENTRAL */}
                <nav className="hidden lg:flex items-center gap-8 text-sm uppercase font-bold tracking-widest text-zinc-700">
                    <Link to={RouteIndex} className="hover:text-[#e44a7a] transition-colors duration-200">
                        Inicio
                    </Link>

                    {/* DROPDOWN DINÁMICO DE CATEGORÍAS */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 hover:text-[#e44a7a] transition-colors duration-200 uppercase tracking-widest focus:outline-none">
                            Categorías <ChevronDown size={14} className="text-zinc-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-52 bg-white rounded-sm shadow-md border border-zinc-100 z-50">
                            {categoryData && categoryData.category.length > 0 ? (
                                categoryData.category.map((cat) => (
                                    <DropdownMenuItem key={cat._id} asChild className="cursor-pointer font-medium text-zinc-600 hover:text-[#e44a7a] hover:bg-zinc-50 py-2.5 px-4 text-xs uppercase tracking-wider">
                                        <Link to={RouteBlogByCategory(cat.slug)}>
                                            {cat.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <div className="p-3 text-xs text-zinc-400 font-light">Sin categorías</div>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* OPCIÓN EXTRA SOLO PARA ADMINS LOGUEADOS */}
                    {user && user.isLoggedIn && user.user.role === "admin" && (
                        <Link to={RouteBlogAdd} className="text-[#e44a7a] hover:opacity-80 transition-opacity">
                            Redactar
                        </Link>
                    )}
                </nav>

                {/* BLOQUE DERECHO: BUSCADOR Y ACCIONES DE USUARIO */}
                <div className="flex items-center gap-4">
                    
                    {/* Buscador */}
                    <div className="hidden sm:block w-48 md:w-64">
                        <SearchBox />
                    </div>

                    {/* Autenticación / Perfil */}
                    {!user || !user.isLoggedIn ? (
                        <Link 
                            to={RouteSignIn} 
                            className="p-2 text-zinc-700 hover:text-[#e44a7a] transition-colors duration-300 flex items-center justify-center"
                            title="Ingresar"
                        >
                            <User size={22} strokeWidth={2.5} />
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <Avatar className="w-10 h-10 border-2 border-zinc-100 hover:border-[#e44a7a] transition-colors cursor-pointer">
                                    <AvatarImage src={user.user.avatar || usericon} alt={user.user.name} />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white rounded-sm shadow-md border border-zinc-100 mt-2" align="end">
                                <DropdownMenuLabel className="p-4 flex flex-col">
                                    <span className="font-bold text-zinc-800 text-sm">{user.user.name}</span>
                                    <span className="text-zinc-400 text-xs font-normal truncate mt-0.5">{user.user.email}</span>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-zinc-100" />
                                
                                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-4 text-zinc-600 hover:bg-zinc-50 text-sm">
                                    <Link to={RouteProfile} className="flex items-center gap-2 w-full">
                                        <User size={16} /> Mi Perfil
                                    </Link>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-4 text-zinc-600 hover:bg-zinc-50 text-sm">
                                    <Link to={RouteBlogAdd} className="flex items-center gap-2 w-full">
                                        <Plus size={16} /> Crear Artículo
                                    </Link>
                                </DropdownMenuItem>

                                {/* OPCIONES PARA CUALQUIER USUARIO LOGUEADO */}
                                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-4 text-zinc-600 hover:bg-zinc-50 text-sm">
                                    <Link to={RouteBlog} className="flex items-center gap-2 w-full">
                                        <FileText size={16} /> Blogs
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-4 text-zinc-600 hover:bg-zinc-50 text-sm">
                                    <Link to={RouteCommentDetails} className="flex items-center gap-2 w-full">
                                        <MessageSquare size={16} /> Comentarios
                                    </Link>
                                </DropdownMenuItem>

                                {/* OPCIONES EXCLUSIVAS DEL ROL: ADMIN */}
                                {user.user.role === "admin" && (
                                    <>
                                        <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-4 text-zinc-600 hover:bg-zinc-50 text-sm">
                                            <Link to={RouteCategoryDetails} className="flex items-center gap-2 w-full">
                                                <FolderOpen size={16} /> Categorías
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-4 text-zinc-600 hover:bg-zinc-50 text-sm">
                                            <Link to={RouteUser} className="flex items-center gap-2 w-full">
                                                <Users size={16} /> Users
                                            </Link>
                                        </DropdownMenuItem>
                                    </>
                                )}
                                
                                <DropdownMenuSeparator className="bg-zinc-100" />
                                
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer py-2.5 px-4 text-red-500 hover:bg-red-50 text-sm font-medium flex items-center gap-2">
                                    <LogOut size={16} /> Salir de la Cuenta
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                </div>

            </div>
        </header>
    );
};

export default Topbar;