
'use strict';

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

// Arrow up버튼을 아래로 스크롤시 투명하게 처리함
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.style.opacity = 1;
  } else {
    arrowUp.style.opacity = 0;
  }
});

// Navbar 토글버튼 클릭 처리
const navbarMenu = document.querySelector('.header__menu');
const navbarToggle = document.querySelector('.header__toggle');
navbarToggle.addEventListener( 'click', () => {
  navbarMenu.classList.toggle('open');
})

// Navbar 메뉴 클릭시 메뉴를 자동으로 닫아줌
navbarMenu.addEventListener('click', () => {
  navbarMenu.classList.remove('open');
});

// Typing Effect는 typing-effect.js로 분리됨