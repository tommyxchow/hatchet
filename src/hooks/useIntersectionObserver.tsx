import { useEffect, useState, type RefObject } from 'react';

export function useIntersectionObserver(
  ref: RefObject<HTMLDivElement | null>,
  options?: IntersectionObserverInit,
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}
