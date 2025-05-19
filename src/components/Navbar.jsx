"use client";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-3 shadow-md shadow-purple-900/10' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-8 flex items-center justify-between">
        {/* Logo/Name */}
        <a href="#home" className="text-xl font-bold text-white">
          <span className="text-purple-600">F</span>arrell
          <span className="hidden sm:inline"> <span className="text-purple-600">I</span>vander</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-white/80 hover:text-white transition-colors duration-300">Home</a>
          <a href="#projects" className="text-white/80 hover:text-white transition-colors duration-300">Projects</a>
          <a href="#skills" className="text-white/80 hover:text-white transition-colors duration-300">Skills</a>
          <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-300">Contact</a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6"
          >
            {mobileMenuOpen 
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-8 py-4 flex flex-col space-y-4">
            <a 
              href="#home" 
              className="text-white block py-2 hover:text-purple-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#projects" 
              className="text-white block py-2 hover:text-purple-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#skills" 
              className="text-white block py-2 hover:text-purple-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a 
              href="#contact" 
              className="text-white block py-2 hover:text-purple-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
