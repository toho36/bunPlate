"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design using media queries
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    
    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      // Legacy browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);

  return matches;
}

// Predefined breakpoints for common use cases
export const useBreakpoint = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isLarge = useMediaQuery("(min-width: 1280px)");
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
  };
};