
const row = document.querySelector('.row');
const active = 'active'; 
const nonActive = 'non-active'; 
const card1 = document.querySelector('.Card1');
const card2 = document.querySelector('.Card2');
const card3 = document.querySelector('.Card3');
const card4 = document.querySelector('.Card4');
const info = document.querySelector('.info'); 
const skills = document.querySelector('.skills');
const education = document.querySelector('.education');
const project = document.querySelector('.project'); 
const Pop = document.querySelector('.Pro-p');
const Pop2 = document.querySelector('.Profile-header1');

function setActiveCard(activeCard) {
    const cards = [card1, card2, card3, card4];
    
    cards.forEach(card => {
        if (card === activeCard) {
            card.classList.add(active);
            card.classList.add('row');
        } else {
            card.classList.remove(active);
            card.classList.remove('row');
            card.classList.add(nonActive);
        }
    });
}

info.addEventListener('click', () => {setActiveCard(card1);
    Pop.style.animation = 'appear3 0.5s ease-out forwards, appear4 8s ease-out infinite';
    Pop.style.animationDelay = '0s, 0.5s';
    Pop2.classList.add('animat-a');
    Pop2.classList.remove('animat-b');

});

skills.addEventListener('click', () => {setActiveCard(card2);
    Pop.style.animation = 'appear3-2 0.5s ease-out forwards, appear4-2 1s ease-out forwards';
    Pop.style.animationDelay = '0s, 0.5s';
    Pop2.classList.add('animat-b');
    Pop2.classList.remove('animat-a');
});

education.addEventListener('click', () => {setActiveCard(card3);
    Pop.style.animation = 'appear3-2 0.5s ease-out forwards, appear4-2 1s ease-out forwards';
    Pop.style.animationDelay = '0s, 0.5s';
    Pop2.classList.add('animat-b');
    Pop2.classList.remove('animat-a');
});

project.addEventListener('click', () => {setActiveCard(card4);
    Pop.style.animation = 'appear3-2 0.5s ease-out forwards, appear4-2 1s ease-out forwards';
    Pop.style.animationDelay = '0s, 0.5s';
    Pop2.classList.add('animat-b');
    Pop2.classList.remove('animat-a');
});

const skillCardContainer = document.querySelector('.skillCard');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');


arrowLeft.addEventListener('click', () => {
    skillCardContainer.scrollBy({
        left: -skillCardContainer.offsetWidth,
        behavior: 'smooth'
    });
});

arrowRight.addEventListener('click', () => {
    skillCardContainer.scrollBy({
        left: skillCardContainer.offsetWidth,
        behavior: 'smooth'
    });
});






const gameContainer = document.querySelector('.game-container');


function createRandomBlock() {
    const block = document.createElement('div');
    block.classList.add('block');

    
    const randomX = Math.random() * 90;
    const randomY = Math.random() * -40;

    setTimeout(() => {
        block.style.transition = 'transform 1.5s ease-out';
        block.style.transform = `translate(${randomX}vw,${randomY}vw)`; 
    }, 500); 

    gameContainer.appendChild(block);

    block.addEventListener('mouseover', () => flyOff(block));
    card4.addEventListener('click', () => flyOff(block));
}

function flyOff(block) {
    const randomX = (Math.random() + 0.2) * 1000; 
    const randomY =  ((Math.random() + 0.2) * 1000)-800;
    
    block.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    
    setTimeout(() => {
        block.remove();
    }, 20000); 
}

function generateBlocks(numberOfBlocks) {
    for (let i = 0; i < numberOfBlocks; i++) {
        setTimeout(createRandomBlock, i * 300); 
    }
}

function checkCard4Active() {
    if (card4.classList.contains('active')) {
        generateBlocks(20); 
    }
}

const observer = new MutationObserver(checkCard4Active);
observer.observe(card4, { attributes: true, attributeFilter: ['class'] });