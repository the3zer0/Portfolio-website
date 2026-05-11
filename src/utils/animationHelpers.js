/* ========================
   ANIMATION UTILITIES & EASINGS
   ======================== */

export const Easings = {
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  smoothIn: 'cubic-bezier(0.7, 0, 1, 0.5)',
  smoothOut: 'cubic-bezier(0, 0.5, 0.3, 1)',
  bounceLight: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

export const Timings = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  cinematic: 1.2,
};

export const AnimationPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: Timings.normal, ease: Easings.smoothOut },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: Timings.normal },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: Timings.normal, ease: Easings.smooth },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: Timings.normal, ease: Easings.smoothOut },
  },
  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: Timings.normal, ease: Easings.smoothOut },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: Timings.normal, ease: Easings.smooth },
  },
};

/* STAGGER CONTAINER VARIANTS */
export const StaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const StaggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: Timings.normal, ease: Easings.smoothOut },
  },
};

/* GSAP ANIMATION HELPERS */
export const gsapAnimations = {
  /* Text Character Reveal */
  revealText: (element, duration = 0.5) => {
    const text = element.innerText;
    const chars = text.split('').map(char => 
      `<span style="opacity: 0; display: inline-block;">${char}</span>`
    );
    element.innerHTML = chars.join('');
    
    gsap.to(element.querySelectorAll('span'), {
      opacity: 1,
      duration: 0.05,
      stagger: duration / text.length,
      ease: 'back.out',
    });
  },

  /* Line Draw Animation */
  drawLine: (element, duration = 1) => {
    const length = element.getTotalLength();
    gsap.fromTo(
      element,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration, ease: 'power2.inOut' }
    );
  },

  /* Magnetic Button Effect */
  magneticButton: (element) => {
    const magneticForce = 30;
    
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: (x / rect.width) * magneticForce,
        y: (y / rect.height) * magneticForce,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  },

  /* Scroll Trigger Animation */
  scrollReveal: (element, options = {}) => {
    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 0.8,
      ease = 'power2.out',
      delay = 0,
    } = options;

    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(
      element,
      from,
      {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          markers: false,
        },
        delay,
      }
    );
  },

  /* Parallax on Scroll */
  parallaxScroll: (element, speed = 0.5) => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(element, {
      y: window.innerHeight * speed,
      scrollTrigger: {
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        markers: false,
      },
    });
  },
};
