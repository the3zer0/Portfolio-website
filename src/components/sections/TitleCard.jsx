import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import '../../styles/sections/title-card-enhanced.css';

export default function TitleCard() {
  const ref = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    /* Animate Heading - Character Reveal */
    const heading = headingRef.current;
    if (heading) {
      const text = heading.innerText;
      const chars = text.split('').map((char, i) => (
        `<span class="char" style="animation-delay: ${i * 0.05}s;">${char}</span>`
      ));
      heading.innerHTML = chars.join('');
    }

    /* Animate Subtitle - Line by Line */
    const subtitle = subtitleRef.current;
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power2.out' }
      );
    }

    /* Particle Background Animation */
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };
      animate();
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="title-card" ref={ref}>
      <canvas ref={canvasRef} className="particle-bg" />

      <div className="title-content">
        <div className="title-grid">
          {/* Left Side - Initials */}
          <motion.div
            className="title-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h1 ref={headingRef} className="title-initials">
              JMR
            </h1>
            <div className="diagonal-line" />
          </motion.div>

          {/* Right Side - Subtitle */}
          <motion.div
            className="title-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          >
            <p ref={subtitleRef} className="title-subtitle">
              Video Editor & Motion Designer
            </p>
            <p className="title-description">
              Crafting cinematic stories through motion. Premium creative work for brands that demand excellence.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span>Scroll to explore</span>
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
