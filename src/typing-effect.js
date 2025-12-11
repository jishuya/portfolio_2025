'use strict';

/**
 * Typing Effect Module
 *
 * [핵심 포인트 1] HTML 태그를 포함한 텍스트 처리
 * - 일반 텍스트만 타이핑하면 쉽지만, <strong>, <br> 같은 HTML 태그가 포함되면 복잡해짐
 * - 태그는 한 번에 추가하고, 실제 글자만 하나씩 타이핑해야 자연스러움
 * - buildHtmlUpToChar() 함수가 이 역할을 담당
 *
 * [핵심 포인트 2] 커서 위치 관리
 * - 여러 줄에서 타이핑할 때 커서가 현재 타이핑 중인 위치를 따라가야 함
 * - 메인/서브 텍스트 각각에 커서를 두고 display로 전환
 *
 * [핵심 포인트 3] 이어서 타이핑 vs 새로 타이핑
 * - "Hello" -> "Hello! I'm Jisoo" 처럼 이어질 때는 기존 텍스트 유지하고 뒤에만 추가
 * - startsWith()로 이전 텍스트가 현재 텍스트의 시작부분인지 확인
 * - startFrom 파라미터로 어디서부터 타이핑할지 지정
 *
 * [핵심 포인트 4] 비동기 처리 (async/await)
 * - 각 글자 타이핑 사이에 딜레이가 필요
 * - Promise와 setTimeout을 조합한 sleep() 함수 사용
 * - async/await로 순차적 실행 보장
 */

// DOM Elements
const typingText = document.querySelector('.typing-text');
const typingTextSub = document.querySelector('.typing-text-sub');
const cursorMain = document.querySelector('.typing-cursor--main');
const cursorSub = document.querySelector('.typing-cursor--sub');

// 타이핑 시퀀스 정의
// deleteFirst: true면 이전 텍스트를 지우고 새로 타이핑
const typingSequence = [
  { main: 'Hello!', sub: '' },
  { main: "Hello! I'm <strong class='home__title--strong'>Jisoo,</strong>", sub: '' },
  { main: "Hello! I'm <strong class='home__title--strong'>Jisoo,</strong>", sub: "<strong class='home__title--strong'>a front-end developer</strong>" },
  { main: "Hello! I'm <strong class='home__title--strong'>Jisoo,</strong>", sub: "<strong class='home__title--strong'>a full-stack developer</strong>", deleteFirst: true },
  { main: "Hello! I'm <strong class='home__title--strong'>Jisoo,</strong>", sub: "<strong class='home__title--strong'>a full-stack developer</strong><br>with 4 years of experience" },
];

// 설정값
const typingSpeed = 50;        // 타이핑 속도 (ms)
const deleteSpeed = 30;        // 삭제 속도 (ms)
const pauseBetweenSteps = 1000; // 단계 사이 대기 시간
const pauseBeforeRestart = 3000; // 재시작 전 대기 시간

/**
 * [핵심 포인트 2] 커서 위치 전환
 * 타이핑 중인 요소로 커서를 이동
 */
function moveCursorTo(target) {
  if (target === 'main') {
    cursorMain.style.display = 'inline';
    cursorSub.style.display = 'none';
  } else {
    cursorMain.style.display = 'none';
    cursorSub.style.display = 'inline';
  }
}

/**
 * HTML 태그를 제거하고 순수 텍스트만 반환
 * 글자 수 계산에 사용
 */
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * [핵심 포인트 1] HTML 태그를 보존하면서 특정 글자 수까지만 반환
 *
 * 예: buildHtmlUpToChar("<strong>Hello</strong>", 3)
 *     -> "<strong>Hel</strong>"
 *
 * 동작 원리:
 * 1. 문자열을 순회하면서 '<' 를 만나면 태그로 인식
 * 2. 태그는 통째로 result에 추가 (글자 수에 포함 안 함)
 * 3. 일반 문자는 하나씩 추가하면서 카운트
 * 4. charLimit에 도달하면 중단
 * 5. 열린 태그가 있으면 닫아줌 (HTML 깨짐 방지)
 */
function buildHtmlUpToChar(html, charLimit) {
  let result = '';
  let charCount = 0;
  let i = 0;
  const openTags = []; // 열린 태그 스택

  while (i < html.length && charCount < charLimit) {
    if (html[i] === '<') {
      // 태그 발견 - 태그 전체를 추출
      const tagEnd = html.indexOf('>', i);
      const tag = html.substring(i, tagEnd + 1);

      if (tag.startsWith('</')) {
        // 닫는 태그: </strong>
        openTags.pop();
        result += tag;
      } else if (tag.endsWith('/>') || tag.startsWith('<br')) {
        // 자체 닫힘 태그: <br>, <img />
        result += tag;
      } else {
        // 여는 태그: <strong class='...'>
        const tagName = tag.match(/<(\w+)/)?.[1];
        if (tagName) openTags.push(tagName);
        result += tag;
      }
      i = tagEnd + 1;
    } else {
      // 일반 문자 - 카운트하면서 추가
      result += html[i];
      charCount++;
      i++;
    }
  }

  // 열린 태그 닫기 (HTML 유효성 유지)
  for (let j = openTags.length - 1; j >= 0; j--) {
    result += `</${openTags[j]}>`;
  }

  return result;
}

/**
 * [핵심 포인트 3, 4] 타이핑 효과
 * startFrom: 이 위치부터 타이핑 시작 (이어서 타이핑할 때 사용)
 */
async function typeText(element, html, startFrom = 0) {
  const plainText = stripHtml(html);

  for (let i = startFrom; i <= plainText.length; i++) {
    const displayHtml = buildHtmlUpToChar(html, i);
    element.innerHTML = displayHtml;
    await sleep(typingSpeed);
  }
  element.innerHTML = html;
}

/**
 * 삭제 효과 (타이핑의 역순)
 */
async function deleteText(element, keepChars = 0) {
  const currentHtml = element.innerHTML;
  const plainText = stripHtml(currentHtml);

  for (let i = plainText.length; i >= keepChars; i--) {
    const displayHtml = buildHtmlUpToChar(currentHtml, i);
    element.innerHTML = displayHtml;
    await sleep(deleteSpeed);
  }
}

/**
 * [핵심 포인트 4] Promise 기반 딜레이
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 메인 애니메이션 루프
 */
async function runTypingAnimation() {
  while (true) {
    for (let i = 0; i < typingSequence.length; i++) {
      const step = typingSequence[i];
      const prevStep = i > 0 ? typingSequence[i - 1] : { main: '', sub: '' };

      // 메인 텍스트 처리
      if (step.main !== prevStep.main) {
        moveCursorTo('main');
        const prevMainPlain = stripHtml(prevStep.main);
        const currentMainPlain = stripHtml(step.main);

        // [핵심 포인트 3] 이어서 타이핑 가능한지 확인
        if (currentMainPlain.startsWith(prevMainPlain)) {
          // 이전 텍스트로 시작하면 -> 이어서 타이핑
          await typeText(typingText, step.main, prevMainPlain.length);
        } else {
          // 다른 텍스트면 -> 지우고 새로 타이핑
          await deleteText(typingText);
          await typeText(typingText, step.main);
        }
      }

      // 서브 텍스트 처리
      if (step.sub !== prevStep.sub) {
        moveCursorTo('sub');

        if (step.deleteFirst && prevStep.sub) {
          await deleteText(typingTextSub);
        }

        const prevSubPlain = step.deleteFirst ? '' : stripHtml(prevStep.sub);
        const currentSubPlain = stripHtml(step.sub);

        if (!step.deleteFirst && currentSubPlain.startsWith(prevSubPlain)) {
          await typeText(typingTextSub, step.sub, prevSubPlain.length);
        } else {
          if (!step.deleteFirst && prevStep.sub) {
            await deleteText(typingTextSub);
          }
          await typeText(typingTextSub, step.sub);
        }
      }

      // 마지막 단계면 전체 삭제 후 재시작
      if (i === typingSequence.length - 1) {
        await sleep(pauseBeforeRestart);
        moveCursorTo('sub');
        await deleteText(typingTextSub);
        moveCursorTo('main');
        await deleteText(typingText);
        await sleep(500);
      } else {
        await sleep(pauseBetweenSteps);
      }
    }
  }
}

// 애니메이션 시작
runTypingAnimation();
