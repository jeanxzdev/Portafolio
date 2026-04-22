import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import ThreeHero from './ThreeHero';
import Typewriter from 'typewriter-effect';

export default function Hero({ t }: { t: any }) {
  return (
    <section className="relative min-h-screen flex items-center pt-5 overflow-hidden bg-black">

      {/* Contenedor de la animación a la derecha con forma de trapecio */}
      <div
        className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0 overflow-hidden"
        style={{
          clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="w-full h-full relative">
          <ThreeHero />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-semibold mb-6">
              Developer FullStack
            </span>

            {/* Título con Efecto de Mecanografía */}
            <h1 className="text-5xl md:text-6xl font-bold font-outfit leading-tight mb-6 text-white min-h-[120px] md:min-h-[150px]">
              <Typewriter
                options={{
                  strings: [t.hero.role, t.hero.role1, t.hero.role2], // Puedes poner una lista de textos
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 75,
                  wrapperClassName: "text-white", // Clase para el texto
                  cursorClassName: "text-brand-primary" // Clase para el cursor "|"
                }}
              />
            </h1>

            <p className="text-xl text-white/60 mb-10 max-w-2xl leading-relaxed">
              {t.hero.message}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20 group"
              >
                {t.hero.cta_projects}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-bold rounded-xl transition-all"
              >
                {t.hero.cta_contact}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ChevronRight className="rotate-90 w-8 h-8" />
      </motion.div>
    </section>
  );
}