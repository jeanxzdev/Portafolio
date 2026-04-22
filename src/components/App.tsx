import React, { useState, useEffect } from 'react'; // Añadido useEffect
import { motion } from 'framer-motion'; // Añadido motion
import Navbar from './Navbar';
import Hero from './Hero';
import ProjectCard from './ProjectCard';
import TechStack from './TechStack';
import Contact from './Contact';
import Blog from './Blog';
import es from '../i18n/es.json';
import en from '../i18n/en.json';
import projectsData from '../data/projects.json';

export default function App({ posts }: { posts: any[] }) {
  const [lang, setLang] = useState('es');
  const t = lang === 'es' ? es : en;

  // --- LÓGICA DE ANIMACIÓN ---
  const [activeIndex, setActiveIndex] = useState(0);
  const ANIMATION_SPEED = 1000; // VARIABLE AJUSTABLE (milisegundos)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3); // Cambia entre 0, 1 y 2
    }, ANIMATION_SPEED);
    return () => clearInterval(interval);
  }, []);
  // ---------------------------

  const stats = [
    { label: "Self-taught", sub: "Mindset" },
    { label: "Products", sub: "Focus" },
    { label: "Results", sub: "Driven" }
  ];

  return (
    <main className="bg-bg-dark text-white">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <Hero t={t} />

      {/* About Section */}
      <section id="about" className="py-24 bg-bg-card/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8 font-outfit">{t.about.title}</h2>
            <div className="relative pl-8 border-l-4 border-brand-primary">
              <p className="text-white/80 text-xl leading-relaxed italic">
                "{t.about.content}"
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: activeIndex === i ? 1.1 : 1,
                    borderColor: activeIndex === i ? 'rgba(168, 85, 247, 0.5)' : 'rgba(255, 255, 255, 0.05)',
                    backgroundColor: activeIndex === i ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                  transition={{ duration: 0.5 }}
                  className="p-4 rounded-xl border relative overflow-hidden group"
                >
                  {/* Efecto de resplandor interno */}
                  {activeIndex === i && (
                    <motion.div
                      layoutId="glow"
                      className="absolute inset-0 bg-brand-primary/20 blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className={`font-bold text-2xl mb-1 transition-colors duration-500 ${activeIndex === i ? 'text-white' : 'text-brand-primary'}`}>
                      {stat.label}
                    </div>
                    <div className="text-white/40 text-xs uppercase tracking-widest">{stat.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold font-outfit mb-4">{t.projects.title}</h2>
              <p className="text-white/40 max-w-md">Solutions crafted specifically for business impact and real user needs.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projectsData.map(project => (
              <ProjectCard key={project.id} project={project} lang={lang} t={t} />
            ))}
          </div>
        </div>
      </section>

      <TechStack t={t} />
      <Blog posts={posts} t={t} />
      <Contact t={t} />

      <footer className="py-12 border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <p className="text-white/20 text-sm mb-4 tracking-widest uppercase">Jeancarlos Salcedo Quispe</p>
          <div className="flex justify-center space-x-6 text-white/40 mb-8">
            <a href="https://github.com/jeanxzdev" className="hover:text-brand-primary">GitHub</a>
            <a href="https://www.linkedin.com/in/jeancarlos-salcedo-quispe/" className="hover:text-brand-primary">LinkedIn</a>
            <a href="https://wa.me/51963562067" className="hover:text-brand-primary">WhatsApp</a>
          </div>
          <p className="text-[10px] text-white/10 uppercase tracking-tighter">
            © {new Date().getFullYear()} No templates were harmed in the making of this pixel-perfect site.
          </p>
        </div>
      </footer>
    </main>
  );
}