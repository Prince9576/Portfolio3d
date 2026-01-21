import { useEffect, useState } from 'react';
import { colors } from '../theme';

const Loader = ({ progress = 0, isLoading = false, isMobileView = false }) => {
  const [visible, setVisible] = useState(isLoading);
  const [exiting, setExiting] = useState(false);
  const fadeMs = 600;

  useEffect(() => {
    let t;
    if (isLoading) {
      setVisible(true);
      setExiting(false);
    } else if (visible) {
      setExiting(true);
      t = setTimeout(() => {
        setVisible(false);
        setExiting(false);
      }, fadeMs);
    }
    return () => clearTimeout(t);
  }, [isLoading, visible]);

  if (!visible) return null;

  const pct = Math.round(Math.min(Math.max(progress, 0), 100));

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1a0933 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: isLoading ? 'auto' : 'none',
        opacity: exiting ? 0 : 1,
        transition: `opacity ${fadeMs}ms ease`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          padding: '12px',
          width: isMobileView ? '85%' : '50%',
          maxWidth: '900px',
          boxSizing: 'border-box',
          position: 'relative',
          transform: 'translateY(2rem)',
        }}
      >
        <img
          src='/images/doodle_loader.png'
          alt='loader doodle'
          style={{
            width: isMobileView ? 100 : 180,
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            position: 'absolute',
            bottom: 0,
            transform: isMobileView ? 'translateY(-21px)' : 'translateY(-16px)',
          }}
        />

        <div className='loader-progress-container' style={{ width: '100%' }}>
          <div className='loader-progress-track'>
            <div
              className='loader-progress-fill'
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${colors.accent[500]} 0%, ${colors.accent[600]} 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
