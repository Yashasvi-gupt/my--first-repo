import React, { useEffect } from 'react';

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
          div.style.left = `${event.clientX - cleanDivRect.left}px`;
          div.style.top = `${event.clientY - cleanDivRect.top}px`;
          div.style.opacity = 1;
          div.style.display = 'block';
          div.style.transform = `rotate(${index * 18}deg)`;
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
        {`
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
        `}
      </style>
    </div>
  );
};

export default T2;