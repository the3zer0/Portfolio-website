import { useState } from 'react';
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
  const [activeCard, setActiveCard] = useState(0);
  const [orientation, setOrientation] = useState('horizontal');

  const toggleOrientation = () => {
    setOrientation((o) => (o === 'horizontal' ? 'vertical' : 'horizontal'));
  };

  const handleNextCard = (event) => {
    event.stopPropagation();
    setActiveCard(current => (current === cards.length - 1 ? 0 : current + 1));
  };

  return (
    <div className={`process-cards-container ${orientation === 'vertical' ? 'vertical' : 'horizontal'}`}>
      {/* Background glow effects */}
      <div className="process-glow process-glow-1"></div>
      <div className="process-glow process-glow-2"></div>
      <div className="process-glow process-glow-3"></div>
      <button
        type="button"
        className="orientation-toggle"
        onClick={toggleOrientation}
        aria-pressed={orientation === 'vertical'}
        aria-label="Toggle card orientation"
      >
        {orientation === 'horizontal' ? '↕' : '↔'}
      </button>

      <div className={`process-cards-stack ${orientation === 'vertical' ? 'vertical' : ''}`}>
        {cards.map((card, index) => {
          const isActive = index === activeCard;
          const isPrev = index === (activeCard + cards.length - 1) % cards.length;
          const isNext = index === (activeCard + 1) % cards.length;

          return (
            <div
              key={card.id}
              className={`process-card ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''} ${isNext ? 'is-next' : ''}`}
              aria-hidden={!isActive}
            >
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
                  <button
                    type="button"
                    className="card-arrow-button"
                    onClick={isActive ? handleNextCard : undefined}
                    disabled={!isActive}
                    aria-label={`Go to next process slide from ${card.title}`}
                  >
                    <div className="card-arrow">→</div>
                  </button>
                </div>
              </div>

              {/* Gradient border */}
              <div className="card-border"></div>

              {/* Card backdrop blur effect */}
              <div className="card-backdrop"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
