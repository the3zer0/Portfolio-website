import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallax, useStaggerReveal } from '../../hooks/useAnimations';
import ProcessCards from '../ProcessCards';
import '../../styles/sections/the-story.css';

export default function TheStory() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useStaggerReveal(containerRef);
  useParallax(0.5, rightRef);

  const storyParagraphs = [
    {
      title: "Crafting Motion, Telling Stories",
      content: "Every frame matters. I create high-retention YouTube videos and cinematic short-form content designed to stop the scroll, hold attention, and build lasting audience connection. Every edit is crafted with strategy, pacing, and storytelling in mind — turning content into growth."
    },
    {
      title: "The Process",
      content: "From raw footage to final delivery, every project is built around emotion, rhythm, and viewer psychology. I combine editing, motion design, sound design, and visual storytelling to create content that feels premium and performs across modern platforms."
    },
    {
      title: "The Philosophy",
      content: "Great editing isn’t just about transitions or effects — it’s about making people feel something. I believe every frame should serve a purpose: capturing attention, creating emotion, and leaving a lasting impression."
    }
  ];
  return (
    <section id="story" className="the-story" ref={containerRef}>
      <div className="container">
        <div className="story-grid">
          {/* Left Column - Narrative Text */}
          <motion.div
            className="story-left"
            ref={leftRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {storyParagraphs.map((para, idx) => (
              <motion.div
                key={idx}
                className="story-item"
                data-stagger
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="story-title">{para.title}</h3>
                <p className="story-text">{para.content}</p>
              </motion.div>
            ))}
          </motion.div>          {/* Right Column - Process Cards */}
          <motion.div
            className="story-right"
            ref={rightRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProcessCards />
          </motion.div>
        </div>

        {/* Accent Elements */}
        <div className="story-accents">
          <motion.div
            className="accent-circle accent-1"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="accent-circle accent-2"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
