import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ scrollContainerRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // If running inside desktop phone container with internal scroll
    if (scrollContainerRef && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, scrollContainerRef]);

  return null;
}

