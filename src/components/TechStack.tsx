import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind", "Bootstrap"]
  },
  {
    title: "Backend",
    items: ["Python", "PHP", "Express", "Laravel", "Django", "Flask"]
  },
  {
    title: "Databases",
    items: ["MySQL", "PostgreSQL"]
  },
  {
    title: "Tools & Cloud",
    items: ["Git", "Docker", "n8n", "Resend", "Vercel", "Netlify", "Render"]
  }
];

export default function TechStack({ t }: { t: any }) {
  // --- LÓGICA DE BRILLO SECUENCIAL ---
  const [activeIndex, setActiveIndex] = useState(0);
  const ANIMATION_SPEED = 2500; // Ajusta la velocidad aquí (ms)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % techGroups.length);
    }, ANIMATION_SPEED);
    return () => clearInterval(interval);
  }, []);
  // ----------------------------------

  return (
    <section id="tech" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 font-outfit text-center">{t.nav.tech}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techGroups.map((group, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{
                  borderColor: isActive ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.05)',
                  backgroundColor: isActive ? 'rgba(168, 85, 247, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                  y: isActive ? -5 : 0
                }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-2xl bg-bg-card border relative overflow-hidden"
              >
                {/* Resplandor (Glow) detrás del contenido */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-brand-primary/10 blur-3xl -z-10"
                    />
                  )}
                </AnimatePresence>

                <h3 className={`font-bold uppercase tracking-widest text-xs mb-6 transition-colors duration-500 ${isActive ? 'text-white' : 'text-brand-primary'}`}>
                  {group.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {group.items.map(item => (
                    <span
                      key={item}
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-500 border ${isActive
                          ? 'bg-brand-primary/20 border-brand-primary/30 text-white shadow-lg shadow-brand-primary/10'
                          : 'bg-white/5 border-transparent text-white/60'
                        }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Barra de progreso sutil en la parte inferior */}
                {isActive && (
                  <motion.div
                    layoutId="techProgress"
                    className="absolute bottom-0 left-0 h-0.5 bg-brand-primary w-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: ANIMATION_SPEED / 1000, ease: "linear" }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}