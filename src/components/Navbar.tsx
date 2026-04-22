import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar({ lang, setLang, t }: { lang: string, setLang: (l: string) => void, t: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.tech, href: '#tech' },
    { name: t.nav.blog, href: '#blog' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-morphism' : 'py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold font-outfit tracking-tighter text-white"
        >
          JS<span className="text-brand-primary">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            // Verificamos si el enlace es el de Contacto
            const isContact = link.href === '#contact';

            return (
              <a
                key={link.name}
                href={link.href}
                className={
                  isContact
                    ? "px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-purple-500/20"
                    : "text-sm font-medium text-white/70 hover:text-white transition-colors"
                }
              >
                {link.name}
              </a>
            );
          })}

          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 hover:bg-white/5 transition-all"
          >
            <Globe className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-bold uppercase text-white">{lang}</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="p-2"
          >
            <Globe className="w-5 h-5 text-brand-primary" />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-dark border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={
                    link.href === '#contact'
                      ? "px-4 py-3 bg-purple-600 text-white rounded-xl text-center font-bold"
                      : "text-lg font-medium text-white"
                  }
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}