import React, { useState } from 'react';

export default function About() {
  const [isHovered, setIsHovered] = useState(false);

  const handleRedirect = (e) => {
    e.stopPropagation();
    window.open('https://yourportfolio2d.com', '_blank');
  };

  return (
    <div
      onClick={handleRedirect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: '100%',
        background: '#1e1e1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      <svg
        width='400'
        height='400'
        viewBox='0 0 24 24'
        fill='none'
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{
          filter: isHovered
            ? 'drop-shadow(0 0 30px rgba(123, 104, 238, 0.6)) drop-shadow(0 0 60px rgba(249, 115, 22, 0.4))'
            : 'drop-shadow(0 0 20px rgba(123, 104, 238, 0.5)) drop-shadow(0 0 40px rgba(249, 115, 22, 0.3))',
          transform: isHovered ? 'scale(1.05) rotate(15deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.3s ease',
        }}
      >
        <defs>
          <linearGradient id='iconGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#7B68EE' />
            <stop offset='100%' stopColor='#F97316' />
          </linearGradient>
        </defs>
        <path
          d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'
          stroke='url(#iconGradient)'
        />
        <polyline points='15 3 21 3 21 9' stroke='url(#iconGradient)' />
        <line x1='10' y1='14' x2='21' y2='3' stroke='url(#iconGradient)' />
      </svg>
    </div>
  );
}
