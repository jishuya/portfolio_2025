'use strict';

const sectionIds = ['#home', '#about', '#skills', '#work', '#contact'];
// section 태그
const sections = sectionIds.map((id) => document.querySelector(id));
// navigation 태그
const navItems = sectionIds.map((id) => document.querySelector(`[href="${id}"]`));
// sections 태그들의 관찰 상태
const visibleSections = sectionIds.map(() => false);
// 활성화된 navItem
let activeNavItem = navItems[0];

const options = {
    rootMargin: '-20% 0px 0px 0px',
    threshold: [0, 0.98]
};
const observer = new IntersectionObserver(observerCallback, options);
sections.forEach((section) => observer.observe(section));

function observerCallback(entries){
    let selectLastOne;
    entries.forEach((entry)=>{
        // 관찰되는 section의 index
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        // 'visibleSectins 배열의 관찰상태 업데이트'
        visibleSections[index] = entry.isIntersecting;
        selectLastOne =
            index === sectionIds.length - 1 &&
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.95;

        // navItem 찾기
        const navIndex = selectLastOne ? sectionIds.length - 1 
        : findFirstIntersecting(visibleSections);
        // console.log('navIndex: ', navIndex);

        selectNavItem(navIndex);
    });

    // visibleSections 중에서 첫번째로 true인 것의 index 반환
    function findFirstIntersecting(intersections) {
        // console.log('intersections: ', intersections); 
        const index = intersections.indexOf(true);
        return index >=0 ? index : 0
        
    }

    // 현재관찰 중인 section의 navIndx 스타일링
    function  selectNavItem(index) {
        const navItem = navItems[index];
        if (!navItem) return;
        activeNavItem.classList.remove('active');
        activeNavItem = navItem;
        activeNavItem.classList.add('active');
    }


}