import React from 'react';

const T2 = () => {
  const contents = [
    { img: 'https://picsum.photos/300/300?random=2' },
    { img: 'https://picsum.photos/300/400?random=1' },
    { img: 'https://picsum.photos/300/600?random=3' },
    { img: 'https://picsum.photos/300/200?random=2' },
    { img: 'https://picsum.photos/300/800?random=5' },
    { img: 'https://picsum.photos/300/700?random=4' },
    { img: 'https://picsum.photos/300/800?random=5' },
    { img: 'https://picsum.photos/300/700?random=4' },
    { img: 'https://picsum.photos/300/900?random=6' },
    { img: 'https://picsum.photos/300/400?random=1' },
    { img: 'https://picsum.photos/300/900?random=6' },
    { img: 'https://picsum.photos/300/600?random=3' },
    { img: 'https://picsum.photos/300/700?random=4' },
    { img: 'https://picsum.photos/300/800?random=5' },
    { img: 'https://picsum.photos/300/500?random=2' },
    { img: 'https://picsum.photos/300/900?random=6' },
    { img: 'https://picsum.photos/300/500?random=2' },
    { img: 'https://picsum.photos/300/900?random=6' },
    { img: 'https://picsum.photos/300/400?random=1' },
    { img: 'https://picsum.photos/300/900?random=6' }
    
  ];

  return (
    <div className="pinterest-layout">
      <style>
        {`
          .pinterest-layout {
            column-width: 200px;
            column-gap: 16px;
            padding: 16px;
          }
          .pinterest-item {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 16px;
            transition: transform 0.3s;
            display: inline-block;
            width: 100%;
          }
          .pinterest-item:hover {
            transform: translateY(-8px);
          }
          .pinterest-item img {
            width: 100%;
            display: block;
          }
          @media screen and (max-width: 768px) {
            .pinterest-layout {
              column-width: 150px; /* Ensure at least 2 columns on small screens */
            }
          }
        `}
      </style>
      {contents.map((content, index) => (
        <div className="pinterest-item" key={index}>
          <img src={content.img} alt={`Placeholder ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default T2;