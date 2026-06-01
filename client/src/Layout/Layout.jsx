import TopMiniBar from "@/components/TopMiniBar"; 
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer"; 
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    // Estructura maestra vertical fluida
    <div className="w-full min-h-screen flex flex-col bg-[#fafafa]">
      
      {/* 1. Mini barra superior negra */}
      <TopMiniBar />

      {/* 2. Cabecera principal con logotipo y menú de navegación superior */}
      <Topbar />
      
      {/* 3. Contenedor de las Páginas (Centrado, limpio y espacioso) */}
      <main className="w-full flex-1 max-w-7xl mx-auto px-4 md:px-8 py-10">
        <Outlet />
      </main>

      {/* 4. Pie de página expandido de borde a borde */}
      <Footer />

    </div>
  );
};

export default Layout;