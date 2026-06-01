import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaPinterestP, 
  FaInstagram, 
  FaYoutube,
  FaClock,
  FaShoppingBag,
  FaHeadphones,
  FaMoneyBillAlt
} from "react-icons/fa";

// Importación de las 6 imágenes desde tu ruta de assets
import img1 from '../assets/images/blog/1.png';
import img2 from '../assets/images/blog/2.png';
import img3 from '../assets/images/blog/3.png';
import img4 from '../assets/images/blog/4.png';
import img5 from '../assets/images/blog/5.png';
import img6 from '../assets/images/blog/6.png';

const Footer = () => {
  // Arreglo para renderizar las imágenes limpiamente con un mapa
  const footerGallery = [img1, img2, img3, img4, img5, img6];

  return (
    <footer className="w-full bg-[#1a1a1a] text-zinc-400 font-sans mt-auto">
      
      {/* NUEVA SECCIÓN: Galería / Carrusel estático de Imágenes (Estilo Alta Costura) */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-0 border-b border-zinc-800/80">
        {footerGallery.map((img, idx) => (
          <div key={idx} className="relative group overflow-hidden aspect-square bg-zinc-950">
            <img 
              src={img} 
              alt={`AmryLuxe Gallery ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            {/* Efecto hover elegante con el color de la marca */}
            <div className="absolute inset-0 bg-[#e44a7a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center pointer-events-none">
              <span className="text-white text-xs tracking-widest uppercase font-semibold bg-[#1a1a1a]/90 px-3 py-1.5 backdrop-blur-xs rounded-xs">
                Ver Estilo
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 1. SECCIÓN PRINCIPAL DEL FOOTER (4 Columnas) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* COLUMNA 1: Sobre la Marca */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-2">
              AmryLuxe
            </h4>
            <p className="text-zinc-400 text-[15px] leading-relaxed font-light">
              Tu portal de estilo, moda y tendencias editoriales. Descubre artículos inspiradores redactados por expertos de la industria.
            </p>
            {/* Iconos Redes Sociales Redondos del Footer */}
            <div className="flex gap-2 mt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-[#e44a7a] text-white flex justify-center items-center transition-colors duration-300">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-[#e44a7a] text-white flex justify-center items-center transition-colors duration-300">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-[#e44a7a] text-white flex justify-center items-center transition-colors duration-300">
                <FaPinterestP size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-[#e44a7a] text-white flex justify-center items-center transition-colors duration-300">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-[#e44a7a] text-white flex justify-center items-center transition-colors duration-300">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* COLUMNA 2: Tags Populares */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-6">
              Tags Populares
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Moda', 'Estilo', 'Tendencias', 'Maquillaje', 'Cabello', 'Diseño', 'Modelos', 'Salón'].map((tag, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="text-xs uppercase font-semibold bg-zinc-800 text-zinc-300 px-3 py-2 rounded-sm hover:bg-[#e44a7a] hover:text-white transition-colors duration-300"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 3: Horarios de Atención */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-2">
              Horarios
            </h4>
            <div className="flex flex-col gap-3 text-[15px] font-light">
              <div className="flex items-start gap-3">
                <FaClock className="text-[#e44a7a] mt-1 shrink-0" />
                <div>
                  <p className="text-zinc-300 font-medium">Lunes - Viernes:</p>
                  <p className="text-zinc-400 text-sm">09:00 AM - 06:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-zinc-800 pt-3">
                <FaClock className="text-[#e44a7a] mt-1 shrink-0" />
                <div>
                  <p className="text-zinc-300 font-medium">Sábados:</p>
                  <p className="text-zinc-400 text-sm">09:00 AM - 01:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 4: Detalles y Beneficios */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-2">
              Detalles
            </h4>
            <ul className="flex flex-col gap-3 text-[14px] font-light">
              <li className="flex items-center gap-3">
                <FaShoppingBag className="text-[#e44a7a] shrink-0" size={16} />
                <span>Envíos Internacionales 100% Gratis</span>
              </li>
              <li className="flex items-center gap-3 border-t border-zinc-800 pt-3">
                <FaHeadphones className="text-[#e44a7a] shrink-0" size={16} />
                <span>Excelente Soporte al Cliente</span>
              </li>
              <li className="flex items-center gap-3 border-t border-zinc-800 pt-3">
                <FaMoneyBillAlt className="text-[#e44a7a] shrink-0" size={16} />
                <span>Garantía de Devolución del 100%</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 2. FRANJA INFERIOR (Derechos de Autor y Créditos) */}
      <div className="w-full bg-[#111111] border-t border-t-zinc-800/50 py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-zinc-500 font-light">
          <p>
            &copy; {new Date().getFullYear()} AmryLuxe. Todos los Derechos Reservados.
          </p>
          <p>
            Desarrollado por:{' '}
            <a 
              href="https://carlos-marquina.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#e44a7a] font-semibold hover:underline transition-all duration-300"
            >
              Carlos A. Marquina Ch.
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;