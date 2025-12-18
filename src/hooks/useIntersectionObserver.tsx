import { useEffect, useState, type RefObject } from 'react';

export function useIntersectionObserver(
  ref: RefObject<HTMLDivElement | null>,
  options?: IntersectionObserverInit & { once?: boolean },
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (options?.once && isVisible) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options?.once) {
          observer.disconnect();
        }
      } else if (!options?.once) {
        setIsVisible(false);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options, isVisible]);

  return isVisible;
}
