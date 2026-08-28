/**
 * Persona title wrapping. CSS in themes/persona.css targets `.p5-title span`.
 * Call `applyThemeEnhancements(theme)` whenever `html[data-theme]` changes.
 */
export const PERSONA_TITLE_SELECTOR =
  '.intro h1, .page-header h1, .entry-header h1, .about-page h1, .home-section-header h2, .prose h2, .site-name';

const PUNCTUATION = [' ', ',', '，', '.', '。', '!', '！', '?', '？'];
const TILT_PATTERN = [-5, 2, -3, 4, -2, 5, -4, 2, -1, 4, -3, 3];

function titleOriginal(el) {
  return el.dataset.titleOriginal ?? el.textContent ?? '';
}

function invertIndex(content) {
  const selected = {};
  const candidates = [...content]
    .map((ch, idx) => ({ ch, idx }))
    .filter(({ ch, idx }) => idx > 0 && !PUNCTUATION.includes(ch));
  if (!candidates.length) return selected;

  let hash = 2166136261;
  for (const ch of content) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  const first = candidates[(hash >>> 0) % candidates.length].idx;
  selected[first] = true;

  const shouldAddSecond = candidates.length >= 10 || (candidates.length >= 6 && (hash >>> 5) % 4 === 0);
  if (shouldAddSecond && candidates.length > 1) {
    const start = (hash >>> 8) % candidates.length;
    for (let step = 0; step < candidates.length; step++) {
      const candidate = candidates[(start + step) % candidates.length].idx;
      if (Math.abs(candidate - first) >= 3) {
        selected[candidate] = true;
        break;
      }
    }
  }
  return selected;
}

export function wrapPersonaTitles(root = document) {
  root.querySelectorAll(PERSONA_TITLE_SELECTOR).forEach((el) => {
    if (el.dataset.p5Wrapped === '1') return;
    const original = titleOriginal(el);
    el.dataset.titleOriginal = original;
    const invert = invertIndex(original);
    el.replaceChildren();
    [...original].forEach((ch, idx) => {
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.setProperty('--r', `${TILT_PATTERN[idx % TILT_PATTERN.length]}deg`);
      if (ch === ' ') span.classList.add('is-space');
      else if (PUNCTUATION.includes(ch)) span.classList.add('is-punctuation');
      if (invert[idx]) span.classList.add('is-cut');
      el.appendChild(span);
    });
    el.classList.add('p5-title');
    el.dataset.p5Wrapped = '1';
  });
}

export function unwrapPersonaTitles(root = document) {
  root.querySelectorAll('[data-p5-wrapped="1"]').forEach((el) => {
    el.textContent = el.dataset.titleOriginal ?? '';
    el.classList.remove('p5-title');
    delete el.dataset.p5Wrapped;
  });
}

export function applyThemeEnhancements(theme, root = document) {
  unwrapPersonaTitles(root);
  if (theme === 'persona') wrapPersonaTitles(root);
}
