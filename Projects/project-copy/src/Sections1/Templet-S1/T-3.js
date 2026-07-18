import React, { useEffect } from 'react';

const T3 = () => {
  const contents = [
    { img: 'https://picsum.photos/200/300?random=1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { img: 'https://picsum.photos/200/300?random=2', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { img: 'https://picsum.photos/200/300?random=3', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    { img: 'https://picsum.photos/200/300?random=4', text: 'Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.' },
    { img: 'https://picsum.photos/200/300?random=5', text: 'In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    });

    const rows = document.querySelectorAll('.row');
    rows.forEach(row => observer.observe(row));

    return () => {
      rows.forEach(row => observer.unobserve(row));
    };
  }, []);

  return (
    <div className="first">
      <style>
        {`
          .first {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .row {
            display: flex;
            height: 350px;
            gap: 16px;
            overflow: hidden;
            opacity: 0;
            transform: translateY(100px) scale(0.8);
            transition: opacity 0.4s ease-out, transform 0.4s ease-out;
          }
          .row.animate {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          .columnImg {
            width: 35%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .columnTxt {
            width: 65%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .column img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
          }
          .column p {
            font-size: 16px;
            color: #333;
          }
        `}
      </style>
      {contents.map((content, index) => (
        <div className="row" key={index}>
          {index % 2 === 0 ? (
            <>
              <div className="columnImg">
                <img src={content.img} alt={`Placeholder ${index + 1}`} />
              </div>
              <div className="columnTxt">
                <p>{content.text}</p>
              </div>
            </>
          ) : (
            <>
              <div className="columnTxt">
                <p>{content.text}</p>
              </div>
              <div className="columnImg">
                <img src={content.img} alt={`Placeholder ${index + 1}`} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default T3;