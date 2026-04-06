// content.js - ETERNAL BYPASS v2.6 (INNER BUTTON TARGET + SUPER STRONG CLICK)
const MAIN_WARNING = "The following content may contain suicide or self-harm topics.";
const SUBTEXT = "Viewer discretion is advised.";
const EXACT_BUTTON_TEXT = "I understand and wish to proceed";

let bypassCompleted = false;
let observer = null;

// ===================================================================
// SHADOW DOM PIERCING
// ===================================================================
function querySelectorDeep(selector) {
    const results = [];
    const walk = (root) => {
        if (!root) return;
        root.querySelectorAll(selector).forEach(el => results.push(el));
        root.querySelectorAll('*').forEach(el => {
            if (el.shadowRoot) walk(el.shadowRoot);
        });
    };
    walk(document.documentElement);
    if (document.querySelector(selector)) results.push(...document.querySelectorAll(selector));
    return [...new Set(results)];
}

// ===================================================================
// DETECTION
// ===================================================================
function warningIsPresent() {
    if (bypassCompleted) return false;
    return document.body.innerText.includes(MAIN_WARNING) && document.body.innerText.includes(SUBTEXT);
}

// ===================================================================
// BYPASS v2.6 — finds inner button + ultra-realistic click
// ===================================================================
function triggerBypass() {
    if (bypassCompleted) return;

    console.log('[Eternal Bypass v2.6] === WARNING DETECTED === Looking for exact button');

    const candidates = querySelectorDeep('button, yt-button-shape, [role="button"]');
    let target = null;

    for (const el of candidates) {
        const text = (el.textContent || '').trim();
        if (text === EXACT_BUTTON_TEXT) {
            target = el;
            console.log('[Eternal Bypass v2.6] ✅ Found exact button');
            break;
        }
    }

    if (target) {
        // If it's a yt-button-shape wrapper, click the real inner <button>
        if (target.tagName === 'YT-BUTTON-SHAPE') {
            const innerBtn = target.querySelector('button');
            if (innerBtn) {
                target = innerBtn;
                console.log('[Eternal Bypass v2.6] → Using inner <button> inside yt-button-shape');
            }
        }

        console.log('[Eternal Bypass v2.6] SUCCESS — firing super-strong click');
        simulateUltraRealClick(target);
        completeBypass();
        return true;
    }

    console.warn('[Eternal Bypass v2.6] Button not found — fallback play');
    const video = document.querySelector('video');
    if (video) {
        video.play().catch(() => {});
        completeBypass();
    }
}

function completeBypass() {
    bypassCompleted = true;
    console.log('[Eternal Bypass v2.6] 🔥 BYPASS COMPLETE — monitoring stopped forever');

    setTimeout(() => {
        const video = document.querySelector('video');
        if (video) video.play().catch(() => {});
    }, 300);

    if (observer) observer.disconnect();
}

function simulateUltraRealClick(element) {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const events = ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'click', 'focus'];
    events.forEach(type => {
        const evt = new PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            detail: 1,
            clientX: centerX,
            clientY: centerY,
            pointerId: 1,
            isPrimary: true,
            button: 0
        });
        element.dispatchEvent(evt);
    });

    // Extra native methods that sometimes help web components
    element.click();
    if (typeof element.focus === 'function') element.focus();
}

function startEternalBypass() {
    console.log('[Eternal Bypass v2.6] LOADED — ready for YouTube Music (April 2026 edition)');

    observer = new MutationObserver(() => {
        if (warningIsPresent()) triggerBypass();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

    [50, 180, 450, 850, 1400].forEach(delay => {
        setTimeout(() => { if (warningIsPresent()) triggerBypass(); }, delay);
    });

    console.log('[Eternal Bypass v2.6] All layers active');
}

startEternalBypass();