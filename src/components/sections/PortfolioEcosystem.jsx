import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { asset } from '../../utils/asset';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/sections/portfolio-ecosystem.css';

const projects = [
 
  {
    id: 1,
    title: "Typography in Motion",
    category: "Practice",
    year: 2026,
    description: "A simple typography edit. Clean motion, smooth animation, and meaning behind every word.",
    hook: "Clean motion, smooth rhythm, and meaning behind every word.",
    tools: ['after-effects.png'],
    color: "#2dd4bf",
    videoId: 'QozVu0nCeb8',
    poster: 'typo.png',
  },
  {
    id: 2,
    title: "Typography",
    category: "Practice",
    year: 2026,
    description: "YouTube Short practice clip",
    hook: "A compact typography exercise built for short-form attention.",
    tools: ['after-effects.png', 'premiere-pro.png'],
    color: "#f97316",
    videoId: 'ACrOPLjY4xA',
    poster: 'p.png',
  },
  {
    id: 3,
    title: "Podcast On Client Hunting",
    category: "Podcast",
    year: 2025,
    description: "Featured podcast video",
    hook: "A podcast edit focused on clarity, pacing, and retention.",
    tools: ['premiere-pro.png'],
    color: "#1f2937",
    videoId: 'HnvYalV-BOU',
    poster: 'client.png',
  },
  {
    id: 4,
    title: "AI Advertising Short",
    categories: ["Advertising", "Using AI"],
    year: 2026,
    description: `Created a fully AI-powered commercial video — from concept development to final edit.
This project combines AI video generation, sound design, and storytelling to create a modern promotional ad experience.

In this project:
AI Video Generation,
Typography Animation,
Sound Design,
Creative Direction`,
  hook: "An AI-assisted ad built around motion, sound, and story.",
  tools: ['after-effects.png', 'chatgpt.png', 'illustrator.png', 'photoshop.png'],
    color: "#0f172a",
    videoId: 'ZfNsTScUwpU',
    poster: 'ai1.png',
  },
  {
    id: 5,
    title: "Cinematic Motion Graphics in After Effects",
    category: "Practice",
    year: 2025,
    description: `A cinematic motion graphics and typography animation project created using: Adobe After Effects and Adobe Premiere Pro.

This project focuses on:

Time-based animation,
Cinematic typography,
Motion design,
Visual storytelling,
Dynamic transitions,
Premium editing aesthetics`,
  hook: "Cinematic typography with a polished motion-design finish.",
  tools: ['after-effects.png', 'premiere-pro.png'],
    color: "#6b21a8",
    videoId: 'cvcJGoWiTXs',
    videoUrl: 'https://youtube.com/shorts/cvcJGoWiTXs',
    poster: 'time.png',
  },
  {
    id: 6,
    title: "Typography 2026",
    category: "Practice",
    year: 2026,
    description: `A cinematic motion graphics project fully created inside Adobe After Effects. Created using:

  Adobe After Effects,
  Motion Graphics,
  Typography Animation,
  Cinematic Transitions,
  Sound Design,
  Visual Effects`,
    hook: "A cinematic motion graphics experience — crafted entirely inside Adobe After Effects.",
    tools: ['after-effects.png'],
    color: "#ef4444",
    videoId: '835u3xtpiyo',
    videoUrl: 'https://youtu.be/835u3xtpiyo',
    poster: 'money.png',
  },
  
];

const categories = ["all","Podcast","Practice", "Advertising", "Using AI"];

export default function PortfolioEcosystem() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalPlaying, setModalPlaying] = useState(false);
  const containerRef = useRef(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter(p =>
          Array.isArray(p.categories)
            ? p.categories.includes(activeCategory)
            : p.category === activeCategory
        );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  const getSectorLabel = project =>
    (Array.isArray(project.categories) ? project.categories : [project.category])
      .filter(Boolean)
      .join(' / ')
      .replace(/-/g, ' ');

  return (
    <section id="portfolio" className="portfolio-ecosystem" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="ecosystem-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="ecosystem-title">Portfolio</h2>
          <p className="ecosystem-subtitle">
          Projects built around <b>storytelling, audience retention, and cinematic visuals</b> — designed to turn content into memorable experiences.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="filter-bar"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                className="project-card-wrapper"
                variants={itemVariants}
              >
                <motion.div
                  className="project-card"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => { setSelectedProject(project); setModalPlaying(false); }}
                >
                  <div className="project-image" style={{ backgroundColor: '#000' }}>
                    {project.poster ? (
                      <img src={asset(project.poster)} alt={project.title} className="project-thumb" />
                    ) : null}
                    <motion.div
                      className="project-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="play-button">▶</span>
                    </motion.div>
                  </div>

                  <div className="project-content">
                    <motion.h3
                      className="project-title"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, color: '#d4af37' }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>

                    <p className="project-sector">{getSectorLabel(project)}</p>

                    <p className="project-hook">
                      {project.hook || project.description}
                    </p>

                    <div className="project-tools" aria-label={`${project.title} tools`}>
                      {(project.tools || []).map(tool => (
                        <span className="tool-logo" key={tool}>
                          <img src={asset(tool)} alt={tool.replace(/\.[^.]+$/, '').replace(/-/g, ' ')} />
                        </span>
                      ))}
                    </div>

                    <p className="project-year">{project.year}</p>
                  </div>

                  <div className="project-border" style={{ borderColor: project.color }} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
            <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
                onClick={() => { setSelectedProject(null); setModalPlaying(false); }}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
            >
              {/* close button rendered via portal to avoid iframe stacking issues */}

              <div
                className="modal-image"
                style={{ backgroundColor: '#000' }}
              >
                {selectedProject.videoId ? (
                  <div className="modal-video-area">
                    {!modalPlaying ? (
                      <button
                        type="button"
                        className="modal-video-poster"
                        onClick={() => setModalPlaying(true)}
                        aria-label="Play project video"
                      >
                        <img src={asset(selectedProject.poster || 'client.png')} alt={selectedProject.title} />
                        <span className="play-icon">▶</span>
                      </button>
                    ) : (
                      <>
                        <iframe
                          className="modal-iframe"
                          src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                          title={selectedProject.title}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          loading="eager"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <div className="modal-video-placeholder">
                    <span className="play-icon">▶</span>
                  </div>
                )}
              </div>

              <div className="modal-content">
                <h2 className="modal-title">{selectedProject.title}</h2>
                <p className="modal-description">{selectedProject.description}</p>

                <div className="modal-meta">
                  <span className="meta-badge">
                    {getSectorLabel(selectedProject)}
                  </span>
                  <span className="meta-year">{selectedProject.year}</span>
                </div>

                <a
                  href={selectedProject.videoUrl ? selectedProject.videoUrl : (selectedProject.videoId ? `https://youtube.com/shorts/${selectedProject.videoId}` : '#')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
  <button className="btn btn-primary">
    View Full Project
  </button>
</a>
              </div>
            </motion.div>
              {selectedProject && createPortal(
                <button
                  className="modal-close"
                  onClick={() => { setSelectedProject(null); setModalPlaying(false); }}
                  aria-label="Close project modal"
                >
                  ✕
                </button>,
                document.body
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
