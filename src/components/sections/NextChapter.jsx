import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import '../../styles/sections/next-chapter.css';

export default function NextChapter() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleButtonHover = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  };

  const handleButtonHoverEnd = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="next-chapter" ref={containerRef}>
      {/* Animated Background */}
      <motion.div
        className="chapter-bg-blur"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 50%, rgba(157, 78, 221, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container">
        <motion.div
          className="chapter-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Eyebrow Text */}
          <motion.p
            className="chapter-eyebrow"
            variants={itemVariants}
          >
           READY TO CREATE SOMETHING UNFORGETTABLE?
          </motion.p>

          {/* Main Heading */}
          <motion.h2
            className="chapter-title"
            variants={itemVariants}
          >
            Let's Create <span className="accent">Something</span> Extraordinary
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="chapter-subtitle"
            variants={itemVariants}
          >
From strategy to final delivery, every project is crafted to capture attention, tell meaningful stories, and leave lasting impact.

          </motion.p>          {/* CTA Buttons */}
          <motion.div
            className="chapter-buttons"
            variants={itemVariants}
          >
            <motion.a
              href="#pricing"
              className="btn btn-primary"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonHoverEnd}
              whileTap={{ scale: 0.95 }}
            >
             Let's Build Something
            </motion.a>

            <motion.a
              href="#portfolio"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="chapter-trust"
            variants={itemVariants}
          >
            <div className="trust-item">
              <span className="trust-number">50+</span>
              <span className="trust-label">Projects Delivered</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">100%</span>
              <span className="trust-label">Client Satisfaction</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">1.5+</span>
              <span className="trust-label">Years Experience</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="float-element float-1"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="float-element float-2"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
}
