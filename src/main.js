
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

// Home 섹션을 아래로 스크롤시 글자 투명하게 처리함
const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;

document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
})