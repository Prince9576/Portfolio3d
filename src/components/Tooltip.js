import { Html } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { colors } from '../theme';
import { isMobile } from '../utils/mobileDetection';

const Tooltip = ({
  children,
  text,
  position = [0, 0, 0],
  offset = [0, 1, 0],
  delay = 150,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef();
  const hideTimeoutRef = useRef();
  const mobile = isMobile();

  const handlePointerEnter = (e) => {
    e.stopPropagation();

    // Only handle hover on desktop
    if (mobile) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();

    // Only handle hover on desktop
    if (mobile) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const handleClick = (e) => {
    if (!mobile) return;

    e.stopPropagation();
    if (e.preventDefault) e.preventDefault();

    hideAllTooltips();
    setIsVisible(!isVisible);
  };

  const handlePointerDown = (e) => {
    if (!mobile) return;

    e.stopPropagation();
    if (e.preventDefault) e.preventDefault();

    hideAllTooltips();
    setIsVisible(!isVisible);
  };

  const hideAllTooltips = () => {
    window.dispatchEvent(new CustomEvent('hideAllTooltips'));
  };

  useEffect(() => {
    const handleHideAllTooltips = () => {
      setIsVisible(false);
    };

    if (mobile) {
      window.addEventListener('hideAllTooltips', handleHideAllTooltips);

      const handleClickOutside = (e) => {
        if (!e.target.closest('.tooltip-container')) {
          setIsVisible(false);
        }
      };

      const delayedClickOutside = (e) => {
        setTimeout(() => {
          handleClickOutside(e);
        }, 50);
      };

      document.addEventListener('click', delayedClickOutside);

      return () => {
        window.removeEventListener('hideAllTooltips', handleHideAllTooltips);
        document.removeEventListener('click', delayedClickOutside);
      };
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [mobile]);

  return (
    <group
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      position={position}
    >
      {children}

      {isVisible && (
        <Html
          position={offset}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            className={`tooltip-container ${className}`}
            style={{
              background: `linear-gradient(135deg, ${colors.background.dark}, ${colors.primary[900]})`,
              color: colors.text.primary,
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.8rem',
              fontWeight: '500',
              width: '18.75rem',
              maxWidth: '18.75rem',
              textAlign: 'center',
              boxShadow: `0 12px 40px rgba(91, 33, 182, 0.4), 0 8px 25px ${colors.shadow.dark}`,
              backdropFilter: 'blur(12px)',
              position: 'relative',
              animation: 'tooltipFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              lineHeight: '1.5',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              zIndex: 1000,
            }}
          >
            {text}
            <div
              style={{
                position: 'absolute',
                bottom: '-7px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: `8px solid ${colors.background.dark}`,
                filter: 'drop-shadow(0 3px 6px rgba(91, 33, 182, 0.3))',
              }}
            />
          </div>
        </Html>
      )}
    </group>
  );
};

export default Tooltip;
