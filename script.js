// Words to type out
const titles = ["Python.", "Data Cleaning.", "Machine Learning.", "Problem Solving."];
const typingSpeed = 100; 
const erasingSpeed = 50; 
const delayBetweenTitles = 2000; 

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const textElement = document.getElementById("typing-text");
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        textElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeDelay = isDeleting ? erasingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentTitle.length) {
        typeDelay = delayBetweenTitles;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex++;
        if (titleIndex >= titles.length) {
            titleIndex = 0;
        }
    }

    setTimeout(typeEffect, typeDelay);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 500); 
});