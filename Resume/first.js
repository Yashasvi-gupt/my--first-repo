// Declare HTML classes as variables
const row = document.querySelector('.row');
const active = 'active'; // Class for the active (center) image
const nonActive = 'non-active'; // Class for non-active images
const card1 = document.querySelector('.Card1'); // Class for card1 element
const card2 = document.querySelector('.Card2'); // Class for card2 element
const card3 = document.querySelector('.Card3'); // Class for card3 element
const card4 = document.querySelector('.Card4'); // Class for card4 element
const info = document.querySelector('.info'); // Class for info element
const skills = document.querySelector('.skills'); // Class for skills element
const education = document.querySelector('.education'); // Class for education element
const project = document.querySelector('.project'); // Class for project element
const Pop = document.querySelector('.Pro-p');
const Pop2 = document.querySelector('.Profile-header1');


// Function to set active card and update others
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

// Event listener for info element
info.addEventListener('click', () => {setActiveCard(card1);
    Pop.style.animation = 'appear3 0.5s ease-out forwards, appear4 8s ease-out infinite';
    Pop.style.animationDelay = '0s, 0.5s';
    Pop2.classList.add('animat-a');
    Pop2.classList.remove('animat-b');

});

// Event listener for skills element
skills.addEventListener('click', () => {setActiveCard(card2);
    Pop.style.animation = 'appear3-2 0.5s ease-out forwards, appear4-2 1s ease-out forwards';
    Pop.style.animationDelay = '0s, 0.5s';
    Pop2.classList.add('animat-b');
    Pop2.classList.remove('animat-a');
});

// Event listener for education element
education.addEventListener('click', () => {setActiveCard(card3);
    Pop.style.animation = 'appear3-2 0.5s ease-out forwards, appear4-2 1s ease-out forwards';
    Pop.style.animationDelay = '0s, 0.5s';
    Pop2.classList.add('animat-b');
    Pop2.classList.remove('animat-a');
});




// Event listener for project element
project.addEventListener('click', () => {setActiveCard(card4);
    Pop.style.animation = 'appear3-2 0.5s ease-out forwards, appear4-2 1s ease-out forwards';
    Pop.style.animationDelay = '0s, 0.5s';
    Pop2.classList.add('animat-b');
    Pop2.classList.remove('animat-a');
});




// Get the skillCard container and the arrows
const skillCardContainer = document.querySelector('.skillCard');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
// Define the scroll amount (how much you want to scroll with each click)

// Event listener for the left arrow
arrowLeft.addEventListener('click', () => {
    skillCardContainer.scrollBy({
        left: -skillCardContainer.offsetWidth, // Scroll by full container width
        behavior: 'smooth' // Smooth scrolling
    });
});

// Event listener for the right arrow
arrowRight.addEventListener('click', () => {
    skillCardContainer.scrollBy({
        left: skillCardContainer.offsetWidth, // Scroll by full container width
        behavior: 'smooth' // Smooth scrolling
    });
});






const gameContainer = document.querySelector('.game-container');

// Function to generate random blocks
function createRandomBlock() {
    const block = document.createElement('div');
    block.classList.add('block');

    // Set random X position for landing
    const randomX = Math.random() * 90;
    const randomY = Math.random() * -40;

    setTimeout(() => {
        block.style.transition = 'transform 1.5s ease-out';
        block.style.transform = `translate(${randomX}vw,${randomY}vw)`; // Slide to final random X position
    }, 500); // Slight delay before starting the animation
    

    // Append the block to the game container
    gameContainer.appendChild(block);

    // Add event listener to fly off when clicked
    block.addEventListener('mouseover', () => flyOff(block));
    card4.addEventListener('click', () => flyOff(block));
}

// Function to make the block fly off in a random direction
function flyOff(block) {
    const randomX = (Math.random() + 0.2) * 1000; // Random X direction (-500 to +500)
    const randomY =  ((Math.random() + 0.2) * 1000)-800;; // Always fly upwards (negative Y direction)
    
    // Apply transform for flying off
    block.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Optional: Remove block after flying off
    setTimeout(() => {
        block.remove();
    }, 20000); // Wait for 2 seconds before removing
}

function generateBlocks(numberOfBlocks) {
    for (let i = 0; i < numberOfBlocks; i++) {
        setTimeout(createRandomBlock, i * 300); // Slight delay between each block creation
    }
}

function checkCard4Active() {
    if (card4.classList.contains('active')) {
        generateBlocks(20); // Generate blocks after card4 becomes active
    }
}

// Event listener for when card4 becomes active
const observer = new MutationObserver(checkCard4Active);
observer.observe(card4, { attributes: true, attributeFilter: ['class'] });