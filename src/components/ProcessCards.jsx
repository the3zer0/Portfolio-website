import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { asset } from '../utils/asset';
import '../styles/process-cards.css';

const cards = [
  {
    id: 1,
    title: 'Strategy & Hook',
    subtitle: 'CAPTURE ATTENTION FAST',
    description: 'Crafting powerful hooks and content strategy designed to stop the scroll and instantly grab viewer attention.',
    icon: asset('radar.png'),
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 2,
    title: 'Editing & Retention',
    subtitle: 'KEEP THEM WATCHING',
    description: 'Cinematic editing, pacing, motion design, and storytelling focused on maximizing engagement and viewer retention.',
    icon: asset('activity.png'),
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Delivery & Growth',
    subtitle: 'CONTENT THAT PERFORMS',
    description: 'Platform-optimized delivery and strategic formatting built to increase reach, audience growth, and long-term impact.',
    icon: asset('trending.png'),
    color: 'from-cyan-500 to-purple-500',
  },
];

export default function ProcessCards() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const handleMouseMove = (e, cardId) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="process-cards-container"
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background glow effects */}
      <div className="process-glow process-glow-1"></div>
      <div className="process-glow process-glow-2"></div>
      <div className="process-glow process-glow-3"></div>      <div className="process-cards-stack">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`process-card ${hoveredCard === card.id ? 'hovered' : ''} ${
              hoveredCard !== null && hoveredCard !== card.id ? 'dimmed' : ''
            }`}
            variants={cardVariants}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onMouseMove={(e) => handleMouseMove(e, card.id)}
            animate={{
              ...floatingAnimation.animate,
              scale: hoveredCard === card.id ? 1.05 : 1 - index * 0.1,
              zIndex: hoveredCard === card.id ? 100 : cards.length - index,
            }}
            transition={{
              scale: { duration: 0.4, ease: 'easeOut' },
              y: floatingAnimation.animate.y.transition,
            }}
            style={{
              '--delay': `${index * 0.2}s`,
              '--card-index': index,
            }}
          >
            {/* Card inner glow */}
            <div className="card-glow-inner"></div>

            {/* Card content */}
            <div className="process-card-content">
              <div className="card-icon">
                <img src={card.icon} alt={card.title} />
              </div>

              <div className="card-header">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-subtitle">{card.subtitle}</p>
              </div>

              <p className="card-description">{card.description}</p>

              <div className="card-footer">
                <span className="card-number">0{card.id}</span>
                <div className="card-arrow">→</div>
              </div>
            </div>

            {/* Gradient border */}
            <div className="card-border"></div>

            {/* Card backdrop blur effect */}
            <div className="card-backdrop"></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
