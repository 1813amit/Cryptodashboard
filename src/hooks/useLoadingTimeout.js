// src/hooks/useLoadingTimeout.js
import { useEffect, useState } from 'react';

export const useLoadingTimeout = (loading, timeout = 5000) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let timer;
    
    if (loading) {
      timer = setTimeout(() => {
        setShowFallback(true);
      }, timeout);
    } else {
      setShowFallback(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading, timeout]);

  return showFallback;
};