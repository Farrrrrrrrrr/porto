"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#home" className="text-xl font-bold text-white flex items-center">
            <span className="text-purple-500 mr-2">F</span>
            <span className="hidden sm:inline">Farrell Ivander</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            Resume
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#home" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="#projects" onClick={() => setMenuOpen(false)}>Projects</MobileNavLink>
            <MobileNavLink href="#skills" onClick={() => setMenuOpen(false)}>Skills</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setMenuOpen(false)}>Contact</MobileNavLink>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-4 py-2 text-center rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// Navigation link component for desktop
function NavLink({ href, children }) {
  return (
    <a 
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
}

// Navigation link component for mobile
function MobileNavLink({ href, onClick, children }) {
  return (
    <a 
      href={href}
      className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );
}
