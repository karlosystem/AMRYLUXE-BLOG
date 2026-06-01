import React from 'react';
import irmaImg from '@/assets/images/irma-huamanchari.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

const AboutWidget = () => {
  return (
    <div className="w-full bg-white border border-zinc-100 p-6 rounded-sm shadow-sm text-center">
      {/* TÍTULO CON SUBRAYADO ESTILO EDITORIAL */}
      <div className="relative mb-6 inline-block">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-800 px-4">
          Sobre la Fundadora
        </h3>
        <div className="w-12 h-[2px] bg-[#e44a7a] mx-auto mt-2"></div>
      </div>

      {/* FOTO DE PERFIL */}
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-zinc-100 shadow-inner mb-4">
        <img 
          src={irmaImg} 
          alt="Irma Huamanchari" 
          className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* NOMBRE Y CARGO */}
      <h4 className="text-base font-bold text-zinc-900 tracking-wide uppercase">
        Irma Huamanchari
      </h4>
      <p className="text-[11px] text-[#e44a7a] font-bold tracking-widest uppercase mt-0.5 mb-4">
        Gerente de AmryLuxe
      </p>

      {/* DESCRIPCIÓN REFINADA */}
      <p className="text-zinc-500 text-xs font-light leading-relaxed mb-6 px-2">
        Apasionada por las últimas tendencias, el estilo de vida y la elegancia. Bienvenidos a AMRYLUXE, un espacio exclusivo diseñado para inspirar tu día a día a través de la moda, el bienestar y la sofisticación.
      </p>

      {/* ICONOS DE REDES SOCIALES */}
      <div className="flex justify-center gap-3">
        <a href="#" className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#e44a7a] hover:text-white hover:border-[#e44a7a] transition-all duration-300">
          <FaFacebookF size={12} />
        </a>
        <a href="#" className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#e44a7a] hover:text-white hover:border-[#e44a7a] transition-all duration-300">
          <FaTwitter size={12} />
        </a>
        <a href="#" className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#e44a7a] hover:text-white hover:border-[#e44a7a] transition-all duration-300">
          <FaInstagram size={12} />
        </a>
        <a href="#" className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-[#e44a7a] hover:text-white hover:border-[#e44a7a] transition-all duration-300">
          <FaPinterestP size={12} />
        </a>
      </div>
    </div>
  );
};

export default AboutWidget;