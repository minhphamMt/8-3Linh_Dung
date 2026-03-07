/* Core config, shared state, theme copy, navigation helpers */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const CONFIG = {
  themes: ["cosmic", "sakura"],
  storageTheme: "garden.theme.v1",
  storageMusic: "garden.music.v1",
  storageWishes: "garden.wishes.v1",
  typeBaseDelay: 32,
  memoryCaptions: [
    "A bright smile",
    "One sweet memory",
    "A soft spring moment",
    "You deserve the universe",
    "A little frame of happiness",
  ],
  girls: {
    linh: {
      name: "Mỹ Linh",
      heroImage: "./assets/Linh/Linh1.png",
      images: [
        "./assets/Linh/Linh1.png",
        "./assets/Linh/linh2.png",
        "./assets/Linh/Linh3.png",
        "./assets/Linh/Linh4.png",
        "./assets/Linh/Linh5.png",
        "./assets/Linh/Linh6.jpg",
      ],
     letter: [
  "Dear Linh,",
  "",
  "Happy Women's Day.",
  "",
  "I hope today feels a little softer and brighter for you. Like a quiet moment where everything slows down just enough for you to smile.",
  "",
  "May you keep shining in your own calm and beautiful way. The kind of light that doesn’t need to be loud, but somehow still makes the world around you feel warmer.",
  "",
  "I hope life brings you many peaceful days, kind people, and small moments that make your heart quietly happy.",
  "",
  "Thank you for being someone so gentle, lovely, and unforgettable in your own special way.",
  "",
  "Wishing you a day filled with warmth, laughter, and the sweetest smiles.",
  "",
  "And if this little universe brings you even a tiny smile today, then it was worth creating. ✨",
].join("\n")
    },
    dung: {
      name: "Vân Dung",
      heroImage: "./assets/Dung/Dung1.png",
      images: [
        "./assets/Dung/Dung1.png",
        "./assets/Dung/Dung2.png",
        "./assets/Dung/Dung3.png",
        "./assets/Dung/Dung4.png",
        "./assets/Dung/Dung5.png",
        "./assets/Dung/Dung6.png",
      ],
      letter: [
  "Dear Dung,",
  "",
  "Happy Women's Day.",
  "",
  "I hope today greets you like a warm spring morning — calm, bright, and full of gentle little joys.",
  "",
  "May you always stay cheerful, confident, and full of the energy that makes the space around you feel lighter and more alive.",
  "",
  "I hope life gives you many lucky moments, quiet happiness, and countless reasons to smile without hesitation.",
  "",
  "Thank you for bringing warmth and brightness to the people around you in your own beautiful way.",
  "",
  "Wishing you a day filled with peace, laughter, and the kind of happiness that stays with you long after today.",
  "",
  "And I hope this small sakura garden brings you a little smile. 🌸",
].join("\n")
    },
  },
  themeCopy: {
  cosmic: {
    introText: "Two bright stars are drifting into a glowing orbit ✨",
    heroKicker: "International Women's Day • 08/03",
    heroTitle: "Hai vì sao tỏa sáng trong khu vườn của vũ trụ",
    heroSubtitle:
      "Mỗi vì sao là một hành trình nhỏ chứa những lời chúc và ký ức dành riêng cho bạn.",

    choiceTagLinh: "STAR 01",
    choiceTagDung: "STAR 02",

    choiceHintLinh: "Chạm để mở hành trình ánh sao",
    choiceHintDung: "Bước vào khu vườn sao bí mật",

    wishBtn: "Gửi đi một ngôi sao",

    heroCredit:
      "A tiny universe made with care by <strong>Minh Phạm ✨</strong>",

    stagePill: "Cosmic Receiver",
    letterPill: "Space Letter",
    wishPill: "Wish Star",

    wishKicker: "Wish Constellation",

    wishTitle: "Thả một điều ước vào dải ngân hà",

    wishSubtitle:
      "Viết một điều ước và thả nó đi theo ánh sao nhé.",

    wishLabel: "Tin nhắn ánh sao",

    wishPlaceholder: "Ví dụ: May you always shine brightly",

    wishAction: "Launch the star wish",

    wishNote:
      "Mỗi điều ước sẽ trở thành một vì sao nhỏ trong bản đồ kỷ niệm.",

    stageHint:
      "Di chuột để cảm nhận không gian • chạm vòng hoa để mở bức thư",

    portalText: "Open the Letter",
    portalSub: "Tap to enter",

    ending: "Hope this little universe made your 8/3 brighter ✨",

    choiceMarks: ["✦", "✧"],
    wishGlyph: "✦",
  },

  sakura: {
    introText: "Two soft petals have landed in a gentle sakura garden 🌸",
    heroKicker: "International Women's Day • 08/03",

    heroTitle: "Hai cánh hoa rực rỡ trong khu vườn mùa xuân",

    heroSubtitle:
      "Chọn một bông hoa để bước vào khu vườn sakura và mở những lời chúc dịu dàng dành cho bạn.",

    choiceTagLinh: "BLOOM 01",
    choiceTagDung: "BLOOM 02",

    choiceHintLinh: "Chạm để bước vào vườn hoa",
    choiceHintDung: "Đi vào khu sakura bí mật",

    wishBtn: "Thả đi một cánh hoa",

    heroCredit:
      "A small sakura garden by <strong>Minh Phạm 🌸</strong>",

    stagePill: "Petal Receiver",
    letterPill: "Sakura Letter",
    wishPill: "Wish Blossom",

    wishKicker: "Wish Blossom Garden",

    wishTitle: "Gieo một điều ước vào vườn sakura",

    wishSubtitle:
      "Viết một lời mong ước dịu dàng, rồi để cánh hoa mang nó bay lên giữa khu vườn mùa xuân.",

    wishLabel: "Điều ước mùa xuân",

    wishPlaceholder: "Ví dụ: Chúc bạn luôn rạng rỡ và bình yên",

    wishAction: "Thả cánh hoa ước",

    wishNote:
      "Mỗi điều ước sẽ nở thành một bông hoa nhỏ trong khu vườn này.",

    stageHint:
      "Di chuột để cánh hoa bay • chạm vòng hoa để mở thư",

    portalText: "Mở lời chúc",
    portalSub: "Chạm để vào",

    ending: "Hope this little garden made your 8/3 sweeter 🌸",

    choiceMarks: ["❀", "✿"],
    wishGlyph: "🌸",
  },
}
};

const state = {
  theme: "cosmic",
  screen: 1,
  currentGirlKey: null,
  previousScreen: 1,
  typingTimer: null,
  backgroundIntervals: [],
  backgroundTimers: new Set(),
  backgroundRunId: 0,
  memoryInterval: null,
  memoryTimeout: null,
  letterTimers: [],
  portalBusy: false,
  homeBusy: false,
  wishes: [],
  musicOn: false,
  stageParallaxBound: false,
  stageHoverTick: 0,
  stageMotion: {
    targetX: 0.5,
    targetY: 0.5,
    x: 0.5,
    y: 0.5,
    raf: null,
    wasActive: false,
  },
  heroParallaxBound: false,
  heroHoverTick: 0,
  customCursorBound: false,
  backgroundTimeouts: [],
  transitionBusy: false,
  constellationAnchors: [],
  performance: null,
  resizeTimer: null,
  stageGeometry: {
    stageWidth: 0,
    stageHeight: 0,
    cards: [],
  },
};

const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const isMobile = () => window.matchMedia("(max-width: 820px)").matches;
const isPhoneViewport = () => window.matchMedia("(max-width: 760px)").matches;
const isCompactViewport = () => window.innerHeight <= 860;
const isTightViewport = () => window.innerHeight <= 760;
const supportsFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const readDeviceNumber = (key, fallback) => {
  const value = Number(navigator?.[key]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};
const performanceLevel = () => state.performance?.level || "high";
const pickPerformanceValue = (high, medium = high, low = medium) => (
  performanceLevel() === "low" ? low : performanceLevel() === "medium" ? medium : high
);
const scalePerformanceCount = (high, medium = high, low = medium) => Math.max(0, Math.round(pickPerformanceValue(high, medium, low)));

function buildPerformanceProfile() {
  const reduced = prefersReducedMotion();
  const mobile = isMobile();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const memory = readDeviceNumber("deviceMemory", mobile ? 4 : 8);
  const cores = readDeviceNumber("hardwareConcurrency", mobile ? 4 : 8);
  const verySmallScreen = width <= 420 || height <= 720;
  const compactScreen = width <= 1366 || height <= 820;

  let level = "high";
  if (reduced || memory <= 4 || cores <= 4 || (mobile && verySmallScreen)) {
    level = "low";
  } else if (mobile || compactScreen || memory <= 8 || cores <= 8) {
    level = "medium";
  }
  const pickLevelValue = (high, medium = high, low = medium) => (
    level === "low" ? low : level === "medium" ? medium : high
  );

  return {
    level,
    reduced,
    mobile,
    memory,
    cores,
    allowCustomCursor: supportsFinePointer() && level !== "low",
    allowHeroParallax: !mobile && !reduced && level !== "low" && supportsFinePointer(),
    allowStageParallax: !mobile && !reduced && level !== "low" && supportsFinePointer(),
    allowConstellation: !reduced && level === "high",
    stageLinkRefreshMs: pickLevelValue(420, 760, 1180),
    heroHoverMs: pickLevelValue(48, 82, 132),
    stageHoverMs: pickLevelValue(46, 92, 148),
    resizeDebounceMs: pickLevelValue(120, 160, 220),
    backgroundIntervalScale: pickLevelValue(1, 1.34, 1.74),
    transitionScale: pickLevelValue(1, 0.92, 0.84),
  };
}

function refreshPerformanceProfile(force = false) {
  const next = buildPerformanceProfile();
  const prev = state.performance;
  const changed = force
    || !prev
    || prev.level !== next.level
    || prev.reduced !== next.reduced
    || prev.allowCustomCursor !== next.allowCustomCursor;
  state.performance = next;
  document.documentElement.setAttribute("data-performance", next.level);
  document.body.setAttribute("data-performance", next.level);
  return changed;
}

function debounce(fn, wait) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function getStageViewport() {
  const stage = $("#memoryStage");
  return {
    width: stage?.clientWidth || window.innerWidth,
    height: stage?.clientHeight || Math.round(window.innerHeight * (isMobile() ? 0.64 : 0.72)),
  };
}

function normalizeGallerySlots(slots) {
  const mobile = isMobile();
  const { width, height } = getStageViewport();
  const targetWidth = mobile ? 390 : 1120;
  const targetHeight = mobile ? 640 : 720;
  const fitScale = Math.min(width / targetWidth, height / targetHeight);
  const roomyBoost = !mobile && width > 1480 && height > 900 ? 1.03 : 1;
  const sizeScale = clamp(fitScale * roomyBoost, mobile ? 0.74 : 0.68, 1.02);
  const bottomShift = height < (mobile ? 560 : 650) ? -3 : height < (mobile ? 620 : 720) ? -2 : 0;
  const topShift = height < (mobile ? 560 : 650) ? 1 : 0;
  const sideShift = !mobile && width < 1160 ? 1.4 : 0;

  return slots.map((slot) => {
    const shiftedX = sideShift
      ? clamp(slot.x + (slot.x < 50 ? -sideShift : sideShift), 2, 88)
      : slot.x;
    const shiftedY = slot.y > 48
      ? clamp(slot.y + bottomShift, 4, 84)
      : clamp(slot.y + topShift, 4, 84);

    return {
      ...slot,
      x: shiftedX,
      y: shiftedY,
      w: Math.round(slot.w * sizeScale),
      h: Math.round(slot.h * sizeScale),
      orbit: slot.orbit + (height < (mobile ? 560 : 650) ? 0.9 : 0),
    };
  });
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function renderActiveScreenVisuals(options = {}) {
  const { refreshHighlight = false } = options;
  renderGalaxyBackgroundStars();
  startBackgroundEffects();
  applyStageTheme();
  renderStageStars();

  if (state.screen === 1) {
    renderHeroPetalPreview();
    return;
  }

  if (state.screen === 2 && state.currentGirlKey) {
    renderGallery();
    if (refreshHighlight) startMemoryHighlight();
    return;
  }

  if (state.screen === 4) {
    renderWishSky();
  }
}

function showScreen(screenId, options = {}) {
  const {
    render = true,
    refreshHighlight = screenId === 2,
  } = options;
  state.screen = screenId;
  document.body.dataset.screen = String(screenId);
  document.documentElement.dataset.screen = String(screenId);
  $$(".screen").forEach((screen) => {
    const active = Number(screen.dataset.screen) === screenId;
    screen.classList.toggle("active", active);
    screen.setAttribute("aria-hidden", active ? "false" : "true");
  });

  if (screenId !== 2) clearMemoryHighlight();
  if (screenId !== 3) {
    stopTyping();
    clearLetterTimers();
  }

  if (render) {
    renderActiveScreenVisuals({ refreshHighlight });
  }
}

function transitionToScreen(screenId, options = {}) {
  const {
    effect = "warp",
    onSwitched,
    onSettled,
    switchDelay = 300,
    totalDuration = 840,
  } = options;
  const profile = state.performance || buildPerformanceProfile();
  const transitionScale = profile.transitionScale || 1;
  const switchMs = Math.max(160, Math.round(switchDelay * transitionScale));
  const totalMs = Math.max(switchMs + 220, Math.round(totalDuration * transitionScale));
  const layer = $("#screenTransition");
  if (!layer || prefersReducedMotion()) {
    showScreen(screenId);
    onSwitched?.();
    onSettled?.();
    return;
  }
  if (state.transitionBusy) return;

  state.transitionBusy = true;
  document.body.dataset.transitioning = "1";
  document.documentElement.dataset.transitioning = "1";
  clearBackgroundEffects();
  if (state.screen === 2) clearMemoryHighlight();
  layer.className = "screen-transition";
  layer.dataset.effect = effect;
  layer.dataset.theme = state.theme;
  requestAnimationFrame(() => layer.classList.add("is-active", "is-enter"));

  setTimeout(() => {
    showScreen(screenId, { render: false });
    onSwitched?.();
    layer.classList.remove("is-enter");
    layer.classList.add("is-exit");
  }, switchMs);

  setTimeout(() => {
    renderActiveScreenVisuals({ refreshHighlight: screenId === 2 });
    onSettled?.();
    layer.className = "screen-transition";
    layer.removeAttribute("data-effect");
    layer.removeAttribute("data-theme");
    delete document.body.dataset.transitioning;
    delete document.documentElement.dataset.transitioning;
    state.transitionBusy = false;
  }, totalMs);
}

function currentGirl() {
  if (!state.currentGirlKey) return null;
  return CONFIG.girls[state.currentGirlKey] || null;
}

function setTheme(theme, persist = true) {
  const normalized = CONFIG.themes.includes(theme) ? theme : "cosmic";
  state.theme = normalized;
  document.documentElement.setAttribute("data-theme", normalized);
  document.body.setAttribute("data-theme", normalized);
  if (persist) localStorage.setItem(CONFIG.storageTheme, normalized);

  $$(".theme-btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.theme === normalized));
  applyThemeCopy();
  renderActiveScreenVisuals({ refreshHighlight: state.screen === 2 });
}

function applyThemeCopy() {
  const copy = CONFIG.themeCopy[state.theme] || CONFIG.themeCopy.cosmic;
  const map = [
    ["introOverlayText", "introText", false],
    ["heroKicker", "heroKicker", false],
    ["heroTitle", "heroTitle", false],
    ["heroSubtitle", "heroSubtitle", false],
    ["choiceTagLinh", "choiceTagLinh", false],
    ["choiceTagDung", "choiceTagDung", false],
    ["choiceHintLinh", "choiceHintLinh", false],
    ["choiceHintDung", "choiceHintDung", false],
    ["heroCredit", "heroCredit", true],
    ["stagePill", "stagePill", false],
    ["letterPill", "letterPill", false],
    ["wishPill", "wishPill", false],
    ["wishKicker", "wishKicker", false],
    ["wishTitle", "wishTitle", false],
    ["wishSubtitle", "wishSubtitle", false],
    ["wishLabel", "wishLabel", false],
    ["makeWishBtnText", "wishAction", false],
    ["wishNote", "wishNote", false],
    ["stageHint", "stageHint", false],
  ];

  map.forEach(([id, key, asHtml]) => {
    const node = $(`#${id}`);
    if (!node) return;
    if (asHtml) {
      node.innerHTML = copy[key];
    } else {
      node.textContent = copy[key];
    }
  });

  const portalText = $(".portal-btn__text");
  if (portalText) portalText.textContent = copy.portalText;
  const portalSub = $(".portal-btn__sub");
  if (portalSub) portalSub.textContent = copy.portalSub;
  const ending = $("#letterEnding");
  if (ending) ending.textContent = copy.ending;
  const wishInput = $("#wishInput");
  if (wishInput) wishInput.placeholder = copy.wishPlaceholder;
  const wishEntryLabel = $("#wishEntryLabel");
  if (wishEntryLabel) wishEntryLabel.textContent = copy.wishBtn;
  const wishEntryIcon = $("#wishEntryIcon");
  if (wishEntryIcon) wishEntryIcon.textContent = copy.wishGlyph || "✦";
  const makeWishIcon = $("#makeWishIcon");
  if (makeWishIcon) makeWishIcon.textContent = copy.wishGlyph || "✦";
  const wishShortcutGlyph = $("#wishShortcutGlyph");
  if (wishShortcutGlyph) wishShortcutGlyph.textContent = copy.wishGlyph || "✦";
  const wishShortcutBtn = $("#openWishFromStage");
  if (wishShortcutBtn) {
    wishShortcutBtn.setAttribute("aria-label", copy.wishBtn);
  }

  const marks = copy.choiceMarks || ["✦", "✧"];
  $$(".choice-stars").forEach((group) => {
    const icons = group.querySelectorAll("i");
    if (icons[0]) icons[0].textContent = marks[0];
    if (icons[1]) icons[1].textContent = marks[1];
  });
}
