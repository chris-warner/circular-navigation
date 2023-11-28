import { useState, useEffect } from 'react';

function Navigator() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <p>Mouse X: {mousePosition.x}</p>
      <p>Mouse Y: {mousePosition.y}</p>
    </div>
  );
}

export default Navigator;
