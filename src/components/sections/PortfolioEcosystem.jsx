import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { asset } from '../../utils/asset';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/sections/portfolio-ecosystem.css';

const projects = [
 
  {
    id: 6,
    title: "Typography in Motion",
    category: "Practice",
    year: 2026,
    description: "YouTube Short — featured practice piece",
    color: "#2dd4bf",
    videoId: 'QozVu0nCeb8',
    poster: 'typo.png',
  },
  {
    id: 7,
    title: "Typography",
    category: "Practice",
    year: 2026,
    description: "YouTube Short practice clip",
    color: "#f97316",
    videoId: 'ACrOPLjY4xA',
    poster: 'p.png',
  },
];

const categories = ["all", "branding", "Practice", "Advertising"];

export default function PortfolioEcosystem() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalPlaying, setModalPlaying] = useState(false);
  const [modalPaused, setModalPaused] = useState(false);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter(p => p.category === activeCategory);

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
  return (
    <section id="portfolio" className="portfolio-ecosystem" ref={containerRef}>
      <div className="container">        {/* Section Header */}
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
                  <div className="project-image" style={{ backgroundColor: project.color }}>
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

                    <p className="project-category">{project.category.replace(/-/g, ' ')}</p>

                    <motion.p
                      className="project-description"
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.description}
                    </motion.p>

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
                style={{ backgroundColor: selectedProject.color }}
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
                          ref={iframeRef}
                          src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                          title={selectedProject.title}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          loading="eager"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />

                        <button
                          className={`modal-pause-toggle ${modalPaused ? 'paused' : 'playing'}`}
                          aria-label={modalPaused ? 'Play video' : 'Pause video'}
                          onClick={() => {
                            if (!iframeRef.current) return;
                            const win = iframeRef.current.contentWindow;
                            if (!win) return;
                            if (modalPaused) {
                              win.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                              setModalPaused(false);
                            } else {
                              win.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                              setModalPaused(true);
                            }
                          }}
                        >
                          <span className="modal-pause-icon">{modalPaused ? '▶' : '⏸'}</span>
                        </button>
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
                  <span className="meta-badge">{selectedProject.category}</span>
                  <span className="meta-year">{selectedProject.year}</span>
                </div>

                <a
  href="https://youtube.com/shorts/ACrOPLjY4xA?si=QifFTfh5iG_Vhslt"
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
