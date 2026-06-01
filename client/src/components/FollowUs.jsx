import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa6';

const FollowUs = () => {
  const socialNetworks = [
    { name: 'Facebook', icon: <FaFacebookF />, color: '#3b5998', link: '#' },
    { name: 'Twitter', icon: <FaTwitter />, color: '#1da1f2', link: '#' },
    { name: 'Pinterest', icon: <FaPinterestP />, color: '#db4437', link: '#' },
    { name: 'Instagram', icon: <FaInstagram />, color: '#c32aa3', link: '#' },
    { name: 'YouTube', icon: <FaYoutube />, color: '#ff0000', link: '#' },
  ];

  return (
    <div className="mb-8">
      {/* Título adaptado al diseño de tus otros títulos de la barra lateral */}
      <h2 className="text-2xl font-bold mb-5">Síguenos</h2>
      
      <div className="flex flex-col gap-3">
        {socialNetworks.map((network) => (
          <a
            key={network.name}
            href={network.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-white h-[60px] hover:opacity-90 transition-opacity items-center rounded-md overflow-hidden"
            style={{ backgroundColor: network.color }}
          >
            {/* Lado Izquierdo: Contenedor del Icono (Recrea .blog_1r1il) */}
            <div className="w-[60px] h-[60px] flex items-center justify-center border-r-2 border-white text-xl flex-shrink-0">
              {network.icon}
            </div>
            
            {/* Lado Derecho: Contenedor de Texto (Recrea .blog_1r1ir) */}
            <div className="flex-1 h-[60px] flex items-center px-5 font-bold text-xs tracking-widest uppercase">
              Síguenos en {network.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FollowUs;