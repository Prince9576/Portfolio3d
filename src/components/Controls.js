import React, { useState, useEffect } from 'react';
import { isMobile } from '../utils/mobileDetection';
import { useLoading } from '../contexts/LoadingContext';

const Controls = ({ onMove, onJump }) => {
  const [activeButtons, setActiveButtons] = useState({
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
  });
  const mobile = isMobile();
  const { isLoading } = useLoading();

  useEffect(() => {
    if (mobile) {
      const disableContextMenu = (e) => e.preventDefault();
      document.addEventListener('contextmenu', disableContextMenu);

      return () => {
        document.removeEventListener('contextmenu', disableContextMenu);
      };
    }
  }, [mobile]);

  useEffect(() => {
    if (!mobile) return;

    // Send movement data based on active buttons
    const direction = { x: 0, y: 0 };

    if (activeButtons.left) direction.x -= 1;
    if (activeButtons.right) direction.x += 1;
    if (activeButtons.up) direction.y += 1;
    if (activeButtons.down) direction.y -= 1;

    onMove(direction);
  }, [activeButtons, mobile, onMove]);

  const handleButtonPress = (button) => {
    setActiveButtons((prev) => ({ ...prev, [button]: true }));
  };

  const handleButtonRelease = (button) => {
    setActiveButtons((prev) => ({ ...prev, [button]: false }));
  };

  const handleJumpPress = () => {
    setActiveButtons((prev) => ({ ...prev, jump: true }));
    onJump();
  };

  const handleJumpRelease = () => {
    setActiveButtons((prev) => ({ ...prev, jump: false }));
  };

  // Prevent context menu on long press
  const preventContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  if (!mobile || isLoading) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 p-4'>
      <div className='flex justify-between items-center max-w-md mx-auto gap-2'>
        {/* Left Arrow */}
        <button
          className={`flex-1 aspect-square rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-150 ${
            activeButtons.left ? 'bg-white/20 border-white/50 scale-95' : ''
          }`}
          onTouchStart={(e) => {
            e.preventDefault();
            handleButtonPress('left');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleButtonRelease('left');
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleButtonPress('left');
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            handleButtonRelease('left');
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            handleButtonRelease('left');
          }}
          onContextMenu={preventContextMenu}
          style={{ touchAction: 'none', userSelect: 'none' }}
        >
          <img
            src='/images/arrow_left.svg'
            alt='Left'
            className='w-6 h-6 filter brightness-0 invert'
          />
        </button>

        {/* Up Arrow */}
        <button
          className={`flex-1 aspect-square rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-150 ${
            activeButtons.up ? 'bg-white/20 border-white/50 scale-95' : ''
          }`}
          onTouchStart={(e) => {
            e.preventDefault();
            handleButtonPress('up');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleButtonRelease('up');
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleButtonPress('up');
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            handleButtonRelease('up');
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            handleButtonRelease('up');
          }}
          onContextMenu={preventContextMenu}
          style={{ touchAction: 'none', userSelect: 'none' }}
        >
          <img src='/images/arrow_up.svg' alt='Up' className='w-6 h-6 filter brightness-0 invert' />
        </button>

        {/* Jump Button */}
        <button
          className={`flex-1 aspect-square rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-150 ${
            activeButtons.jump ? 'bg-white/20 border-white/50 scale-95' : ''
          }`}
          onTouchStart={(e) => {
            e.preventDefault();
            handleJumpPress();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleJumpRelease();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleJumpPress();
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            handleJumpRelease();
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            handleJumpRelease();
          }}
          onContextMenu={preventContextMenu}
          style={{ touchAction: 'none', userSelect: 'none' }}
        >
          <img
            src='/images/arrow_jump.svg'
            alt='Jump'
            className='filter brightness-0 invert'
            style={{
              height: '3rem',
              width: '2rem',
              marginTop: '0.25rem',
            }}
          />
        </button>

        {/* Down Arrow */}
        <button
          className={`flex-1 aspect-square rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-150 ${
            activeButtons.down ? 'bg-white/20 border-white/50 scale-95' : ''
          }`}
          onTouchStart={(e) => {
            e.preventDefault();
            handleButtonPress('down');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleButtonRelease('down');
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleButtonPress('down');
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            handleButtonRelease('down');
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            handleButtonRelease('down');
          }}
          onContextMenu={preventContextMenu}
          style={{ touchAction: 'none', userSelect: 'none' }}
        >
          <img
            src='/images/arrow_down.svg'
            alt='Down'
            className='w-6 h-6 filter brightness-0 invert'
          />
        </button>

        {/* Right Arrow */}
        <button
          className={`flex-1 aspect-square rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-150 ${
            activeButtons.right ? 'bg-white/20 border-white/50 scale-95' : ''
          }`}
          onTouchStart={(e) => {
            e.preventDefault();
            handleButtonPress('right');
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleButtonRelease('right');
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleButtonPress('right');
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            handleButtonRelease('right');
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            handleButtonRelease('right');
          }}
          onContextMenu={preventContextMenu}
          style={{ touchAction: 'none', userSelect: 'none' }}
        >
          <img
            src='/images/arrow_right.svg'
            alt='Right'
            className='w-6 h-6 filter brightness-0 invert'
          />
        </button>
      </div>
    </div>
  );
};

export default Controls;
