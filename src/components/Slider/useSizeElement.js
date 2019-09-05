import { useState, useRef, useLayoutEffect } from 'react';

const useSizeElement = () => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(elementRef.current.clientWidth);
  }, []);

  return { width, elementRef };
};

export default useSizeElement;