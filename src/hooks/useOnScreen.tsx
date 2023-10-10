import react, { useEffect, useRef, useState } from 'react';

export const useOnScreen = (option: any) => {
  const ref = useRef<HTMLDivElement>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (ref.current) {
        // if (entry.isIntersecting) {
        //   setVisible(entry.isIntersecting);
        //   observer.unobserve(ref.current);
        // }
      }
      setVisible(entry.isIntersecting);
    }, option);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  return [ref, visible];
};
