import React, { useState } from 'react'; // Añadimos useState
import { motion, AnimatePresence } from 'framer-motion'; // Añadimos AnimatePresence
import { Code, ChevronDown } from 'lucide-react'; // Añadimos ChevronDown

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project, lang, t }: { project: any, lang: string, t: any }) {
  const [showDetails, setShowDetails] = useState(false); // Estado para mostrar/ocultar

  const desc = project.description[lang];
  const problem = project.problem[lang];
  const solution = project.solution[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-all duration-500"
    >
      {/* IMAGEN CLICKEABLE */}
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video bg-white/5 relative overflow-hidden cursor-pointer"
      >
        {project.image ? (
          <img
            src={project.image.startsWith('http') ? project.image : `${import.meta.env.BASE_URL}${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <Code size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="bg-black/60 px-4 py-2 rounded-full text-[10px] font-bold text-white border border-white/10 tracking-widest">
            VER DEMO ONLINE
          </span>
        </div>
      </a>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold font-outfit">{project.title}</h3>
          <div className="flex space-x-3">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-brand-primary/20 hover:text-brand-primary transition-colors">
              <GithubIcon />
            </a>
          </div>
        </div>

        <p className="text-white/60 mb-6 text-sm">{desc}</p>

        {/* BOTÓN DE DETALLES */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center space-x-2 text-xs font-bold text-brand-primary uppercase tracking-widest hover:text-white transition-colors mb-4"
        >
          <span>{showDetails ? 'Ocultar info' : 'Detalles'}</span>
          <motion.div
            animate={{ rotate: showDetails ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </button>

        {/* SECCIÓN DESPLEGABLE */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-2 pb-6 border-t border-white/5">
                <div className="text-sm">
                  <span className="text-brand-primary/80 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    {t.projects.problem}
                  </span>
                  <p className="text-white/80 leading-relaxed">{problem}</p>
                </div>
                <div className="text-sm">
                  <span className="text-brand-secondary/80 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    {t.projects.solution}
                  </span>
                  <p className="text-white/80 leading-relaxed">{solution}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TECNOLOGÍAS (Siempre visibles para SEO y contexto rápido) */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-medium text-white/40 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}