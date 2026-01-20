import { useState, useEffect } from 'react';
import { isMobile } from '../utils/mobileDetection';
import { Info } from 'lucide-react';
import { colors } from '../theme';

export default function Intro() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(isMobile());
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: isMobileView ? '-40px' : '-15px',
        bottom: isMobileView ? 'auto' : '-50px',
        top: isMobileView ? '0px' : 'auto',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        transform: isVisible
          ? isMobileView
            ? 'translateX(0)'
            : 'translateX(0)'
          : 'translateX(100%)',
        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: 'transparent',
          pointerEvents: 'auto',
          maxWidth: isMobileView ? '180px' : '240px',
          textAlign: 'right',
          transform: isMobileView ? 'translateY(-5px)' : 'translateY(-20px)',
        }}
      >
        <p
          style={{
            background: 'linear-gradient(135deg, #3A1F6F 0%, #8B3A0F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: isMobileView ? '16px' : '14px',
            lineHeight: isMobileView ? '1.4' : '1.5',
            margin: 0,
            fontWeight: '600',
          }}
        >
          Hey, I’m Prince; Frontend dev with 6+ yop; Hover aimlessly, thats how you'll learn about
          me;
          <span
            style={{
              display: 'inline-block',
              marginLeft: '0.5rem',
              position: 'relative',
              verticalAlign: 'middle',
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
            onMouseEnter={() => !isMobileView && setShowCredits(true)}
            onMouseLeave={() => !isMobileView && setShowCredits(false)}
            onClick={() => isMobileView && setShowCredits((s) => !s)}
          >
            <Info />
          </span>
        </p>

        {showCredits && (
          <div
            className='intro-credits-tooltip'
            style={{
              position: 'absolute',
              right: 0,
              bottom: 'calc(100% + 10px)',
              width: isMobileView ? '220px' : '300px',
              maxWidth: '80vw',
              maxHeight: '200px',
              overflowY: 'auto',
              background: `linear-gradient(135deg, ${colors.background.dark}, ${colors.primary[900]})`,
              color: colors.text.primary,
              WebkitTextFillColor: colors.text.primary,
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.78rem',
              fontWeight: 500,
              textAlign: 'left',
              boxShadow: `0 12px 30px rgba(91, 33, 182, 0.32), 0 8px 20px ${colors.shadow.dark}`,
              backdropFilter: 'blur(6px)',
              zIndex: 2000,
              lineHeight: 1.4,
              whiteSpace: 'pre-line',
            }}
          >
            {`Some 3D models and assets used in this portfolio are sourced from third-party platforms and are used under Creative Commons and other applicable licenses for demonstration purposes.`}
            <span
              style={{ fontWeight: 600 }}
            >{`\nClick on my laptop to view full attributions and links.`}</span>
          </div>
        )}
      </div>

      <div
        style={{
          minWidth: isMobileView ? '90px' : '120px',
        }}
      >
        <img
          src='/images/doodle.png'
          alt='Prince'
          style={{
            width: isMobileView ? '90px' : '120px',
          }}
          className='image-doodle'
        />
      </div>
    </div>
  );
}
