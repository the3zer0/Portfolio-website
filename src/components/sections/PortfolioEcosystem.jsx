import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/sections/portfolio-ecosystem.css';

const projects = [
  {
    id: 1,
    title: "Brand Evolution",
    category: "branding",
    year: 2024,
    description: "Complete visual rebrand for tech startup",
    color: "#9d4edd",
  },
  {
    id: 2,
    title: "Digital Storytelling",
    category: "commercial",
    year: 2024,
    description: "Cinematic commercial for luxury brand",
    color: "#d4af37",
  },
  {
    id: 3,
    title: "Social Impact",
    category: "documentary",
    year: 2023,
    description: "Documentary short about social change",
    color: "#ff006e",
  },
  {
    id: 4,
    title: "Corporate Vision",
    category: "commercial",
    year: 2023,
    description: "Corporate video for Fortune 500 company",
    color: "#9d4edd",
  },
  {
    id: 5,
    title: "Fashion Forward",
    category: "branding",
    year: 2023,
    description: "Fashion brand campaign with motion design",
    color: "#00d9ff",
  },
];

const categories = ["all", "branding", "commercial", "documentary"];

export default function PortfolioEcosystem() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
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
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image" style={{ backgroundColor: project.color }}>
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
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>

              <div
                className="modal-image"
                style={{ backgroundColor: selectedProject.color }}
              >
                <div className="modal-video-placeholder">
                  <span className="play-icon">▶</span>
                </div>
              </div>

              <div className="modal-content">
                <h2 className="modal-title">{selectedProject.title}</h2>
                <p className="modal-description">{selectedProject.description}</p>

                <div className="modal-meta">
                  <span className="meta-badge">{selectedProject.category}</span>
                  <span className="meta-year">{selectedProject.year}</span>
                </div>

                <button className="btn btn-primary">
                  View Full Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
