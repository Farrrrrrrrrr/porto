import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-20 backdrop-blur-sm bg-black/70">
      <div className="container mx-auto px-8 md:px-20 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Farrell<span className="text-purple-600">.</span>
          </Link>
          
          <ul className="hidden md:flex space-x-10">
            {['home', 'projects', 'skills', 'contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  className="text-gray-300 hover:text-purple-500 transition-colors"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="md:hidden">
            <button className="text-white">
              Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;