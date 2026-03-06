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
      ],
      letter: [
        "Dear Linh,",
        "",
        "Happy Women's Day.",
        "May you keep shining in your own calm and beautiful way, and may every little moment around you feel a bit softer and brighter.",
        "",
        "I hope your days bring you more joy, less stress, and many kind people who truly understand your heart.",
        "Thank you for being gentle, lovely, and unforgettable in the way only you can be.",
        "",
        "Wishing you a day full of peace, laughter, and the sweetest smiles. 💖",
      ].join("\n"),
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
      ],
      letter: [
        "Dear Dung,",
        "",
        "Happy Women's Day.",
        "May you always stay bright, warm, and full of the energy that makes every space around you feel more alive.",
        "",
        "I hope life gives you more lucky moments, more quiet happiness, and more reasons to smile without holding back.",
        "Thank you for making the world around you feel sweeter, lighter, and more beautiful.",
        "",
        "Wishing you a lovely day filled with peace, confidence, and joy. 🌸",
      ].join("\n"),
    },
  },
  themeCopy: {
    cosmic: {
      heroKicker: "08/03 Story Journey",
      heroTitle: "Hai vì sao tỏa sáng trong khu vườn 8/3",
      heroSubtitle: "Chọn một ngôi sao bắt đầu hành trình ký ức và lời chúc.",
      choiceTagLinh: "STAR 01",
      choiceTagDung: "STAR 02",
      choiceHintLinh: "Chạm để mở hành trình",
      choiceHintDung: "Đi vào khu vườn bí mật",
      wishBtn: "Vào Wish Star Page",
      heroCredit: "A small universe by <strong>Minh Phạm ✨</strong>",
      stagePill: "Cosmic Receiver",
      letterPill: "Space Letter",
      wishPill: "Wish Star Page",
      wishKicker: "Wish Constellation",
      wishTitle: "Thả một điều ước vào dải ngân hà",
      wishSubtitle: "Viết điều bạn muốn gửi, rồi để vì sao ấy neo lại trong bầu trời riêng của hai người.",
      wishLabel: "Tin nhắn ánh sao",
      wishPlaceholder: "Ví dụ: May you always shine",
      wishAction: "Launch star wish",
      wishNote: "Mỗi điều ước sẽ hóa thành một điểm sáng nhỏ trong bản đồ kỷ niệm.",
      stageHint: "Di chuột để cảm nhận không gian • bấm vòng hoa để mở thư",
      portalText: "Open Letter",
      portalSub: "Tap to enter",
      ending: "Hope this little universe made you smile ✨",
      choiceMarks: ["✦", "✧"],
      wishGlyph: "✦",
    },
    sakura: {
      heroKicker: "08/03 Dreamy Sakura Garden",
      heroTitle: "Hai cánh hoa rực rỡ trong khu vườn 8/3",
      heroSubtitle: "Chọn bông hoa để dạo vào vườn sakura và mở lá thư mùa xuân.",
      choiceTagLinh: "BLOOM 01",
      choiceTagDung: "BLOOM 02",
      choiceHintLinh: "Chạm để bước vào vườn hoa",
      choiceHintDung: "Đi vào khu cây sakura bí mật",
      wishBtn: "Vào Wish Blossom Page",
      heroCredit: "A small sakura garden by <strong>Minh Phạm 🌸</strong>",
      stagePill: "Petal Receiver",
      letterPill: "Sakura Letter",
      wishPill: "Wish Blossom Page",
      wishKicker: "Wish Blossom Garden",
      wishTitle: "Gieo một điều ước vào vườn sakura",
      wishSubtitle: "Viết một lời mong muốn dịu dàng, rồi để cánh hoa mang nó bay lên giữa khu vườn mùa xuân.",
      wishLabel: "Điều ước mùa xuân",
      wishPlaceholder: "Ví dụ: Chúc bạn luôn rạng rỡ và bình yên",
      wishAction: "Thả cánh hoa ước",
      wishNote: "Mỗi điều ước sẽ nở thành một bông hoa nhỏ trong khu vườn này.",
      stageHint: "Di chuột để cánh hoa bay • bấm vòng hoa để mở thư",
      portalText: "Mở thư sakura",
      portalSub: "Chạm để vào",
      ending: "Hope this little garden made you smile 🌸",
      choiceMarks: ["❀", "✿"],
      wishGlyph: "🌸",
    },
  },
};

const state = {
  theme: "cosmic",
  screen: 1,
  currentGirlKey: null,
  previousScreen: 1,
  typingTimer: null,
  backgroundIntervals: [],
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
};

const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const isMobile = () => window.matchMedia("(max-width: 820px)").matches;
const isCompactViewport = () => window.innerHeight <= 860;
const isTightViewport = () => window.innerHeight <= 760;
const supportsFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function showScreen(screenId) {
  state.screen = screenId;
  document.body.dataset.screen = String(screenId);
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

  startBackgroundEffects();
  applyStageTheme();
  renderStageStars();
  if (screenId === 1) {
    renderHeroPetalPreview();
  }
  if (screenId === 2 && state.currentGirlKey) {
    renderGallery();
    startMemoryHighlight();
  }
  if (screenId === 4) {
    renderWishSky();
  }
}

function transitionToScreen(screenId, options = {}) {
  const {
    effect = "warp",
    onSwitched,
    switchDelay = 300,
    totalDuration = 840,
  } = options;
  const layer = $("#screenTransition");
  if (!layer || prefersReducedMotion()) {
    showScreen(screenId);
    onSwitched?.();
    return;
  }
  if (state.transitionBusy) return;

  state.transitionBusy = true;
  layer.className = "screen-transition";
  layer.dataset.effect = effect;
  layer.dataset.theme = state.theme;
  requestAnimationFrame(() => layer.classList.add("is-active", "is-enter"));

  setTimeout(() => {
    showScreen(screenId);
    onSwitched?.();
    layer.classList.remove("is-enter");
    layer.classList.add("is-exit");
  }, switchDelay);

  setTimeout(() => {
    layer.className = "screen-transition";
    layer.removeAttribute("data-effect");
    layer.removeAttribute("data-theme");
    state.transitionBusy = false;
  }, totalDuration);
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
  applyStageTheme();
  renderGalaxyBackgroundStars();
  renderHeroPetalPreview();
  renderWishSky();
  if (state.screen === 2 && state.currentGirlKey) renderGallery();
  renderStageStars();
  startBackgroundEffects();
}

function applyThemeCopy() {
  const copy = CONFIG.themeCopy[state.theme] || CONFIG.themeCopy.cosmic;
  const map = [
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
