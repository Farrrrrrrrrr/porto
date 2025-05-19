"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";

// Import the robot component with no SSR
const RobotComponent = dynamic(() => import("../components/ClientRobot"), {
  ssr: false
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // Only show the canvas on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section with 3D Robot */}
      <section id="home" className="relative h-screen">
        {/* 3D Robot Canvas - adjusted for larger upper body focus */}
        {isClient && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center" style={{zIndex: 5}}>
            <div className="w-full h-full flex items-center justify-center">
              <RobotComponent />
            </div>
          </div>
        )}
        
        {/* Hero content overlay - moved further left to make space for the robot */}
        <div className="relative z-10 h-full flex items-start pt-32">
          <div className="container mx-auto px-8 md:px-20 flex flex-col md:flex-row items-start">
            <div className="flex flex-col gap-5 md:w-2/5">
              {/* Keep the original content here */}
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-purple-600" />
                <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-purple-600 ml-2" />
              </div>

              <div className="pl-6">
                <h1 className="text-5xl font-bold mt-2">
                  <span className="text-purple-600">Farrell Ivander</span>
                </h1>
                <p className="text-xl mt-4 text-gray-300">
                  Full Stack Developer
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
          <a href="#projects" className="flex flex-col items-center">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white/20 flex justify-center items-start p-2">
              <div className="w-3 h-3 rounded-full bg-white animate-bounce mb-1" />
            </div>
            <span className="mt-2 text-sm text-gray-400">Scroll Down</span>
          </a>
        </div>
      </section>

      {/* Projects Section - Improved with distinct project entries */}
      <section id="projects" className="relative z-10 py-24 px-8 md:px-20 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore a collection of my recent work showcasing various technologies and problem-solving approaches.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Media Monitoring Project */}
            <div className="group bg-gray-900/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20 hover:bg-gray-900/70">
              <div className="h-56 bg-gradient-to-br from-purple-900 to-indigo-800 relative overflow-hidden">
                {/* Project screenshot */}
                <img 
                  src="/portfolio1.png" 
                  alt="Media Monitoring Platform" 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 p-4">
                  <h3 className="text-xl font-bold text-white">Media Monitoring Platform</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-4 h-24 overflow-hidden">
                  A comprehensive media monitoring application that leverages Machine Learning to analyze content across the web, providing sentiment analysis and topic tracking in real-time.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-purple-900/50 text-purple-300 rounded-full">Python</span>
                  <span className="px-3 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full">Flask</span>
                  <span className="px-3 py-1 text-xs bg-green-900/50 text-green-300 rounded-full">GCP</span>
                  <span className="px-3 py-1 text-xs bg-yellow-900/50 text-yellow-300 rounded-full">NLP</span>
                </div>
                
                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <a href="https://medmon-9bf24.et.r.appspot.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm flex items-center group">
                    <span>View Project</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                </div>
              </div>
            </div>
            
            {/* NGO Site */}
            <div className="group bg-gray-900/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-gray-900/70">
              <div className="h-56 bg-gradient-to-br from-blue-900 to-cyan-800 relative overflow-hidden">
                <img 
                  src="/portfolio2.png" 
                  alt="NGO Site" 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 p-4">
                  <h3 className="text-xl font-bold text-white">NGO Site</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-4 h-24 overflow-hidden">
                  An NGO site designed to be eye-catching and user-friendly, allowing users to easily navigate through various donation options and information about the organization.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full">Next.js</span>
                  <span className="px-3 py-1 text-xs bg-green-900/50 text-green-300 rounded-full">ShadCN</span>
                  <span className="px-3 py-1 text-xs bg-yellow-900/50 text-yellow-300 rounded-full">Tailwind CSS</span>
                </div>
                
                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <a href="https://sample-1-farrell.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center group">
                    <span>View Project</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                
                </div>
              </div>
            </div>
            
            {/* APUDSI Website */}
            <div className="group bg-gray-900/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-green-500/20 hover:bg-gray-900/70">
              <div className="h-56 bg-gradient-to-br from-green-900 to-teal-800 relative overflow-hidden">
                <img 
                  src="/portfolio4.png" 
                  alt="APUDSI Website" 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 p-4">
                  <h3 className="text-xl font-bold text-white">APUDSI Website</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-4 h-24 overflow-hidden">
                  A website for my client, APDUSI, which has modern design and looks very catching meant to be as informative and as prideful as the organization function.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-green-900/50 text-green-300 rounded-full">React</span>
                  <span className="px-3 py-1 text-xs bg-red-900/50 text-red-300 rounded-full">JavaScript</span>
                </div>
                
                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <a href="https://news.apudsi.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 text-sm flex items-center group">
                    <span>View Project</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                </div>
              </div>
            </div>
            
            {/* E-Commerce Platform */}
            <div className="group bg-gray-900/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-red-500/20 hover:bg-gray-900/70">
              <div className="h-56 bg-gradient-to-br from-red-900 to-orange-800 relative overflow-hidden">
                <img 
                  src="/portfolio3.png" 
                  alt="E-Commerce Platform" 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 p-4">
                  <h3 className="text-xl font-bold text-white">APUDSI News Platform</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-4 h-24 overflow-hidden">
                  A full-fledged news platform with article management, user authentication, and a responsive design that adapts to various devices.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-red-900/50 text-red-300 rounded-full">React</span>
                  <span className="px-3 py-1 text-xs bg-green-900/50 text-green-300 rounded-full">JavaScript</span>
                  <span className="px-3 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full">Supabase</span>
                </div>
                
                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <a href="https://apudsi.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-sm flex items-center group">
                    <span>View Project</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                </div>
              </div>
            </div>
            
            {/* Portfolio Website */}
            <div className="group bg-gray-900/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20 hover:bg-gray-900/70">
              <div className="h-56 bg-gradient-to-br from-purple-900 to-indigo-800 relative overflow-hidden">
                <img 
                  src="/portfolio5.png" 
                  alt="Portfolio Website" 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 p-4">
                  <h3 className="text-xl font-bold text-white">Task Manager Web App</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-4 h-24 overflow-hidden">
                  A task manager web app that allows users to create, manage, and track their tasks efficiently. It features a clean and modern design with intuitive navigation.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs bg-blue-900/50 text-blue-300 rounded-full">Next.js</span>
                  <span className="px-3 py-1 text-xs bg-cyan-900/50 text-cyan-300 rounded-full">Tailwind CSS</span>
                  <span className="px-3 py-1 text-xs bg-purple-900/50 text-purple-300 rounded-full">Typescript</span>
                </div>
                
                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <a href="https://task-manager-small.pages.dev" className="text-purple-400 hover:text-purple-300 text-sm flex items-center group">
                    <span>View Project</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </section>

      {/* Skills Section - Revamped with modern interactive design */}
      <section id="skills" className="relative z-10 py-24 px-8 md:px-20 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Background tech pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 border border-purple-500 rounded-full animate-ping-slow"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 border border-cyan-500 rounded-full animate-ping-slow animation-delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-green-500 rounded-full animate-ping-slow animation-delay-2000"></div>
          </div>

          <h2 className="text-5xl font-bold mb-16 text-center">Technical Arsenal</h2>
          
          {/* Tech Categories Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Languages', 'Frontend', 'Backend', 'DevOps', 'Data & AI'].map((category) => (
              <button 
                key={category} 
                className="group relative px-6 py-3 bg-transparent hover:bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg transition-all duration-300 focus:outline-none"
              >
                <span className="relative z-10">{category}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            ))}
          </div>
          
          {/* Main Tech Grid - Interactive Skill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* JavaScript Ecosystem Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/90 p-1 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900 rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-yellow-500/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 text-yellow-400" fill="currentColor">
                      <path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-yellow-400">JavaScript Ecosystem</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Skill Bars with animations */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">React.js</span>
                      <span className="text-xs text-yellow-400">95%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 w-[95%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Next.js</span>
                      <span className="text-xs text-yellow-400">90%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 w-[90%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">TypeScript</span>
                      <span className="text-xs text-yellow-400">88%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 w-[88%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-800 text-yellow-400 rounded">Vue.js</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-yellow-400 rounded">Angular</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-yellow-400 rounded">Redux</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-yellow-400 rounded">Node.js</span>
                </div>
              </div>
            </div>
            
            {/* Backend Development Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/90 p-1 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900 rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-500/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8 text-blue-400" fill="currentColor">
                      <path d="M320 104.5c171.4 0 303.2 72.2 303.2 151.5S491.3 407.5 320 407.5c-171.4 0-303.2-72.2-303.2-151.5S148.7 104.5 320 104.5m0-16.8C143.3 87.7 0 163 0 256s143.3 168.3 320 168.3S640 349 640 256 496.7 87.7 320 87.7zM218.2 242.5c-7.9 40.5-35.8 36.3-70.1 36.3l13.7-70.6c38 0 63.8-4.1 56.4 34.3zM97.4 350.3h36.7l8.7-44.8c41.1 0 66.6 3 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7h-70.7L97.4 350.3zm185.7-213.6h36.5l-8.7 44.8c31.5 0 60.7-2.3 74.8 10.7 14.8 13.6 7.7 31-8.3 113.1h-37c15.4-79.4 18.3-86 12.7-92-5.4-5.8-17.7-4.6-47.4-4.6l-18.8 96.6h-36.5l32.7-168.6zM505 242.5c-8 41.1-36.7 36.3-70.1 36.3l13.7-70.6c38.2 0 63.8-4.1 56.4 34.3zM384.2 350.3H421l8.7-44.8c43.2 0 67.1 2.5 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7H417l-32.8 168.7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-400">Backend Development</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Skill Bars with animations */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Go</span>
                      <span className="text-xs text-blue-400">92%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-300 w-[92%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Python</span>
                      <span className="text-xs text-blue-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-300 w-[85%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Node.JS</span>
                      <span className="text-xs text-blue-400">80%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-300 w-[80%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-800 text-blue-400 rounded">Express</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-blue-400 rounded">Django</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-blue-400 rounded">Flask</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-blue-400 rounded">.NET</span>
                </div>
              </div>
            </div>
            
            {/* DevOps & Cloud Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/90 p-1 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-green-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900 rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-500/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8 text-green-400" fill="currentColor">
                      <path d="M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63l-7.07-7.07c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63l7.07 7.07zm160.97-11.31l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-7.07 7.07c-6.25 6.25-6.25 16.38 0 22.63l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l7.07-7.07c6.25-6.25 6.25-16.38 0-22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-400">DevOps & Cloud</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Skill Bars with animations */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">AWS</span>
                      <span className="text-xs text-green-400">88%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-300 w-[88%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Docker</span>
                      <span className="text-xs text-green-400">90%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-300 w-[90%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">CI/CD</span>
                      <span className="text-xs text-green-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-300 w-[85%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-800 text-green-400 rounded">Kubernetes</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-green-400 rounded">GCP</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-green-400 rounded">Terraform</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-green-400 rounded">Azure</span>
                </div>
              </div>
            </div>
            
            {/* Database Technologies Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/90 p-1 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900 rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-pink-500/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 text-pink-400" fill="currentColor">
                      <path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-pink-400">Database Technologies</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Skill Bars with animations */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">PostgreSQL</span>
                      <span className="text-xs text-pink-400">92%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-pink-300 w-[92%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">MongoDB</span>
                      <span className="text-xs text-pink-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-pink-300 w-[85%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Redis</span>
                      <span className="text-xs text-pink-400">80%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-pink-300 w-[80%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-800 text-pink-400 rounded">MySQL</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-pink-400 rounded">DynamoDB</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-pink-400 rounded">Firestore</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-pink-400 rounded">GraphQL</span>
                </div>
              </div>
            </div>
            
            {/* Data & AI Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/90 p-1 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900 rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-500/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8 text-purple-400" fill="currentColor">
                      <path d="M574.9 280.6l-22.7-22.7-82.6-82.6L387 92.7l-22.7-22.7c-6.2-6.2-16.4-6.2-22.6 0L286.4 124.4 184.2 22.2c-6.2-6.2-16.4-6.2-22.6 0L36.3 147.5c-48.4 48.4-48.4 126.9 0 175.3l22.7 22.7 82.6 82.6L223.3 510.8l22.7 22.7c6.2 6.2 16.4 6.2 22.6 0l55.4-55.4 102.1 102.1c6.2 6.2 16.4 6.2 22.6 0L551.5 475c48.4-48.4 48.4-126.9 0-175.3l23.4-19.1zm-31.9 127.6L438.3 512l-102.1-102.1L280.8 465.3 128.3 312.8 26.2 210.7 129.8 107 232 209.1l55.4-55.4L439.9 306.3l.1 .1 102.9 102.9c35.9-36.1 35.9-94.7 0-130.7zM224 384c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-purple-400">Data Science & AI</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Skill Bars with animations */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">OpenAI API</span>
                      <span className="text-xs text-purple-400">80%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-300 w-[80%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">NLP</span>
                      <span className="text-xs text-purple-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-300 w-[85%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Data Visualization</span>
                      <span className="text-xs text-purple-400">90%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-300 w-[90%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-800 text-purple-400 rounded">TensorFlow</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-purple-400 rounded">PyTorch</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-purple-400 rounded">Machine Learning</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-purple-400 rounded">Pandas</span>
                </div>
              </div>
            </div>
            
            {/* Tools & Other Card */}
            <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/90 p-1 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900 rounded-lg p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-cyan-500/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 text-cyan-400" fill="currentColor">
                      <path d="M502.6 182.6l-45.25-45.25C451.4 131.4 443.3 128 434.8 128H384V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48v48H77.25c-8.5 0-16.62 3.375-22.62 9.375L9.375 182.6C3.375 188.6 0 196.8 0 205.3V304h128v-32c0-8.875 7.125-15.1 16-15.1l224-.0001c8.875 0 16 7.125 16 15.1v32h128v-98.7C512 196.8 508.6 188.6 502.6 182.6zM336 128H176V80h160V128zM496 352h-144v16c0 8.875-7.125 16-16 16h-160c-8.875 0-16-7.125-16-16v-16H16c-8.875 0-16-7.125-16-16v-16h496v16C496 344.9 488.9 352 496 352z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400">Tools & Platforms</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Skill Bars with animations */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Git / GitHub</span>
                      <span className="text-xs text-cyan-400">95%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 w-[95%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">VS Code</span>
                      <span className="text-xs text-cyan-400">90%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 w-[90%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Figma</span>
                      <span className="text-xs text-cyan-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 w-[85%] group-hover:animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-800 text-cyan-400 rounded">Postman</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-cyan-400 rounded">Jira</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-cyan-400 rounded">Slack</span>
                  <span className="px-2 py-1 text-xs bg-gray-800 text-cyan-400 rounded">Notion</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skill Globe - 3D Visualization Placeholder */}
          <div className="relative mt-20 h-80 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="w-96 h-96 border border-dashed border-purple-500 rounded-full animate-spin-slow"></div>
              <div className="absolute w-72 h-72 border border-dashed border-blue-500 rounded-full animate-spin-slow animation-reverse"></div>
              <div className="absolute w-48 h-48 border border-dashed border-green-500 rounded-full animate-spin-slow animation-delay-2000"></div>
            </div>
            
            <div className="text-center max-w-2xl relative z-10 p-8">
              <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 font-bold mb-6">
                Engineering Digital Excellence Since 2021
              </p>
              <div className="relative px-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  With <span className="text-purple-400 font-semibold">3+ years</span> of experience crafting 
                  <span className="text-cyan-400 font-semibold"> modern web solutions</span>, I blend cutting-edge technologies 
                  with <span className="text-blue-400 font-semibold">innovative approaches</span> to build exceptional digital experiences.
                </p>
                <div className="absolute -left-4 -top-4 w-12 h-12 border-l-2 border-t-2 border-purple-500 opacity-60"></div>
                <div className="absolute -right-4 -bottom-4 w-12 h-12 border-r-2 border-b-2 border-blue-500 opacity-60"></div>
              </div>
              <div className="mt-8 flex gap-4 justify-center items-center">
                <span className="h-1.5 w-16 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
                <span className="text-sm font-mono text-gray-400 tracking-wider uppercase">
                  Delivering results that matter
                </span>
                <span className="h-1.5 w-16 bg-gradient-to-l from-blue-500 to-transparent rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Contact Me</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">Let's connect and discuss how we can work together on your next project.</p>
          
          <div className="bg-gray-900 rounded-xl p-8 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            {/* Contact Form with mailto functionality */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Construct mailto URL - send to YOUR email address, but include sender's email in body
                // Replace "farrell@yourdomain.com" with your actual email address
                const mailtoUrl = `mailto:farrellsiwy@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
                
                // Open email client
                window.location.href = mailtoUrl;
              }}
              className="relative z-10 space-y-6"
            >
              <div className="group">
                <label className="block text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors">Your Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors">Your Email</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors">Your Message</label>
                <textarea 
                  name="message"
                  required
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 px-6 relative overflow-hidden group rounded-lg transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:opacity-90"></span>
                <span className="absolute bottom-0 left-0 w-0 h-0 transition-all duration-300 border-b-2 border-purple-300 group-hover:w-full"></span>
                <span className="absolute top-0 right-0 w-0 h-0 transition-all duration-300 border-t-2 border-blue-300 group-hover:w-full"></span>
                <span className="relative text-white font-medium group-hover:text-white flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </span>
              </button>
              
              <div className="flex items-center justify-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Opens your email app to send the message
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap justify-center gap-6">
              <a href="https://github.com/farrrrrrrr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/farrellivander" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-800 text-center text-gray-500">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Farrell's Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
