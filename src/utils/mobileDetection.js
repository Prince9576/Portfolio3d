// Mobile detection utility
export const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth < 1028;
};

// Mobile breakpoint constant
export const MOBILE_BREAKPOINT = 1024;
