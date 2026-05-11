import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useStaggerReveal } from '../../hooks/useAnimations';
import '../../styles/sections/behind-the-edits.css';

const steps = [
  {
    number: '01',
    title: 'Concept & Vision',
    description: 'Defining the creative direction, audience psychology, and visual identity behind every project.',
    icon: '🎬',
  },
  {
    number: '02',
    title: 'Storyboarding',
    description: 'Structuring scenes, pacing, and visual flow to create engaging viewer experiences.',
    icon: '📋',
  },
  {
    number: '03',
    title: 'Production',
    description: 'Bringing ideas to life through precise execution, creative direction, and high-quality content production.',
    icon: '🎥',
  },
  {
    number: '04',
    title: 'Color Grading',
    description: 'Enhancing mood and visual consistency through cinematic color treatment and finishing.',
    icon: '🎨',
  },
  {
    number: '05',
    title: 'Motion Design',
    description: 'Adding motion graphics, transitions, and visual elements that elevate engagement.',
    icon: '✨',
  },
  {
    number: '06',
    title: 'Final Delivery',
    description: 'Optimized exports and platform-ready delivery designed for maximum performance.',
    icon: '🚀',
  },
];

export default function BehindTheEdits() {
  const containerRef = useRef(null);

  useStaggerReveal(containerRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="behind-the-edits" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="edits-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="edits-title">Behind the Edits</h2>
          <p className="edits-subtitle">
           From strategy to final delivery, every edit is crafted to capture attention, elevate storytelling, and maximize audience retention.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <motion.div
          className="steps-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              className="step-item"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >              <div className="step-header">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <motion.div
                  className="step-icon"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>
              </div>

              <p className="step-description">{step.description}</p>

              {idx < steps.length - 1 && (
                <div className="step-connector">
                  <motion.div
                    className="connector-line"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>        {/* Bottom CTA */}
        <motion.div
          className="process-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p>Ready to turn your content into something people actually remember?</p>
          <a href="#pricing" className="btn btn-primary">LET’S BUILD SOMETHING</a>
        </motion.div>
      </div>
    </section>
  );
}
