import { motion } from 'framer-motion';
import { useState } from 'react';

const FloatingNavBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    {
      name: 'GitHub',
      href: 'https://github.com/nik1t7n',
      external: true
    },
    {
      name: 'Telegram',
      href: 'https://t.me/nik1t7n',
      external: true
    },
    {
      name: 'Email',
      href: 'mailto:20nik.nosov21@gmail.com',
      external: true
    },
    {
      name: 'Resume',
      href: '/cv.pdf',
      external: false,
      download: true
    }
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="relative bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl border border-neutral-200/30 dark:border-neutral-700/30 rounded-full px-6 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500/5 via-transparent to-purple-500/5 dark:from-purple-400/5 dark:via-transparent dark:to-purple-400/5" />
        
        <div className="relative flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              download={item.download}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative p-3 rounded-full hover:bg-white/50 dark:hover:bg-neutral-800/50 transition-all duration-200 group backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredItem === index ? 1 : 0,
                  y: hoveredItem === index ? -10 : 10
                }}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-900/90 dark:bg-neutral-100/90 backdrop-blur-sm text-white dark:text-neutral-900 text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
              >
                {item.name}
              </motion.div>

              {/* Icon */}
              <div className="w-5 h-5 flex items-center justify-center">
                {item.name === 'GitHub' && (
                  <svg width="20" height="20" viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" className="fill-neutral-900 dark:fill-white"/>
                  </svg>
                )}
                {item.name === 'Telegram' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" className="fill-neutral-900 dark:fill-white"/>
                  </svg>
                )}
                {item.name === 'Email' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" className="stroke-neutral-900 dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6l-10 7L2 6" className="stroke-neutral-900 dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.name === 'Resume' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" className="stroke-neutral-900 dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10l5 5 5-5" className="stroke-neutral-900 dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" className="stroke-neutral-900 dark:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>

              {/* Active indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: hoveredItem === index ? 1 : 0 }}
                className="absolute inset-0 rounded-full border-2 border-neutral-900 dark:border-white"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default FloatingNavBar;
