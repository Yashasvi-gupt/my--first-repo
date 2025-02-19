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
`<div>
<h1>highlighter</h1>
<p>This is for trial only</p>
</div>` 
];

export default items;