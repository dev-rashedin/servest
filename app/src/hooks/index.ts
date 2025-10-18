import { useEffect, useState } from 'react';

export function useScreenSize() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: width < 750,
    isLargeScreen: width >= 1024,
  };
}
