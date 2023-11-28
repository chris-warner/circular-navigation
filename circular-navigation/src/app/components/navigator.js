import { useState, useEffect } from 'react';

function Navigator() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [showLabels, setShowLabels] = useState(false);
  const [labelPositions, setLabelPositions] = useState([]);

  const generateLabelPositions = (x, y) => {
    const labels = [];
    const numLabels = 8; // Number of labels in the circular menu
    const radius = 100; // Radius of the circular menu

    for (let i = 0; i < numLabels; i++) {
      const angle = (Math.PI * 2 * i) / numLabels;
      const labelX = x + radius * Math.cos(angle);
      const labelY = y + radius * Math.sin(angle);

      labels.push({ x: labelX, y: labelY, hover: false });
    }

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
	if (showLabels) {
	  const clickedLabel = labelPositions.find((label) => {
		const withinXRange = e.clientX >= label.x - 20 && e.clientX <= label.x + 50; // Adjusting X range
		const withinYRange = e.clientY >= label.y - 20 && e.clientY <= label.y + 50;
		return withinXRange && withinYRange;
	  });
  
	  setShowLabels(false);
  
	  if (clickedLabel) {
		setTimeout(() => {
		  alert(`Right-click released over Label ${labelPositions.indexOf(clickedLabel) + 1}`);
		}, 100);
	  }
	}
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
  }, [showLabels, labelPositions]);

  return (
	<div style={{ position: 'relative', height: '100vh' }}>
	  <div
		style={{
		  position: 'fixed',
		  top: 0,
		  left: 0,
		  pointerEvents: 'none',
		  opacity: showLabels ? 1 : 0, // Set opacity based on showLabels state
		  transition: 'opacity 0.3s ease', // Apply transition to opacity changes
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
			  transition: 'border-color 0.3s ease',
			  opacity: label.hover ? 1 : 0.8, // Adjust opacity for hover effect
			}}
			onMouseEnter={() => handleLabelHover(index, true)}
			onMouseLeave={() => handleLabelHover(index, false)}
		  >
			Label {index + 1}
		  </div>
		))}
	  </div>
	</div>
  );
}

export default Navigator;
