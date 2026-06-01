import React from "react";
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, // Nuevo icono para la dirección física
  FaFacebookF, 
  FaTwitter, 
  FaPinterestP, 
  FaInstagram, 
  FaYoutube 
} from "react-icons/fa";

const TopMiniBar = () => {
  return (
    <div className="w-full bg-[#1a1a1a] text-white text-xs py-3 border-b border-zinc-800 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LADO IZQUIERDO: Información de contacto */}
        <div className="flex items-center space-x-6 font-light tracking-wide text-zinc-300">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-[#e44a7a] text-[11px]" />
            <span>+51 994 148 453</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[#e44a7a] text-[11px]" />
            <a 
              href="mailto:info@gmail.com" 
              className="hover:text-[#e44a7a] transition-colors duration-300"
            >
              contacto@amryluxe.com
            </a>
          </div>

          {/* NUEVO: Dirección Física */}
          <div className="flex items-center gap-2 border-l border-zinc-800 pl-6">
            <FaMapMarkerAlt className="text-[#e44a7a] text-[11px]" />
            <span>Jr. Maximiliano Velarde 171, Surco</span>
          </div>

        </div>

        {/* LADO DERECHO: Redes Sociales */}
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-400 hover:text-[#e44a7a] transition-colors duration-300 p-1"
          >
            <FaFacebookF size={13} />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-400 hover:text-[#e44a7a] transition-colors duration-300 p-1"
          >
            <FaTwitter size={13} />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-400 hover:text-[#e44a7a] transition-colors duration-300 p-1"
          >
            <FaPinterestP size={13} />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-400 hover:text-[#e44a7a] transition-colors duration-300 p-1"
          >
            <FaInstagram size={13} />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-400 hover:text-[#e44a7a] transition-colors duration-300 p-1"
          >
            <FaYoutube size={13} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopMiniBar;