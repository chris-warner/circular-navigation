import React, { useState, useEffect } from 'react';

function Navigator({ labelData }) {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [showLabels, setShowLabels] = useState(false);
  const [labelPositions, setLabelPositions] = useState([]);

  const generateLabelPositions = (x, y) => {
    const numLabels = labelData.length;
    const radius = 100; // Radius of the circular menu

    const labels = labelData.map((label, index) => {
      const angle = (Math.PI * 2 * index) / numLabels;
      const labelX = x + radius * Math.cos(angle);
      const labelY = y + radius * Math.sin(angle);

      return { x: labelX, y: labelY, label, hover: false };
    });

    return labels;
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setMousePosition({ x: mouseX, y: mouseY });
    const labels = generateLabelPositions(mouseX, mouseY);
    setLabelPositions(labels);
    setShowLabels(true);
  };
  const handleMouseUp = (e) => {
	const clickRange = 40; // Adjust this value for a larger label range
	const clickedLabel = labelPositions.find((label) => {
	  const withinXRange = e.clientX >= label.x - clickRange && e.clientX <= label.x + clickRange;
	  const withinYRange = e.clientY >= label.y - clickRange && e.clientY <= label.y + clickRange;
	  return withinXRange && withinYRange;
	});
  
	if (clickedLabel) {
	  window.open(clickedLabel.label.url, '_blank'); // Open the URL in a new tab
	}
  
	setShowLabels(false);
  };

  const handleLabelHover = (index, isHovering) => {
    setLabelPositions((prevLabels) =>
      prevLabels.map((label, i) => (i === index ? { ...label, hover: isHovering } : label))
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [showLabels]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          opacity: showLabels ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {labelPositions.map((label, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: label.y - 20,
              left: label.x - 20,
              padding: '5px',
              background: 'white',
              border: `1px solid ${label.hover ? 'turquoise' : 'black'}`,
              borderRadius: '5px',
              pointerEvents: 'auto',
              transition: 'border-color 0.2s ease',
              opacity: label.hover ? 1 : 0.8,
              cursor: 'pointer',
            }}
            onMouseEnter={() => handleLabelHover(index, true)}
            onMouseLeave={() => handleLabelHover(index, false)}
          >
            {label.label.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navigator;
