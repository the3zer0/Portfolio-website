import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ========================
   CUSTOM ANIMATION HOOKS
   ======================== */

/* Scroll-Triggered Animation Hook */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const {
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    duration = 0.8,
    ease = 'power2.out',
    trigger = undefined,
    start = 'top 80%',
  } = options;

  useEffect(() => {
    const element = trigger || ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      from,
      {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          end: 'top 50%',
          scrub: false,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [from, to, duration, ease, trigger, start]);

  return ref;
}

/* Parallax Animation Hook */
export function useParallax(speed = 0.5, ref = null) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [speed, targetRef]);

  return targetRef;
}

/* Cursor Following Hook */
export function useCursorMagnet(strength = 30, ref = null) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: (x / rect.width) * strength,
        y: (y / rect.height) * strength,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
        overwrite: 'auto',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, targetRef]);

  return targetRef;
}

/* Stagger Reveal Hook */
export function useStaggerReveal(ref = null) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const children = element.querySelectorAll('[data-stagger]');
    if (children.length === 0) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [targetRef]);

  return targetRef;
}

/* Text Character Reveal Hook */
export function useTextReveal(ref = null) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const text = element.innerText;
    const chars = text.split('').map(char => 
      `<span style="opacity: 0; display: inline-block;">${char}</span>`
    );
    element.innerHTML = chars.join('');

    gsap.fromTo(
      element.querySelectorAll('span'),
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.02,
        ease: 'back.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [targetRef]);

  return targetRef;
}

/* SVG Stroke Draw Hook */
export function useStrokeDraw(ref = null) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;

  useEffect(() => {
    const svg = targetRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('path, circle, line, rect, polygon');
    
    paths.forEach(path => {
      if (path instanceof SVGElement && path.getTotalLength) {
        const length = path.getTotalLength?.() || 0;
        if (length) {
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;

          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: svg,
              start: 'top 80%',
              end: 'top 50%',
              scrub: false,
              markers: false,
            },
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [targetRef]);

  return targetRef;
}

/* Hover Scale Hook */
export function useHoverScale(scale = 1.05, ref = null) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale, targetRef]);

  return targetRef;
}

/* Continuous Float Animation Hook */
export function useFloatAnimation(intensity = 20, ref = null) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    gsap.to(element, {
      y: intensity,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [intensity, targetRef]);

  return targetRef;
}

/* Scroll Horizontal Parallax Hook */
export function useHorizontalScroll(speed = 100, ref = null) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    gsap.to(element, {
      x: -speed,
      scrollTrigger: {
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [speed, targetRef]);

  return targetRef;
}

/* Intersection Observer Hook (Simple Fade-in) */
export function useIntersectionObserver(ref = null, options = {}) {
  const elementRef = useRef(null);
  const targetRef = ref || elementRef;
  
  const { threshold = 0.1, rootMargin = '0px' } = options;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, targetRef]);

  return targetRef;
}
