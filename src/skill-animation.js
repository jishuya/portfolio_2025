'use strict';

/**
 * Skill Progress Bar Animation
 *
 * 스크롤해서 Skills 섹션이 화면에 보일 때
 * 프로그레스 바가 0%에서 목표치까지 채워지고
 * 숫자도 0에서 카운트업되는 효과
 *
 * [핵심 기술] Intersection Observer API
 * - 스크롤 이벤트보다 성능이 좋음
 * - 요소가 뷰포트에 들어왔는지 감지
 */

const skillsSection = document.querySelector('#skills');
const bars = document.querySelectorAll('.bar__value');
const percentTexts = document.querySelectorAll('.bar__percent');

let hasAnimated = false;

/**
 * 숫자 카운트업 애니메이션
 * @param {HTMLElement} element - 숫자를 표시할 요소
 * @param {number} target - 목표 숫자
 * @param {number} duration - 애니메이션 시간 (ms)
 */
function animateCount(element, target, duration = 1000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOut 효과
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);

    element.textContent = `${current}%`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * 프로그레스 바 애니메이션 실행
 */
function animateSkillBars() {
  if (hasAnimated) return;
  hasAnimated = true;

  bars.forEach((bar, index) => {
    const percent = bar.dataset.percent;
    const percentText = percentTexts[index];

    // 순차적으로 애니메이션 시작 (stagger 효과)
    setTimeout(() => {
      // 바 채우기
      bar.style.width = `${percent}%`;

      // 숫자 카운트업
      animateCount(percentText, parseInt(percent), 1000);
    }, index * 100); // 각 바마다 100ms 딜레이
  });
}

/**
 * 프로그레스 바 초기화 (섹션 벗어날 때)
 */
function resetSkillBars() {
  bars.forEach((bar, index) => {
    bar.style.width = '0';
    percentTexts[index].textContent = '0%';
  });
  hasAnimated = false;
}

/**
 * 섹션 진입/이탈 감지 Observer
 */
const visibilityObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 섹션에 진입하면 애니메이션 실행
        animateSkillBars();
      } else {
        // 섹션을 벗어나면 초기화
        resetSkillBars();
      }
    });
  },
  {
    threshold: 0.3,
  }
);

// Skills 섹션 관찰 시작
if (skillsSection) {
  visibilityObserver.observe(skillsSection);
}
