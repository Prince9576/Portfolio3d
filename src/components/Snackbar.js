import { useState, useEffect } from 'react';
import { colors } from '../theme';

const Snackbar = ({ message, type = 'success', isVisible, onClose, duration = 5000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => onClose(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!show) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: colors.semantic.success,
          icon: '✓',
          borderColor: colors.semantic.success,
        };
      case 'error':
        return {
          bg: colors.semantic.error,
          icon: '✕',
          borderColor: colors.semantic.error,
        };
      default:
        return {
          bg: colors.semantic.info,
          icon: 'ℹ',
          borderColor: colors.semantic.info,
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div
      className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up'
      style={{
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <div
        className='flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border'
        style={{
          backgroundColor: typeStyles.bg,
          borderColor: typeStyles.borderColor,
          color: colors.text.primary,
          minWidth: '280px',
          maxWidth: '90vw',
          boxShadow: `0 10px 25px ${typeStyles.bg}40, 0 4px 12px rgba(0,0,0,0.15)`,
        }}
      >
        <div
          className='flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold'
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: colors.text.primary,
          }}
        >
          {typeStyles.icon}
        </div>

        <div className='flex-1 text-sm font-medium'>{message}</div>

        <button
          onClick={() => {
            setShow(false);
            setTimeout(() => onClose(), 300);
          }}
          className='flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors'
          style={{ color: colors.text.primary }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
