import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/sections/client-impact.css';

const testimonials = [
  {
    id: 1,
    quote: "The edits matched our brand style perfectly and helped our content feel more modern and engaging across social platforms.",
    author: "IstionBD",
    role: "Brand Collaboration",
    rating: 5,
  },
  {
    id: 2,
    quote: "Creative visuals, smooth transitions, and strong attention to detail made our promotional content stand out.",
    author: "Outfit Istition",
    role: "Brand Collaboration",
    rating: 5,
  },
  {
    id: 3,
    quote: "Maowa created a promotional video for Tuition Hub Mymensingh with clean editing, engaging pacing, and professional visuals that made our content more impactful and student-friendly.",
    author: "MD. Tanbir Ahmmed",
    role: "CEO, Tuition Hub Mymensingh",
    rating: 5,
  },
  {
    id: 4,
    quote: "JMR transformed our vision into reality. The cinematic quality and attention to detail elevated our brand beyond expectations.",
    author: "Sarah Ali",
    role: "Creative Director, TechFlow",
    rating: 5,
  },
  
  {
    id: 5,
    quote: "Professionalism meets creativity. JMR delivered a final product that exceeded our expectations and resonated with our audience.",
    author: "David Kim",
    role: "Founder, Dream Digital",
    rating: 5,
  },
];

export default function ClientImpact() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const next = () => {
    setDirection(1);
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  const scrollCarousel = (direction) => {
    if (scrollContainerRef.current) {
      const viewportWidth = scrollContainerRef.current.getBoundingClientRect().width || 300;

      scrollContainerRef.current.scrollBy({
        left: direction * viewportWidth,
        behavior: 'smooth',
      });
    }
  };

  const goToTestimonial = (idx) => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches && scrollContainerRef.current) {
      const viewportWidth = scrollContainerRef.current.getBoundingClientRect().width || 300;
      scrollContainerRef.current.scrollTo({
        left: viewportWidth * idx,
        behavior: 'smooth',
      });
    }

    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const viewportWidth = scrollEl.getBoundingClientRect().width || 1;
      const nextIndex = Math.round(scrollEl.scrollLeft / viewportWidth);
      const boundedIndex = Math.max(0, Math.min(testimonials.length - 1, nextIndex));
      setCurrent(boundedIndex);
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="impact" className="client-impact" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="impact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >          <h2 className="impact-title">Client Reviews</h2>
          <p className="impact-subtitle">
            Hear from brands and creators who transformed their vision with me.
          </p>
        </motion.div>

        {/* Desktop Carousel - Single Card */}
        <div className="carousel-wrapper carousel-desktop">
          <div className="carousel-container">
            <motion.div
              key={testimonials[current].id}
              className="testimonial-card-large"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              custom={direction}
            >
              <div className="testimonial-card">
                {/* Stars */}
                <div className="stars">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <span key={i} className="star">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="quote">
                  "{testimonials[current].quote}"
                </blockquote>

                {/* Author */}
                <div className="author-info">
                  <div className="author-avatar">
                    {testimonials[current].author.charAt(0)}
                  </div>
                  <div className="author-details">
                    <p className="author-name">{testimonials[current].author}</p>
                    <p className="author-role">{testimonials[current].role}</p>
                  </div>
                </div>

                {/* Decorative Quote Marks */}
                <div className="quote-mark quote-mark-top">"</div>
                <div className="quote-mark quote-mark-bottom">"</div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            className="carousel-nav-btn carousel-nav-prev"
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonial"
          >
            ‹
          </motion.button>

          <motion.button
            className="carousel-nav-btn carousel-nav-next"
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonial"
          >
            ›
          </motion.button>
        </div>

        {/* Mobile Carousel - All Cards Scrollable */}
        <div className="carousel-wrapper carousel-mobile">
          <div className="carousel-scroll-wrapper">
            <div className="carousel-scroll-container" ref={scrollContainerRef}>
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  className="testimonial-card-mobile"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="testimonial-card">
                    {/* Stars */}
                    <div className="stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="quote">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="author-info">
                      <div className="author-avatar">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="author-details">
                        <p className="author-name">{testimonial.author}</p>
                        <p className="author-role">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Decorative Quote Marks */}
                    <div className="quote-mark quote-mark-top">"</div>
                    <div className="quote-mark quote-mark-bottom">"</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Navigation */}
            <motion.button
              className="carousel-nav-btn carousel-nav-prev carousel-nav-mobile"
              onClick={() => scrollCarousel(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll left"
            >
              ‹
            </motion.button>

            <motion.button
              className="carousel-nav-btn carousel-nav-next carousel-nav-mobile"
              onClick={() => scrollCarousel(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll right"
            >
              ›
            </motion.button>
          </div>
        </div>

        {/* Indicators */}
        <div className="carousel-indicators-wrapper">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              className={`carousel-indicator ${idx === current ? 'active' : ''}`}
              onClick={() => goToTestimonial(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Background Gradient */}
      <div className="impact-bg-gradient" />
    </section>
  );
}
