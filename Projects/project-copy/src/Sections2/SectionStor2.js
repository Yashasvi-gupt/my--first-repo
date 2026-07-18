const items = [
  `import React from 'react';

const T1 = () => {
  return (
    <div className="example">
      <style>
        {'
          .example {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
          }
          .example-box {
            width: 300px;
            height: 300px;
            background-color: #007bff;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        '}
      </style>
      <div className="example-box">
        Example Box
      </div>
    </div>
  );
};

export default T1;`,
  `import React, { useEffect } from 'react';

const T2 = () => {
  useEffect(() => {
    const trail = [];
    const trailLength = 80; // Increase the trail length for a longer tail

    for (let i = 0; i < trailLength; i++) {
      const div = document.createElement('div');
      div.className = 'trail-2';
      document.querySelector('.clean2').appendChild(div);
      trail.push(div);
    }

    const updateTrail = (event) => {
      const cleanDivRect = document.querySelector('.clean2').getBoundingClientRect();
      trail.forEach((div, index) => {
        const delay = index * 10;
        setTimeout(() => {
          div.style.left = \`\${event.clientX - cleanDivRect.left}px\`;
          div.style.top = \`\${event.clientY - cleanDivRect.top}px\`;
          div.style.opacity = 1;
          div.style.display = 'block';
          div.style.transform = \`rotate(\${index * 18}deg)\`;
          div.className = 'trail-2';
        }, delay);
      });
    };

    const hideTrail = (event) => {
      const cleanDivRect = document.querySelector('.clean2').getBoundingClientRect();
      if (
        event.clientX < cleanDivRect.left ||
        event.clientX > cleanDivRect.right ||
        event.clientY < cleanDivRect.top ||
        event.clientY > cleanDivRect.bottom
      ) {
        trail.forEach((div) => {
          div.className = 'trail2';
        });
      }
    };

    const cleanDiv = document.querySelector('.clean2');
    cleanDiv.addEventListener('mousemove', updateTrail);
    window.addEventListener('mousemove', hideTrail);

    return () => {
      cleanDiv.removeEventListener('mousemove', updateTrail);
      window.removeEventListener('mousemove', hideTrail);
      trail.forEach(div => cleanDiv.removeChild(div));
    };
  }, []);

  return (
    <div className="clean2" style={{ position: 'relative',overflow: 'hidden', height: '100%' }}>
      <style>
        {'
          .trail-2 {
            position: absolute;
            width: 2px;
            height: 20px;
            background: linear-gradient(45deg,rgb(236, 38, 38),rgb(210, 245, 14));
           
            animation: gradient 3s ease infinite;
            pointer-events: none;
            transition: transform 0.1s ease-out, opacity 0.3s ease-out;
            opacity: 1;
            display: block;
          }
          .trail2 {
            opacity: 0;
            display: none;
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        '}
      </style>
    </div>
  );
};

export default T2;`,
  `import React, { useEffect, useRef } from 'react';

const T3 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx2d = canvas.getContext('2d');
    const trail = [];
    const trailLength = 50;

    const drawTrail = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      ctx2d.lineWidth = 2;
      ctx2d.lineCap = 'round';
      ctx2d.lineJoin = 'round';

      trail.forEach((point, index) => {
        const opacity = 1 - index / trailLength;
        ctx2d.strokeStyle = \`rgba(0, 0, 0, \${opacity})\`;
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
  }, []);

  return (
    <div className="clean3" style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
};

export default T3;`
];

export default items;