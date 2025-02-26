import React, { useEffect } from 'react';

const T1 = () => {
  useEffect(() => {
    const trail = [];
    const trailLength = 15;

    for (let i = 0; i < trailLength; i++) {
      const div = document.createElement('div');
      div.className = 'trail';
      document.querySelector('.clean').appendChild(div);
      trail.push(div);
    }

    const updateTrail = (event) => {
      const cleanDivRect = document.querySelector('.clean').getBoundingClientRect();
      trail.forEach((div, index) => {
        const delay = index * 5;
        setTimeout(() => {
          div.style.left = `${event.clientX - cleanDivRect.left}px`;
          div.style.top = `${event.clientY - cleanDivRect.top}px`;
          div.style.opacity = 1;
          div.style.display = 'block';
          div.className = 'trail';
        }, delay);
      });
    };

    const hideTrail = (event) => {
      const cleanDivRect = document.querySelector('.clean').getBoundingClientRect();
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

    const cleanDiv = document.querySelector('.clean');
    cleanDiv.addEventListener('mousemove', updateTrail);
    window.addEventListener('mousemove', hideTrail);

    return () => {
      cleanDiv.removeEventListener('mousemove', updateTrail);
      window.removeEventListener('mousemove', hideTrail);
      trail.forEach(div => cleanDiv.removeChild(div));
    };
  }, []);

  return (
    <div className="clean" style={{ position: 'relative', height: '100%' }}>
      <style>
        {`
          .trail {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            pointer-events: none;
            transition: transform 0.1s ease-out, opacity 0.3s ease-out;
            opacity: 1;
            display: block;
          }
          .trail2 {
            opacity: 0;
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default T1;