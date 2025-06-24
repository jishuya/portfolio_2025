
// "Change the header from transparent to dark on scroll."
const header = document.querySelector('.header');
const hearderHeight = header.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if (window.scrollY > hearderHeight) {
        header.classList.add('header--dark');
    } else {
        header.classList.remove('header--dark');
    } 
} )