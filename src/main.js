
'use strict';

// DOM Elements
const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height;
const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
const arrowUp = document.querySelector('.arrow-up');

// 스크롤 이벤트 통합 (성능 최적화)
document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header: 스크롤 시 배경색 변경
    if (scrollY > headerHeight) {
        header.classList.add('header--dark');
    } else {
        header.classList.remove('header--dark');
    }

    // Home: 스크롤 시 투명하게 처리
    home.style.opacity = 1 - scrollY / homeHeight;

    // Arrow up: 스크롤 시 표시/숨김
    arrowUp.style.opacity = scrollY > homeHeight / 2 ? 1 : 0;
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