const items = [
  `import React, { useState, useEffect } from 'react';
  
  const T1 = () => {
    const contents = [
      { text: "DONE FOR 1", img: 'https://picsum.photos/700/500?random=1' },
      { text: "Done For 2", img: 'https://picsum.photos/700/500?random=2' },
      { text: "Done For 3", img: 'https://picsum.photos/700/500?random=3' }
    ];
  //Remember to remove the '/' put between the '$' and '{' in the following lines
    const [currentIndex, setCurrentIndex] = useState(0);
     
    useEffect(() => {
      const interval = setInterval(() => {
       
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
         
        }, 500); // Duration of the fade-out transition
      }, 2500);
  
      return () => clearInterval(interval);
    }, [contents.length]);
  
    const handleNavClick = (index) => {
     
      setTimeout(() => {
        setCurrentIndex(index);
       
      }, 500); // Duration of the fade-out transition
    };
  
    return (
      <div>
        <style>
          {'
            .ImgCase1 {
              display: flex;
              justify-content: center;
              width: 100%;
              height: 30vw;
              overflow: hidden;
              position: relative;
            }
            .MainImg {
            display: flex;
              position: absolute;
              margin-top: 15px;
              width: 90%;
              height: 90%;
              opacity: 0;
              border: 2px solid black;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            
            }
            .MainImg.active {
             
              animation: fadeIn 0.5s ease-in-out forwards;
  
            }
            .MainImg.exit {
              
              animation: fadeOut 0.5s ease-in-out forwards;
            }
  
        @keyframes fadeIn {
              0% {
                opacity: 0;
                transform: translateX(100%);
              }
              100% {
                opacity: 1;
                transform: translateX(0%);
              }
            }
            @keyframes fadeOut {
              0% {
                opacity: 1;
                transform: translateX(0%);
              }
              100% {
                opacity: 0;
                transform: translateX(-100%);
              }
            }
            .TextBox {
              display: flex;
              margin: 15px;
              color: white;
              font-size: 3vw;
              font-weight: bold;
              align-items: center;
              text-shadow: 2px 2px 2px black;
             
            }
            .NavC {
              position: absolute;
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
              border: 2px solid black;
              cursor: pointer;
              transition: transform 0.3s ease;
            }
            .NavC1 {
              left: 45%;
              top: 85%;
              transform: $/{currentIndex === 0 ? 'scale(1.4)' : 'scale(1)'};
            }
            .NavC2 {
              left: 50%;
              top: 85%;
              transform: $/{currentIndex === 1 ? 'scale(1.4)' : 'scale(1)'};
            }
            .NavC3 {
              left: 55%;
              top: 85%;
              transform: $/{currentIndex === 2 ? 'scale(1.4)' : 'scale(1)'};
            }
          '}
        </style>
        <div className="ImgCase1">
          {contents.map((content, index) => (
            <div
              key={index}
              className={'MainImg $/{currentIndex === index ? "active" : "exit"}'}
              style={{ backgroundImage: 'url($/{content.img})'}}
            >
              <div className="TextBox">{content.text}</div>
            </div>
          ))}
          <div className='NavC NavC1' onClick={() => handleNavClick(0)}></div>
          <div className='NavC NavC2' onClick={() => handleNavClick(1)}></div>
          <div className='NavC NavC3' onClick={() => handleNavClick(2)}></div>
        </div>
      </div>
    );
  };
  
  export default T1;`,
`import React from 'react';

const T2 = () => {
  const contents = [
    { img: 'https://picsum.photos/300/500?random=2' },
    { img: 'https://picsum.photos/300/400?random=1' },
    { img: 'https://picsum.photos/300/600?random=3' },
    { img: 'https://picsum.photos/300/800?random=5' },
    { img: 'https://picsum.photos/300/700?random=4' },
    { img: 'https://picsum.photos/300/700?random=4' },
    { img: 'https://picsum.photos/300/800?random=5' },
    { img: 'https://picsum.photos/300/500?random=2' },
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
        {'
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
        '}
      </style>
      {contents.map((content, index) => (
        <div className="pinterest-item" key={index}>
          <img src={content.img} alt={'Placeholder \${index + 1}'} />
        </div>
      ))}
    </div>
  );
};

export default T2;`,
`import React, { useEffect } from 'react';

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
        {'
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
        '}
      </style>
      {contents.map((content, index) => (
        <div className="row" key={index}>
          {index % 2 === 0 ? (
            <>
              <div className="columnImg">
                <img src={content.img} alt={'Placeholder \${index + 1}'} />
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
                <img src={content.img} alt={'Placeholder \${index + 1}'} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default T3;` 
];

export default items;