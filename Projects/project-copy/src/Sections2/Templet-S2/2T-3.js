import React, { useEffect, useRef, useMemo } from 'react';

const T3 = () => {
  const canvasRef = useRef(null);
  const colors = useMemo(() => ['#ff6b6b', '#f06595', '#cc5de8', '#845ef7', '#5c7cfa', '#339af0', '#22b8cf', '#20c997', '#51cf66', '#94d82d', '#fcc419', '#ff922b'], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx2d = canvas.getContext('2d');
    const trail = [];
    const trailLength = 500;

    const drawTrail = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      ctx2d.lineWidth = 3;
      ctx2d.lineCap = 'round';
      ctx2d.lineJoin = 'round';

      trail.forEach((point, index) => {
        
        const colorIndex = (index + Math.floor(Date.now() / 100)) % colors.length;
        ctx2d.strokeStyle = `rgb(${parseInt(colors[colorIndex].slice(1, 3), 16)}, ${parseInt(colors[colorIndex].slice(3, 5), 16)}, ${parseInt(colors[colorIndex].slice(5, 7), 16)}`;
        ctx2d.beginPath();
        if (index === 0) {
          ctx2d.moveTo(point.x, point.y);
        } else {
          ctx2d.moveTo(trail[index - 1].x, trail[index - 1].y);
        }
        ctx2d.lineTo(point.x, point.y);
        ctx2d.stroke();
      });
    };

    const updateTrail = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      trail.push({ x, y });
      if (trail.length > trailLength) {
        trail.shift();
      }
      drawTrail();
    };

    const fadeTrail = () => {
      if (trail.length > 0) {
        trail.shift();
        drawTrail();
      }
      setTimeout(fadeTrail, 20); // Adjust the timeout for smoother fading
    };

    const handleMouseLeave = () => {
      trail.length = 0;
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener('mousemove', updateTrail);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    fadeTrail();

    return () => {
      canvas.removeEventListener('mousemove', updateTrail);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [colors]);

  return (
    <div className="clean3" style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
};

export default T3;
