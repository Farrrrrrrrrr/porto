import React from 'react';
import { RobotCanvas } from '../components/RobotCanvas';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ComputersCanvas } from '../components/canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

function Home() {
  return (
    <div className="home-container" style={{ 
      backgroundColor: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Add a welcome text to ensure there's some content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        padding: '20vh 10vw',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Welcome to My Portfolio</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
          Explore my work while my 3D robot assistant follows your cursor.
        </p>
      </div>
      
      {/* Your existing homepage content */}
      <div className="relative w-full h-screen mx-auto">
        <div
          className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
        >
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          <div>
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm <span className="text-[#915EFF]">Farrell</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I develop 3D visuals, user <br className="sm:block hidden" />
              interfaces and web applications
            </p>
          </div>
        </div>

        <ComputersCanvas />

        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
      </div>
      
      {/* Add the Robot Canvas */}
      <RobotCanvas />
      
    </div>
  );
}

export default Home;