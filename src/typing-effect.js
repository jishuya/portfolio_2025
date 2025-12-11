'use strict';

/**
 * Custom Typing Effect with cursor movement and partial replacement
 *
 * Features:
 * - Character-by-character cursor movement
 * - Partial text replacement (cursor moves to position, deletes range, types new text)
 * - HTML tag preservation during all operations
 */

// Typing sequence configuration
const typingSequence = [
  { main: 'Hello!', sub: '' },
  { main: "Hello! I'm <strong class='home__title--strong'>Jisoo,</strong>", sub: '' },
  { main: "Hello! I'm <strong class='home__title--strong'>Jisoo,</strong>", sub: "<strong class='home__title--strong'>a front-end developer</strong>" },
  { main: "Hello! I'm <strong class='home__title--strong'>Jisoo,</strong>", sub: "<strong class='home__title--strong'>a full-stack developer</strong>", replaceRange: { from: 2, to: 11, newText: 'full-stack' } },
  { main: "Hello! I'm <strong class='home__title--strong'>Jisoo,</strong>", sub: "<strong class='home__title--strong'>a full-stack developer</strong><br>with 4 years of experience" },
];

// Settings
const typingSpeed = 100;
const deleteSpeed = 50;
const cursorMoveSpeed = 50;
const pauseBetweenSteps = 1000;
const loopDelay = 3000;

let currentStep = 0;
let isTyping = false;

// DOM elements
let mainElement, subElement, subAfterElement, mainCursor, subCursor;

/**
 * Extract plain text from HTML string
 */
function getPlainText(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

/**
 * Build HTML up to a specific character position (inclusive)
 * Preserves HTML tags properly
 */
function buildHtmlUpToChar(html, charIndex) {
  let result = '';
  let charCount = 0;
  let inTag = false;
  let tagBuffer = '';
  const openTags = [];

  for (let i = 0; i < html.length; i++) {
    const char = html[i];

    if (char === '<') {
      inTag = true;
      tagBuffer = '<';
      continue;
    }

    if (inTag) {
      tagBuffer += char;
      if (char === '>') {
        inTag = false;
        // Check if opening, closing, or self-closing tag
        if (tagBuffer.startsWith('</')) {
          openTags.pop();
        } else if (!tagBuffer.endsWith('/>') && !tagBuffer.startsWith('<br')) {
          const tagMatch = tagBuffer.match(/<(\w+)/);
          if (tagMatch) {
            openTags.push(tagMatch[1]);
          }
        }
        result += tagBuffer;
        tagBuffer = '';
      }
      continue;
    }

    if (charCount <= charIndex) {
      result += char;
      charCount++;
    } else {
      break;
    }
  }

  // Close any open tags
  for (let i = openTags.length - 1; i >= 0; i--) {
    result += `</${openTags[i]}>`;
  }

  return result;
}

/**
 * Build HTML after a specific character position
 * Preserves HTML tags properly
 */
function buildHtmlAfterChar(html, charIndex) {
  let result = '';
  let charCount = 0;
  let inTag = false;
  let tagBuffer = '';
  const openTags = [];
  let foundStart = false;

  // First pass: find all tags that should be open at charIndex
  for (let i = 0; i < html.length; i++) {
    const char = html[i];

    if (char === '<') {
      inTag = true;
      tagBuffer = '<';
      continue;
    }

    if (inTag) {
      tagBuffer += char;
      if (char === '>') {
        inTag = false;
        if (charCount <= charIndex) {
          if (tagBuffer.startsWith('</')) {
            openTags.pop();
          } else if (!tagBuffer.endsWith('/>') && !tagBuffer.startsWith('<br')) {
            const tagMatch = tagBuffer.match(/<(\w+)/);
            if (tagMatch) {
              openTags.push(tagMatch[1]);
            }
          }
        }
        tagBuffer = '';
      }
      continue;
    }

    charCount++;
  }

  // Add opening tags that should wrap the remaining content
  for (const tag of openTags) {
    result += `<${tag}>`;
  }

  // Second pass: get content after charIndex
  charCount = 0;
  inTag = false;
  let afterContent = '';

  for (let i = 0; i < html.length; i++) {
    const char = html[i];

    if (char === '<') {
      inTag = true;
      tagBuffer = '<';
      continue;
    }

    if (inTag) {
      tagBuffer += char;
      if (char === '>') {
        inTag = false;
        if (foundStart) {
          afterContent += tagBuffer;
        }
        tagBuffer = '';
      }
      continue;
    }

    if (charCount > charIndex) {
      if (!foundStart) {
        foundStart = true;
      }
      afterContent += char;
    }
    charCount++;
  }

  result += afterContent;
  return result;
}

/**
 * Insert text before closing tag in HTML string
 */
function insertTextBeforeClosingTag(html, textToInsert) {
  // Find the last closing tag position
  const closingTagMatch = html.match(/<\/\w+>$/);
  if (closingTagMatch) {
    const insertPos = html.lastIndexOf(closingTagMatch[0]);
    return html.slice(0, insertPos) + textToInsert + html.slice(insertPos);
  }
  return html + textToInsert;
}

/**
 * Type text character by character
 */
async function typeText(element, cursor, targetHtml, currentHtml = '') {
  const targetText = getPlainText(targetHtml);
  const currentText = getPlainText(currentHtml);

  cursor.style.display = 'inline';

  for (let i = currentText.length; i < targetText.length; i++) {
    element.innerHTML = buildHtmlUpToChar(targetHtml, i);
    await sleep(typingSpeed);
  }
}

/**
 * Delete text character by character
 */
async function deleteText(element, cursor, targetHtml, currentHtml) {
  const currentText = getPlainText(currentHtml);
  const targetText = getPlainText(targetHtml);

  cursor.style.display = 'inline';

  for (let i = currentText.length - 1; i >= targetText.length; i--) {
    element.innerHTML = buildHtmlUpToChar(currentHtml, i - 1);
    await sleep(deleteSpeed);
  }
}

/**
 * Move cursor from end to a specific position, then delete a range
 */
async function deleteTextRange(element, subAfter, cursor, currentHtml, fromChar, toChar) {
  const plainText = getPlainText(currentHtml);
  cursor.style.display = 'inline';

  // Move cursor from end to toChar position (character by character)
  for (let pos = plainText.length - 1; pos >= toChar; pos--) {
    element.innerHTML = buildHtmlUpToChar(currentHtml, pos);
    subAfter.innerHTML = buildHtmlAfterChar(currentHtml, pos);
    await sleep(cursorMoveSpeed);
  }

  // Delete characters from toChar back to fromChar
  for (let pos = toChar - 1; pos >= fromChar; pos--) {
    const beforeHtml = buildHtmlUpToChar(currentHtml, pos);
    const afterHtml = buildHtmlAfterChar(currentHtml, toChar);
    element.innerHTML = beforeHtml;
    subAfter.innerHTML = afterHtml;
    await sleep(deleteSpeed);
  }

  return {
    before: buildHtmlUpToChar(currentHtml, fromChar - 1),
    after: buildHtmlAfterChar(currentHtml, toChar)
  };
}

/**
 * Type text at a specific position (with text after cursor)
 */
async function typeTextRange(element, subAfter, cursor, beforeHtml, afterHtml, newText) {
  cursor.style.display = 'inline';

  for (let i = 0; i < newText.length; i++) {
    const textSoFar = newText.slice(0, i + 1);
    element.innerHTML = insertTextBeforeClosingTag(beforeHtml, textSoFar);
    await sleep(typingSpeed);
  }

  // Merge back into single element
  element.innerHTML = beforeHtml.replace(/<\/strong>$/, '') + newText + afterHtml.replace(/^<strong[^>]*>/, '');

  // Recalculate proper merged HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = beforeHtml;
  const beforeText = tempDiv.textContent;
  tempDiv.innerHTML = afterHtml;
  const afterText = tempDiv.textContent;

  // Build final merged HTML
  const fullText = beforeText + newText + afterText;
  const targetHtml = `<strong class='home__title--strong'>${fullText}</strong>`;
  element.innerHTML = targetHtml;
  subAfter.innerHTML = '';
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Process a single step in the sequence
 */
async function processStep(step, prevStep) {
  const { main, sub, replaceRange } = step;
  const prevMain = prevStep?.main || '';
  const prevSub = prevStep?.sub || '';

  // Handle main text changes
  if (main !== prevMain) {
    const mainText = getPlainText(main);
    const prevMainText = getPlainText(prevMain);

    if (mainText.length > prevMainText.length) {
      await typeText(mainElement, mainCursor, main, prevMain);
    } else if (mainText.length < prevMainText.length) {
      await deleteText(mainElement, mainCursor, main, prevMain);
    }
  }

  // Handle sub text changes
  if (sub !== prevSub) {
    if (replaceRange) {
      // Partial replacement with cursor movement
      const { from, to, newText } = replaceRange;
      const result = await deleteTextRange(subElement, subAfterElement, subCursor, prevSub, from, to);
      await typeTextRange(subElement, subAfterElement, subCursor, result.before, result.after, newText);
    } else {
      const subText = getPlainText(sub);
      const prevSubText = getPlainText(prevSub);

      if (subText.length > prevSubText.length) {
        // Check if it's appending to existing text
        if (sub.includes(prevSub.replace(/<\/strong>$/, '').replace(/<strong[^>]*>$/, ''))) {
          await typeText(subElement, subCursor, sub, prevSub);
        } else {
          await typeText(subElement, subCursor, sub, prevSub);
        }
      } else if (subText.length < prevSubText.length) {
        await deleteText(subElement, subCursor, sub, prevSub);
      }
    }
  }

  // Hide cursors when done
  mainCursor.style.display = 'none';
  subCursor.style.display = sub ? 'inline' : 'none';
}

/**
 * Run the full typing sequence
 */
async function runSequence() {
  if (isTyping) return;
  isTyping = true;

  // Forward sequence
  for (let i = 0; i < typingSequence.length; i++) {
    currentStep = i;
    const prevStep = i > 0 ? typingSequence[i - 1] : null;
    await processStep(typingSequence[i], prevStep);
    await sleep(pauseBetweenSteps);
  }

  // Wait before restarting
  await sleep(loopDelay);

  // Reset and restart
  mainElement.innerHTML = '';
  subElement.innerHTML = '';
  subAfterElement.innerHTML = '';
  isTyping = false;

  runSequence();
}

/**
 * Initialize typing effect
 */
function init() {
  mainElement = document.querySelector('.typing-text');
  subElement = document.querySelector('.typing-text-sub');
  subAfterElement = document.querySelector('.typing-text-sub-after');
  mainCursor = document.querySelector('.typing-cursor--main');
  subCursor = document.querySelector('.typing-cursor--sub');

  if (!mainElement || !subElement) {
    console.error('Typing effect elements not found');
    return;
  }

  // Create cursor elements if they don't exist
  if (!mainCursor) {
    mainCursor = document.createElement('span');
    mainCursor.className = 'typing-cursor typing-cursor--main';
    mainCursor.textContent = '|';
    mainElement.parentNode.insertBefore(mainCursor, mainElement.nextSibling);
  }

  if (!subCursor) {
    subCursor = document.createElement('span');
    subCursor.className = 'typing-cursor typing-cursor--sub';
    subCursor.textContent = '|';
    subCursor.style.display = 'none';
    if (subAfterElement) {
      subAfterElement.parentNode.insertBefore(subCursor, subAfterElement);
    } else {
      subElement.parentNode.insertBefore(subCursor, subElement.nextSibling);
    }
  }

  // Create sub-after element if it doesn't exist
  if (!subAfterElement) {
    subAfterElement = document.createElement('span');
    subAfterElement.className = 'typing-text-sub-after';
    subCursor.parentNode.insertBefore(subAfterElement, subCursor.nextSibling);
  }

  runSequence();
}

// Start on DOM load
document.addEventListener('DOMContentLoaded', init);
