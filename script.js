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
        "Linh ơi,",
        "",
        "8/3 chúc bạn luôn rạng rỡ như một cánh hoa mùa xuân.",
        "Mỗi bức ảnh bạn chụp đều sáng lên bằng chính năng lượng của bạn.",
        "",
        "Mong bạn có thật nhiều niềm vui,",
        "ít deadline hơn, nhiều nụ cười hơn,",
        "và luôn gặp những người thật tử tế trên hành trình của mình.",
        "",
        "Cảm ơn vì đã luôn dễ thương theo cách rất riêng.",
        "Chúc bạn một ngày 8/3 thật chill và thật hạnh phúc 💖",
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
        "Dung nè,",
        "",
        "Chúc bạn 8/3 luôn xinh tươi, vui vẻ và bình yên.",
        "Mong mỗi ngày của bạn đều có một điều dễ thương ghé qua.",
        "",
        "Chúc bạn đi đâu cũng gặp may mắn,",
        "làm gì cũng suôn sẻ,",
        "và luôn giữ được nụ cười rất đặc biệt của mình.",
        "",
        "Cảm ơn vì đã làm thế giới quanh mình vui hơn.",
        "Happy Women’s Day, cô gái tuyệt vời 🌸",
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
      wishBtn: "🌸 Vào Wish Star Page",
      heroCredit: "A small universe by <strong>Minh Phạm ✨</strong>",
      stagePill: "Cosmic Receiver",
      letterPill: "Space Letter",
      wishPill: "Wish Star Page",
      stageHint: "Di chuột để cảm nhận không gian • bấm vòng hoa để mở thư",
      portalText: "Open Letter",
      portalSub: "Tap to enter",
      ending: "Hope this little universe made you smile ✨",
      choiceMarks: ["✦", "✧"],
    },
    sakura: {
      heroKicker: "08/03 Dreamy Sakura Garden",
      heroTitle: "Hai cánh hoa rực rỡ trong khu vườn 8/3",
      heroSubtitle: "Chọn bông hoa để dạo vào vườn sakura và mở lá thư mùa xuân.",
      choiceTagLinh: "BLOOM 01",
      choiceTagDung: "BLOOM 02",
      choiceHintLinh: "Chạm để bước vào vườn hoa",
      choiceHintDung: "Đi vào khu cây sakura bí mật",
      wishBtn: "🌸 Bước vào Wish Blossom Page",
      heroCredit: "A small sakura garden by <strong>Minh Phạm 🌸</strong>",
      stagePill: "Petal Receiver",
      letterPill: "Sakura Letter",
      wishPill: "Wish Blossom Page",
      stageHint: "Di chuột để cánh hoa bay • bấm vòng hoa để mở thư",
      portalText: "Mở thư sakura",
      portalSub: "Chạm để vào",
      ending: "Hope this little garden made you smile 🌸",
      choiceMarks: ["❀", "✿"],
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
const supportsFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    ["openWishFromHome", "wishBtn", false],
    ["heroCredit", "heroCredit", true],
    ["stagePill", "stagePill", false],
    ["letterPill", "letterPill", false],
    ["wishPill", "wishPill", false],
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

  const marks = copy.choiceMarks || ["✦", "✧"];
  $$(".choice-stars").forEach((group) => {
    const icons = group.querySelectorAll("i");
    if (icons[0]) icons[0].textContent = marks[0];
    if (icons[1]) icons[1].textContent = marks[1];
  });
}

function runIntro() {
  const intro = $("#introOverlay");
  if (!intro) return;
  if (prefersReducedMotion()) {
    intro.remove();
    return;
  }
  intro.classList.add("is-visible");
  setTimeout(() => intro.classList.add("is-reveal"), 260);
  setTimeout(() => intro.classList.add("is-fade"), 1700);
  setTimeout(() => intro.remove(), 2550);
}

function spawnBackgroundItem(layerId, className, text, durationMin, durationMax) {
  const layer = $(layerId);
  if (!layer) return;
  const item = document.createElement("span");
  item.className = `fx-item ${className}`;
  if (text) item.textContent = text;

  if (className.includes("fx-shooting")) {
    item.style.setProperty("--x", `${rand(-8, 82).toFixed(2)}%`);
    item.style.setProperty("--y", `${rand(-16, 8).toFixed(2)}%`);
    item.style.setProperty("--shoot-angle", `${rand(28, 42).toFixed(2)}deg`);
    item.style.setProperty("--shoot-dx", `${rand(24, 46).toFixed(2)}vw`);
    item.style.setProperty("--shoot-dy", `${rand(34, 56).toFixed(2)}vh`);
    item.style.setProperty("--shoot-scale-start", `${rand(0.46, 0.62).toFixed(2)}`);
    item.style.setProperty("--shoot-scale-end", `${rand(0.92, 1.08).toFixed(2)}`);
  } else if (className.includes("fx-butterfly")) {
    item.style.setProperty("--x", `${rand(-8, 10).toFixed(2)}%`);
    item.style.setProperty("--y", `${rand(18, 66).toFixed(2)}%`);
    item.style.animationName = "fxFlutter";
  } else if (className.includes("fx-bee")) {
    item.style.setProperty("--x", `${rand(-8, 12).toFixed(2)}%`);
    item.style.setProperty("--y", `${rand(20, 72).toFixed(2)}%`);
    item.style.animationName = "fxBuzz";
  } else if (className.includes("fx-bird")) {
    item.style.setProperty("--x", `${rand(-12, 8).toFixed(2)}%`);
    item.style.setProperty("--y", `${rand(8, 42).toFixed(2)}%`);
    item.style.animationName = "fxBirdGlide";
  } else {
    item.style.setProperty("--x", `${rand(2, 98).toFixed(2)}%`);
    item.style.setProperty("--y", `${rand(-16, 0).toFixed(2)}%`);
  }
  item.style.setProperty("--dx", `${rand(-70, 70).toFixed(2)}px`);
  item.style.setProperty("--spin", `${rand(-240, 240).toFixed(1)}deg`);
  item.style.animationDuration = `${rand(durationMin, durationMax).toFixed(2)}s`;
  layer.appendChild(item);
  setTimeout(() => item.remove(), 22000);
}

function spawnConstellation() {
  if (state.theme !== "cosmic" || prefersReducedMotion()) return;
  const layer = $("#bgConstellation");
  if (!layer) return;

  const group = document.createElement("span");
  group.className = "fx-constellation";
  group.style.left = `${rand(8, 88)}%`;
  group.style.top = `${rand(10, 58)}%`;

  const points = Array.from({ length: 4 }, (_, index) => ({
    x: 12 + index * rand(20, 34),
    y: rand(8, 48),
  }));

  points.forEach((point) => {
    const star = document.createElement("span");
    star.className = "fx-constellation__star";
    star.style.left = `${point.x}%`;
    star.style.top = `${point.y}%`;
    group.appendChild(star);
  });

  for (let i = 0; i < points.length - 1; i += 1) {
    const from = points[i];
    const to = points[i + 1];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const line = document.createElement("span");
    line.className = "fx-constellation__line";
    line.style.left = `${from.x}%`;
    line.style.top = `${from.y}%`;
    line.style.width = `${Math.hypot(dx, dy)}%`;
    line.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    group.appendChild(line);
  }

  layer.appendChild(group);
  const center = {
    x: parseFloat(group.style.left),
    y: parseFloat(group.style.top),
  };
  state.constellationAnchors.push(center);
  if (state.constellationAnchors.length > 6) state.constellationAnchors.shift();

  if (state.constellationAnchors.length >= 2 && Math.random() > 0.35) {
    const from = state.constellationAnchors[state.constellationAnchors.length - 2];
    const to = state.constellationAnchors[state.constellationAnchors.length - 1];
    const bridge = document.createElement("span");
    bridge.className = "fx-constellation-bridge";
    bridge.style.left = `${from.x}%`;
    bridge.style.top = `${from.y}%`;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    bridge.style.width = `${Math.hypot(dx, dy)}%`;
    bridge.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    layer.appendChild(bridge);
    setTimeout(() => bridge.remove(), 7600);
  }

  setTimeout(() => group.remove(), 7200);
}

function generateGalaxyStarfield(count, options = {}) {
  const {
    minX = 0,
    maxX = 100,
    minY = 0,
    maxY = 100,
    clusterCount = 6,
    clusterBias = 0.58,
    minGap = 0.9,
    avoidCenterRadius = 0,
    avoidRects = [],
  } = options;

  const clusters = Array.from({ length: clusterCount }, () => ({
    x: rand(minX + 4, maxX - 4),
    y: rand(minY + 4, maxY - 4),
    spreadX: rand(5.5, 16),
    spreadY: rand(4.5, 14),
  }));

  const points = [];
  let attempts = 0;
  const maxAttempts = count * 36;

  const pickPoint = () => {
    if (Math.random() < clusterBias) {
      const cluster = clusters[Math.floor(rand(0, clusters.length))];
      const angle = rand(0, Math.PI * 2);
      const radius = Math.sqrt(Math.random());
      return {
        x: cluster.x + (Math.cos(angle) * cluster.spreadX * radius),
        y: cluster.y + (Math.sin(angle) * cluster.spreadY * radius),
      };
    }
    return {
      x: rand(minX, maxX),
      y: rand(minY, maxY),
    };
  };

  while (points.length < count && attempts < maxAttempts) {
    attempts += 1;
    const point = pickPoint();
    const x = clamp(point.x, minX, maxX);
    const y = clamp(point.y, minY, maxY);

    if (avoidCenterRadius > 0 && Math.hypot(x - 50, y - 50) < avoidCenterRadius) continue;

    const blockedRect = avoidRects.some((rect) => (
      x >= rect.x1 && x <= rect.x2 && y >= rect.y1 && y <= rect.y2 && Math.random() > (rect.allowChance ?? 0.14)
    ));
    if (blockedRect) continue;

    const tooClose = points.some((existing) => Math.hypot(x - existing.x, y - existing.y) < minGap);
    if (tooClose && Math.random() > 0.18) continue;

    const roll = Math.random();
    const toneRoll = Math.random();
    points.push({
      x,
      y,
      bright: roll > 0.8,
      giant: roll > 0.965,
      dim: roll < 0.16,
      warm: toneRoll > 0.86,
      cool: toneRoll > 0.56 && toneRoll < 0.8,
    });
  }

  while (points.length < count) {
    const roll = Math.random();
    const toneRoll = Math.random();
    points.push({
      x: rand(minX, maxX),
      y: rand(minY, maxY),
      bright: roll > 0.8,
      giant: roll > 0.965,
      dim: roll < 0.16,
      warm: toneRoll > 0.86,
      cool: toneRoll > 0.56 && toneRoll < 0.8,
    });
  }

  return points;
}

function buildGalaxyDustMap(count, options = {}) {
  const points = generateGalaxyStarfield(count, {
    minGap: 0.12,
    ...options,
  });

  return points.map((point) => {
    const rgb = point.warm
      ? [255, 228, 210]
      : point.cool
        ? [198, 228, 255]
        : [255, 255, 255];
    const alpha = point.giant
      ? rand(0.46, 0.78)
      : point.bright
        ? rand(0.18, 0.42)
        : point.dim
          ? rand(0.05, 0.12)
          : rand(0.07, 0.2);
    const core = point.giant
      ? rand(1.05, 2.2)
      : point.bright
        ? rand(0.62, 1.24)
        : point.dim
          ? rand(0.18, 0.42)
          : rand(0.28, 0.78);
    const glow = core + (point.giant ? rand(1.1, 2.6) : rand(0.55, 1.4));
    return `radial-gradient(circle at ${point.x.toFixed(2)}% ${point.y.toFixed(2)}%, rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha.toFixed(2)}) 0 ${core.toFixed(2)}px, rgba(${rgb[0]},${rgb[1]},${rgb[2]},0) ${glow.toFixed(2)}px)`;
  }).join(",");
}

function renderGalaxyBackgroundStars() {
  const layer = $("#bgStars");
  const constellationLayer = $("#bgConstellation");
  if (!layer) return;

  layer.querySelectorAll(".bg-starfield__star").forEach((node) => node.remove());
  if (state.theme !== "cosmic") {
    layer.style.backgroundImage = "";
    if (constellationLayer) constellationLayer.style.removeProperty("--milky-dust-map");
    return;
  }

  layer.style.backgroundImage = buildGalaxyDustMap(isMobile() ? 180 : 320, {
    minX: 0.5,
    maxX: 99.5,
    minY: 0.5,
    maxY: 99.5,
    clusterCount: isMobile() ? 8 : 12,
    clusterBias: isMobile() ? 0.6 : 0.74,
  });
  if (constellationLayer) {
    constellationLayer.style.setProperty("--milky-dust-map", buildGalaxyDustMap(isMobile() ? 84 : 156, {
      minX: 14,
      maxX: 86,
      minY: 18,
      maxY: 78,
      clusterCount: isMobile() ? 5 : 8,
      clusterBias: 0.82,
    }));
  }

  const count = isMobile() ? 240 : 520;
  const points = generateGalaxyStarfield(count, {
    minX: 0.8,
    maxX: 99.2,
    minY: 0.8,
    maxY: 99.2,
    clusterCount: isMobile() ? 8 : 12,
    clusterBias: isMobile() ? 0.6 : 0.76,
    minGap: isMobile() ? 0.34 : 0.44,
  });

  points.forEach((point) => {
    const star = document.createElement("span");
    star.className = [
      "bg-starfield__star",
      point.bright ? "bg-starfield__star--bright" : "",
      point.giant ? "bg-starfield__star--giant" : "",
      point.dim ? "bg-starfield__star--dim" : "",
      point.warm ? "bg-starfield__star--warm" : "",
      point.cool ? "bg-starfield__star--cool" : "",
    ].filter(Boolean).join(" ");
    star.style.left = `${point.x.toFixed(2)}%`;
    star.style.top = `${point.y.toFixed(2)}%`;
    star.style.setProperty("--size", `${(point.giant ? rand(2.8, 5) : point.bright ? rand(1.6, 3.4) : rand(0.7, 2.1)).toFixed(2)}px`);
    star.style.setProperty("--opacity", `${(point.giant ? rand(0.76, 0.98) : point.bright ? rand(0.36, 0.82) : point.dim ? rand(0.08, 0.24) : rand(0.14, 0.52)).toFixed(2)}`);
    star.style.setProperty("--dur", `${rand(2.8, 7.2).toFixed(2)}s`);
    star.style.setProperty("--delay", `${rand(0, 6.8).toFixed(2)}s`);
    star.style.setProperty("--blur", `${(point.giant ? rand(0, 0.45) : rand(0, 1.2)).toFixed(2)}px`);
    star.style.setProperty("--drift-x", `${rand(-8, 8).toFixed(2)}px`);
    star.style.setProperty("--drift-y", `${rand(-6, 6).toFixed(2)}px`);
    layer.appendChild(star);
  });
}

function applyStageTheme() {
  const stage = $("#memoryStage");
  if (!stage) return;
  stage.dataset.themeMode = state.theme;
}

function renderStageStars() {
  const layer = $("#stageStars");
  if (!layer) return;
  layer.innerHTML = "";

  if (state.theme !== "cosmic" || state.screen !== 2) return;
  const count = isMobile() ? 108 : 220;
  const minCenterDistance = isMobile() ? 14 : 16;
  const points = generateGalaxyStarfield(count, {
    minX: 2,
    maxX: 98,
    minY: 4,
    maxY: 94,
    clusterCount: isMobile() ? 7 : 10,
    clusterBias: isMobile() ? 0.64 : 0.74,
    minGap: isMobile() ? 0.48 : 0.6,
    avoidCenterRadius: minCenterDistance,
  });

  points.forEach((point) => {
    const star = document.createElement("span");
    star.className = [
      "stage-star",
      point.bright ? "stage-star--bright" : "",
      point.giant ? "stage-star--giant" : "",
      point.warm ? "stage-star--warm" : "",
      point.cool ? "stage-star--cool" : "",
    ].filter(Boolean).join(" ");
    star.style.left = `${point.x.toFixed(2)}%`;
    star.style.top = `${point.y.toFixed(2)}%`;
    star.style.setProperty("--size", `${(point.giant ? rand(2.4, 4.6) : point.bright ? rand(1.5, 3.4) : rand(0.9, 2.5)).toFixed(2)}px`);
    star.style.setProperty("--opacity", `${(point.giant ? rand(0.54, 0.88) : point.bright ? rand(0.3, 0.66) : rand(0.12, 0.38)).toFixed(2)}`);
    star.style.setProperty("--dur", `${rand(2.4, 6.2).toFixed(2)}s`);
    star.style.setProperty("--delay", `${rand(0, 5.4).toFixed(2)}s`);
    star.style.setProperty("--blur", `${(point.giant ? rand(0, 0.34) : rand(0, 1.1)).toFixed(2)}px`);
    layer.appendChild(star);
  });
}

function clearBackgroundEffects() {
  state.backgroundIntervals.forEach((timer) => clearInterval(timer));
  state.backgroundTimeouts.forEach((timer) => clearTimeout(timer));
  state.backgroundIntervals = [];
  state.backgroundTimeouts = [];
  state.constellationAnchors = [];
  $$(".fx-item").forEach((node) => node.remove());
  $$(".fx-constellation").forEach((node) => node.remove());
  $$(".fx-constellation-bridge").forEach((node) => node.remove());
}

function startBackgroundEffects() {
  clearBackgroundEffects();

  const lowPower = prefersReducedMotion() || isMobile();
  const sakura = state.theme === "sakura";
  const recipes = [];

  if (sakura) {
    recipes.push({ layer: "#bgSakura", className: "fx-petal", text: "🌸", min: 7.2, max: 11.8, interval: lowPower ? 900 : 520 });
    recipes.push({ layer: "#bgParticles", className: "fx-leaf", text: "🍃", min: 9.2, max: 13.8, interval: lowPower ? 1450 : 860 });
    recipes.push({ layer: "#bgStars", className: "fx-spark", text: "✨", min: 6.8, max: 10.6, interval: lowPower ? 1300 : 740 });
    recipes.push({ layer: "#bgSakura", className: "fx-butterfly", text: "🦋", min: 8.8, max: 13.4, interval: lowPower ? 5200 : 3000 });
    recipes.push({ layer: "#bgParticles", className: "fx-bee", text: "🐝", min: 7.6, max: 11.2, interval: lowPower ? 6800 : 3600 });
    recipes.push({ layer: "#bgSakura", className: "fx-bird", text: "🐦", min: 10.4, max: 14.8, interval: lowPower ? 9200 : 5200 });
  } else {
    recipes.push({ layer: "#bgStars", className: "fx-star", text: "", min: 6.8, max: 10.4, interval: lowPower ? 640 : 300 });
    recipes.push({ layer: "#bgParticles", className: "fx-soft", text: "", min: 8.2, max: 12.8, interval: lowPower ? 900 : 520 });
    recipes.push({ layer: "#bgParticles", className: "fx-shooting", text: "", min: 1.5, max: 2.4, interval: lowPower ? 9800 : 5200 });
  }

  recipes.forEach((recipe) => {
    const isCreature = /fx-butterfly|fx-bee|fx-bird/.test(recipe.className);
    const burst = lowPower ? (recipe.className.includes("fx-shooting") ? 0 : 1) : (recipe.className.includes("fx-shooting") ? 1 : (isCreature ? 1 : 3));
    for (let i = 0; i < burst; i += 1) {
      spawnBackgroundItem(recipe.layer, recipe.className, recipe.text, recipe.min, recipe.max);
    }
    const timer = setInterval(
      () => spawnBackgroundItem(recipe.layer, recipe.className, recipe.text, recipe.min, recipe.max),
      recipe.interval
    );
    state.backgroundIntervals.push(timer);
  });

  if (!sakura && !lowPower) {
    spawnConstellation();
    const constellationTimer = setInterval(spawnConstellation, 5600);
    state.backgroundIntervals.push(constellationTimer);
    state.backgroundTimeouts.push(setTimeout(spawnConstellation, 1800));
  }
}

function renderHeroPetalPreview() {
  const layer = $("#heroPetalPreview");
  const sparkLayer = $("#heroSparkles");
  if (!layer || !sparkLayer) return;

  const allImages = [...CONFIG.girls.linh.images, ...CONFIG.girls.dung.images];
  const shuffled = allImages.slice().sort(() => Math.random() - 0.5);
  const count = isMobile() ? 4 : (state.theme === "cosmic" ? 10 : 8);
  const sparkCount = isMobile() ? 8 : (state.theme === "cosmic" ? 20 : 14);

  layer.innerHTML = "";
  sparkLayer.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const card = document.createElement("article");
    card.className = "preview-petal";
    card.style.setProperty("--top", `${rand(10, 84).toFixed(2)}%`);
    card.style.setProperty("--delay", `${(rand(0, 5) + i * 0.34).toFixed(2)}s`);
    card.style.setProperty("--scale", `${(isMobile() ? rand(0.84, 1.06) : rand(0.86, 1.22)).toFixed(3)}`);
    card.style.setProperty("--drift-y", `${rand(-18, 18).toFixed(2)}px`);
    card.style.setProperty("--rot-start", `${rand(-18, 18).toFixed(1)}deg`);
    card.style.setProperty("--rot-end", `${rand(-16, 28).toFixed(1)}deg`);
    card.innerHTML = `<img src="${shuffled[i % shuffled.length]}" alt="Memory petal ${i + 1}" loading="lazy" />`;
    layer.appendChild(card);
  }

  if (state.theme === "cosmic") {
    sparkLayer.style.backgroundImage = buildGalaxyDustMap(isMobile() ? 96 : 180, {
      minX: 2,
      maxX: 98,
      minY: 4,
      maxY: 94,
      clusterCount: isMobile() ? 6 : 9,
      clusterBias: 0.78,
      avoidRects: [
        { x1: 10, x2: 48, y1: 18, y2: 64, allowChance: 0.42 },
      ],
    });

    const starCount = isMobile() ? 72 : 160;
    const stars = generateGalaxyStarfield(starCount, {
      minX: 2,
      maxX: 98,
      minY: 4,
      maxY: 94,
      clusterCount: isMobile() ? 6 : 10,
      clusterBias: isMobile() ? 0.66 : 0.8,
      minGap: isMobile() ? 0.5 : 0.62,
      avoidRects: [
        { x1: 12, x2: 50, y1: 16, y2: 64, allowChance: 0.48 },
      ],
    });

    stars.forEach((point) => {
      const spark = document.createElement("span");
      spark.className = [
        "hero-spark",
        point.bright ? "hero-spark--bright" : "",
        point.giant ? "hero-spark--giant" : "",
        point.warm ? "hero-spark--warm" : "",
        point.cool ? "hero-spark--cool" : "",
      ].filter(Boolean).join(" ");
      spark.style.left = `${point.x.toFixed(2)}%`;
      spark.style.top = `${point.y.toFixed(2)}%`;
      spark.style.setProperty("--size", `${(point.giant ? rand(2.4, 4.2) : point.bright ? rand(1.5, 3.2) : rand(0.8, 2.1)).toFixed(2)}px`);
      spark.style.setProperty("--opacity", `${(point.giant ? rand(0.68, 0.96) : point.bright ? rand(0.34, 0.78) : rand(0.14, 0.48)).toFixed(2)}`);
      spark.style.setProperty("--blur", `${(point.giant ? rand(0, 0.28) : rand(0, 0.9)).toFixed(2)}px`);
      spark.style.animationDelay = `${rand(0, 6.2).toFixed(2)}s`;
      spark.style.animationDuration = `${rand(2.4, 6.2).toFixed(2)}s`;
      sparkLayer.appendChild(spark);
    });
    return;
  }

  sparkLayer.style.backgroundImage = "";

  for (let i = 0; i < sparkCount; i += 1) {
    const spark = document.createElement("span");
    spark.className = "hero-spark";
    spark.style.left = `${rand(2, 98)}%`;
    spark.style.top = `${rand(4, 94)}%`;
    spark.style.animationDelay = `${rand(0, 4).toFixed(2)}s`;
    spark.style.animationDuration = `${rand(2.2, 4.2).toFixed(2)}s`;
    sparkLayer.appendChild(spark);
  }
}

function spawnHeroHoverParticle(container, x, y) {
  const node = document.createElement("span");
  const sakura = state.theme === "sakura";
  node.className = sakura ? "hero-hover-petal" : "hero-hover-star";
  if (sakura) {
    const petals = ["🌸", "❀", "✿"];
    node.textContent = petals[Math.floor(rand(0, petals.length))];
    node.style.setProperty("--rot", `${rand(-130, 130).toFixed(2)}deg`);
  }
  node.style.left = `${x}%`;
  node.style.top = `${y}%`;
  node.style.setProperty("--dx", `${rand(-32, 32).toFixed(2)}px`);
  node.style.setProperty("--dy", `${rand(-42, 24).toFixed(2)}px`);
  node.style.animationDuration = `${rand(0.7, 1.35).toFixed(2)}s`;
  container.appendChild(node);
  setTimeout(() => node.remove(), 1450);
}

function spawnCosmicLaunch(x, y) {
  const launch = document.createElement("div");
  launch.className = "cosmic-launch";
  launch.style.left = `${x}px`;
  launch.style.top = `${y}px`;

  const core = document.createElement("span");
  core.className = "cosmic-launch__core";
  launch.appendChild(core);

  const ring = document.createElement("span");
  ring.className = "cosmic-launch__ring";
  launch.appendChild(ring);

  for (let i = 0; i < 18; i += 1) {
    const p = document.createElement("span");
    p.className = "cosmic-launch__particle";
    const angle = (Math.PI * 2 * i) / 18;
    const radius = rand(80, 210);
    p.style.setProperty("--tx", `${Math.cos(angle) * radius}px`);
    p.style.setProperty("--ty", `${Math.sin(angle) * radius}px`);
    p.style.animationDelay = `${(i * 0.012).toFixed(3)}s`;
    launch.appendChild(p);
  }

  document.body.appendChild(launch);
  requestAnimationFrame(() => launch.classList.add("is-live"));
  setTimeout(() => launch.remove(), 1280);
}

function spawnSakuraLaunch(x, y) {
  const launch = document.createElement("div");
  launch.className = "sakura-launch";
  launch.style.left = `${x}px`;
  launch.style.top = `${y}px`;

  const glow = document.createElement("span");
  glow.className = "sakura-launch__glow";
  launch.appendChild(glow);

  const ring = document.createElement("span");
  ring.className = "sakura-launch__ring";
  launch.appendChild(ring);

  const core = document.createElement("span");
  core.className = "sakura-launch__core";
  core.textContent = "\u{1F338}";
  launch.appendChild(core);

  const petals = ["\u{1F338}", "\u2740", "\u273F"];
  for (let i = 0; i < 16; i += 1) {
    const petal = document.createElement("span");
    petal.className = "sakura-launch__petal";
    petal.textContent = petals[i % petals.length];
    const angle = (Math.PI * 2 * i) / 16;
    const radius = rand(90, 220);
    petal.style.setProperty("--tx", `${Math.cos(angle) * radius}px`);
    petal.style.setProperty("--ty", `${Math.sin(angle) * radius}px`);
    petal.style.setProperty("--rz", `${rand(-160, 160).toFixed(2)}deg`);
    petal.style.animationDelay = `${(i * 0.014).toFixed(3)}s`;
    launch.appendChild(petal);
  }

  document.body.appendChild(launch);
  requestAnimationFrame(() => launch.classList.add("is-live"));
  setTimeout(() => launch.remove(), 1380);
}

function spawnSakuraPortalSwirl(x, y) {
  const swirl = document.createElement("div");
  swirl.className = "sakura-portal-swirl";
  swirl.style.left = `${x}px`;
  swirl.style.top = `${y}px`;

  const veil = document.createElement("span");
  veil.className = "sakura-portal-swirl__veil";
  swirl.appendChild(veil);

  const glow = document.createElement("span");
  glow.className = "sakura-portal-swirl__glow";
  swirl.appendChild(glow);

  const ring = document.createElement("span");
  ring.className = "sakura-portal-swirl__ring";
  swirl.appendChild(ring);

  const core = document.createElement("span");
  core.className = "sakura-portal-swirl__core";
  core.textContent = "🌸";
  swirl.appendChild(core);

  const petals = ["🌸", "❀", "✿"];
  for (let i = 0; i < 18; i += 1) {
    const petal = document.createElement("span");
    petal.className = "sakura-portal-swirl__petal";
    petal.textContent = petals[i % petals.length];
    const angle = (Math.PI * 2 * i) / 18;
    const radius = rand(80, 240);
    petal.style.setProperty("--tx", `${Math.cos(angle) * radius}px`);
    petal.style.setProperty("--ty", `${Math.sin(angle) * radius}px`);
    petal.style.setProperty("--rz", `${rand(-180, 180).toFixed(2)}deg`);
    petal.style.animationDelay = `${(i * 0.012).toFixed(3)}s`;
    swirl.appendChild(petal);
  }

  document.body.appendChild(swirl);
  requestAnimationFrame(() => swirl.classList.add("is-live"));
  setTimeout(() => swirl.remove(), 1520);
}

function setupHeroInteraction() {
  if (state.heroParallaxBound) return;
  const hero = $(".screen-1 .hero");
  const sparkLayer = $("#heroSparkles");
  const copy = $(".hero-copy");
  const visual = $(".hero-visual");
  const floatingDecor = $$(".hero-decor [data-float]");
  if (!hero || !sparkLayer || !copy || !visual) return;
  state.heroParallaxBound = true;

  hero.addEventListener("mousemove", (event) => {
    if (state.screen !== 1 || isMobile()) return;
    const rect = hero.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
    hero.style.setProperty("--mx", `${x.toFixed(2)}%`);
    hero.style.setProperty("--my", `${y.toFixed(2)}%`);
    hero.classList.add("is-hovering");

    const nx = (x / 100) - 0.5;
    const ny = (y / 100) - 0.5;
    copy.style.transform = `translate3d(${(nx * -10).toFixed(2)}px, ${(ny * -8).toFixed(2)}px, 0)`;
    visual.style.transform = `translate3d(${(nx * 14).toFixed(2)}px, ${(ny * 10).toFixed(2)}px, 0)`;
    floatingDecor.forEach((node) => {
      const factor = Number(node.dataset.float || 0.8);
      node.style.transform = `translate3d(${(nx * -24 * factor).toFixed(2)}px, ${(ny * -16 * factor).toFixed(2)}px, 0)`;
    });

    const now = performance.now();
    if (now - state.heroHoverTick > 48) {
      spawnHeroHoverParticle(sparkLayer, x, y);
      state.heroHoverTick = now;
    }
  });

  hero.addEventListener("mouseleave", () => {
    hero.classList.remove("is-hovering");
    hero.style.removeProperty("--mx");
    hero.style.removeProperty("--my");
    copy.style.transform = "";
    visual.style.transform = "";
    floatingDecor.forEach((node) => {
      node.style.transform = "";
    });
  });
}

function setupCustomCursor() {
  if (state.customCursorBound) return;
  const cursor = $("#siteCursor");
  if (!cursor) return;
  state.customCursorBound = true;

  const root = document.documentElement;
  const syncCursorMode = () => {
    const enabled = supportsFinePointer();
    root.classList.toggle("has-site-cursor", enabled);
    if (!enabled) {
      cursor.classList.remove("is-visible", "is-hover", "is-pressed");
      cursor.style.setProperty("--cursor-x", "-120px");
      cursor.style.setProperty("--cursor-y", "-120px");
    }
  };

  const hideCursor = () => {
    cursor.classList.remove("is-visible", "is-hover", "is-pressed");
  };

  syncCursorMode();

  window.addEventListener("resize", syncCursorMode);
  window.addEventListener("blur", hideCursor);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hideCursor();
  });

  window.addEventListener("pointermove", (event) => {
    if (!supportsFinePointer() || (event.pointerType && event.pointerType !== "mouse")) return;
    cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    cursor.classList.add("is-visible");
    const interactive = event.target instanceof Element
      ? event.target.closest("button, a, input, textarea, select, label, [role='button']")
      : null;
    cursor.classList.toggle("is-hover", Boolean(interactive));
  });

  window.addEventListener("pointerdown", (event) => {
    if (!supportsFinePointer() || (event.pointerType && event.pointerType !== "mouse")) return;
    cursor.classList.add("is-visible", "is-pressed");
  });

  window.addEventListener("pointerup", () => cursor.classList.remove("is-pressed"));
  document.addEventListener("mouseout", (event) => {
    if (!event.relatedTarget) hideCursor();
  });
}

function setCurrentGirl(girlKey) {
  state.currentGirlKey = girlKey;
  const girl = currentGirl();
  if (!girl) return;
  $("#receiverName").textContent = girl.name;
  $("#letterNameTop").textContent = girl.name;
  $("#letterName").textContent = girl.name;
  $("#wishName").textContent = girl.name;
}

function startHomeTransition(girlKey, sourceEl) {
  if (state.homeBusy) return;
  const girl = CONFIG.girls[girlKey];
  if (!girl) return;

  state.homeBusy = true;
  setCurrentGirl(girlKey);

  const rect = sourceEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  if (state.theme === "sakura") {
    const hero = $(".screen-1 .hero");
    const bloom = document.createElement("span");
    bloom.className = "transition-bloom transition-bloom--sakura";
    bloom.style.left = `${centerX}px`;
    bloom.style.top = `${centerY}px`;
    document.body.appendChild(bloom);
    spawnSakuraLaunch(centerX, centerY);
    hero?.classList.add("is-sakura-transition");
    requestAnimationFrame(() => bloom.classList.add("is-live"));

    setTimeout(() => {
      transitionToScreen(2, {
        effect: "garden",
        switchDelay: 420,
        totalDuration: 1120,
        onSwitched: () => {
          renderGallery();
          startMemoryHighlight();
          setupStageParallax();
        },
      });
    }, 520);

    setTimeout(() => {
      bloom.remove();
      hero?.classList.remove("is-sakura-transition");
      state.homeBusy = false;
    }, 1420);
    return;
  }

  const hero = $(".screen-1 .hero");
  const bloom = document.createElement("span");
  bloom.className = "transition-bloom transition-bloom--cosmic";
  bloom.style.left = `${centerX}px`;
  bloom.style.top = `${centerY}px`;
  document.body.appendChild(bloom);
  spawnCosmicLaunch(centerX, centerY);
  sourceEl.classList.add("is-cosmic-selected");
  hero?.classList.add("is-cosmic-transition");
  requestAnimationFrame(() => bloom.classList.add("is-live"));

  setTimeout(() => {
    transitionToScreen(2, {
      effect: "quantum",
      switchDelay: 240,
      totalDuration: 820,
      onSwitched: () => {
        renderGallery();
        startMemoryHighlight();
        setupStageParallax();
        sourceEl.classList.remove("is-cosmic-selected");
        hero?.classList.remove("is-cosmic-transition");
        state.homeBusy = false;
      },
    });
  }, 300);

  setTimeout(() => {
    bloom.remove();
  }, 1120);
}

function gallerySlots() {
  if (state.theme === "sakura") {
    if (isMobile()) {
      return [
        { x: 8, y: 18, w: 108, h: 142, r: -6, z: 50, orbit: 10.8 },
        { x: 39, y: 10, w: 108, h: 142, r: 3, z: 38, orbit: 12.6 },
        { x: 68, y: 18, w: 108, h: 142, r: 6, z: 50, orbit: 10.8 },
        { x: 12, y: 55, w: 108, h: 142, r: -5, z: 42, orbit: 13.4 },
        { x: 66, y: 55, w: 108, h: 142, r: 5, z: 42, orbit: 13.2 },
      ];
    }
    return [
      { x: 10, y: 17, w: 198, h: 248, r: -6, z: 58, orbit: 12.4 },
      { x: 39, y: 8, w: 186, h: 234, r: 3, z: 40, orbit: 13.8 },
      { x: 67, y: 17, w: 198, h: 248, r: 6, z: 58, orbit: 12.6 },
      { x: 14, y: 54, w: 186, h: 236, r: -5, z: 46, orbit: 14.2 },
      { x: 62, y: 54, w: 186, h: 236, r: 5, z: 46, orbit: 14.2 },
    ];
  }
  if (isMobile()) {
    return [
      { x: 9, y: 14, w: 116, h: 150, r: -8, z: 50, orbit: 10.2 },
      { x: 40, y: 8, w: 110, h: 146, r: 6, z: 36, orbit: 12.2 },
      { x: 68, y: 14, w: 116, h: 150, r: -7, z: 50, orbit: 10.8 },
      { x: 65, y: 51, w: 116, h: 150, r: 8, z: 42, orbit: 11.6 },
      { x: 10, y: 51, w: 116, h: 150, r: -8, z: 42, orbit: 12.6 },
    ];
  }
  return [
    { x: 11, y: 15, w: 208, h: 258, r: -9, z: 58, orbit: 12.4 },
    { x: 39, y: 8, w: 188, h: 236, r: 5, z: 40, orbit: 14.2 },
    { x: 67, y: 15, w: 208, h: 258, r: -8, z: 58, orbit: 12.8 },
    { x: 63, y: 51, w: 194, h: 244, r: 7, z: 48, orbit: 13.6 },
    { x: 15, y: 51, w: 194, h: 244, r: -7, z: 48, orbit: 14.4 },
  ];
}

function createMemoryCard(src, slot, className = "") {
  const card = document.createElement("article");
  card.className = `memory-photo ${className}${state.theme === "sakura" ? " memory-photo--sakura" : ""}`.trim();
  card.style.left = `${slot.x}%`;
  card.style.top = `${slot.y}%`;
  card.style.width = `${slot.w}px`;
  card.style.height = `${slot.h}px`;
  card.style.setProperty("--base-rotate", `${slot.r}deg`);
  card.style.setProperty("--depth-z", `${slot.z}px`);
  card.style.setProperty("--orbit-duration", `${slot.orbit || rand(10.5, 14.8)}s`);
  card.style.setProperty("--orbit-delay", `${rand(-8, 0).toFixed(2)}s`);
  card.style.setProperty("--orbit-x", `${rand(-9, 9).toFixed(2)}px`);
  card.style.setProperty("--orbit-y", `${rand(-8, 8).toFixed(2)}px`);
  card.style.transform = `translate3d(0,0,var(--depth-z)) rotate(var(--base-rotate))`;
  card.dataset.rotate = String(slot.r);
  card.dataset.depth = String(slot.z);
  card.innerHTML = `<img src="${src}" alt="Memory photo" loading="lazy" />`;
  return card;
}

function renderStageLinks() {
  const stage = $("#memoryStage");
  const svg = $("#stageLinks");
  const portal = $("#openLetterBtn");
  if (!stage || !svg || !portal || !["cosmic", "sakura"].includes(state.theme)) {
    if (svg) svg.innerHTML = "";
    return;
  }

  const stageRect = stage.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return;
  const portalRect = portal.getBoundingClientRect();
  const portalX = portalRect.left - stageRect.left + (portalRect.width / 2);
  const portalY = portalRect.top - stageRect.top + (portalRect.height / 2);

  svg.setAttribute("viewBox", `0 0 ${stageRect.width} ${stageRect.height}`);
  svg.innerHTML = "";
  const cards = $$(".memory-photo--main");

  if (state.theme === "sakura") {
    const branchBaseY = stageRect.height * (isMobile() ? 0.2 : 0.15);
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left - stageRect.left + (rect.width / 2);
      const cardTopY = rect.top - stageRect.top + 8;
      const cardBottomY = rect.bottom - stageRect.top - 10;
      const wave = Math.sin((cardX / stageRect.width) * Math.PI * 1.12);
      const anchorX = clamp(cardX + (index % 2 ? -18 : 16), 42, stageRect.width - 42);
      const anchorY = clamp(
        branchBaseY + (wave * stageRect.height * 0.065) + (index < 2 ? -8 : 10),
        38,
        stageRect.height * 0.34
      );

      const hang = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hang.setAttribute(
        "d",
        `M ${anchorX} ${anchorY} Q ${anchorX + (index % 2 ? -8 : 8)} ${(anchorY + cardTopY) / 2} ${cardX} ${cardTopY}`
      );
      hang.setAttribute("class", "stage-link stage-link--hang");
      svg.appendChild(hang);

      const thread = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const ctrlX = ((cardX + portalX) / 2) + (cardX < portalX ? -54 : 54);
      const ctrlY = ((cardBottomY + portalY) / 2) + (index < 2 ? 26 : -2);
      thread.setAttribute("d", `M ${cardX} ${cardBottomY} Q ${ctrlX} ${ctrlY} ${portalX} ${portalY}`);
      thread.setAttribute("class", "stage-link stage-link--wish");
      thread.style.animationDelay = `${(index * 0.18).toFixed(2)}s`;
      svg.appendChild(thread);

      const blossom = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      blossom.setAttribute("cx", anchorX);
      blossom.setAttribute("cy", anchorY);
      blossom.setAttribute("r", "4.2");
      blossom.setAttribute("class", "stage-anchor");
      svg.appendChild(blossom);
    });
    return;
  }

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const cardX = rect.left - stageRect.left + (rect.width / 2);
    const cardY = rect.top - stageRect.top + (rect.height / 2);
    const ctrlX = ((cardX + portalX) / 2) + (index % 2 ? 34 : -34);
    const ctrlY = ((cardY + portalY) / 2) + (index < 2 ? -30 : 26);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${cardX} ${cardY} Q ${ctrlX} ${ctrlY} ${portalX} ${portalY}`);
    path.setAttribute("class", "stage-link");
    path.style.animationDelay = `${(index * 0.22).toFixed(2)}s`;
    svg.appendChild(path);
  });
}

function spawnStageTrail(stage, xPercent, yPercent) {
  const node = document.createElement("span");
  const sakura = state.theme === "sakura";
  node.className = sakura ? "stage-dust stage-dust--petal" : "stage-dust";
  if (sakura) node.textContent = Math.random() > 0.5 ? "🌸" : "❀";
  node.style.left = `${xPercent}%`;
  node.style.top = `${yPercent}%`;
  node.style.setProperty("--dx", `${rand(-18, 18).toFixed(2)}px`);
  node.style.setProperty("--dy", `${rand(-26, 18).toFixed(2)}px`);
  stage.appendChild(node);
  setTimeout(() => node.remove(), 1100);
}

function moveSlotAwayFromCore(slot, minDistance = 24) {
  const dx = slot.x - 50;
  const dy = slot.y - 50;
  const dist = Math.hypot(dx, dy) || 0.001;
  if (dist >= minDistance) return slot;
  const scale = minDistance / dist;
  return {
    ...slot,
    x: clamp(50 + (dx * scale), 1, 90),
    y: clamp(50 + (dy * scale), 2, 88),
  };
}

function spawnCardHoverBurst(stage, card) {
  if (!stage || !card) return;
  const stageRect = stage.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return;

  const centerX = ((cardRect.left - stageRect.left) + (cardRect.width / 2)) / stageRect.width * 100;
  const centerY = ((cardRect.top - stageRect.top) + (cardRect.height / 2)) / stageRect.height * 100;
  const burstCount = isMobile() ? 4 : 6;

  for (let i = 0; i < burstCount; i += 1) {
    setTimeout(() => {
      spawnStageTrail(
        stage,
        clamp(centerX + rand(-5, 5), 1, 99),
        clamp(centerY + rand(-5, 5), 1, 99)
      );
    }, i * 34);
  }
}

function renderGallery() {
  const girl = currentGirl();
  if (!girl) return;
  const main = $("#memoryGallery");
  const echo = $("#memoryGalleryEcho");
  const stage = $("#memoryStage");
  if (!main || !echo) return;
  const sakuraMode = state.theme === "sakura";

  main.innerHTML = "";
  echo.innerHTML = "";

  const slots = gallerySlots();
  girl.images.slice(0, 5).forEach((src, index) => {
    const slot = slots[index];
    const card = createMemoryCard(src, {
      ...slot,
      r: slot.r + rand(-1.2, 1.2),
      z: slot.z + rand(-1, 2),
    }, `memory-photo--main${sakuraMode ? " memory-photo--hung" : ""}`);
    card.dataset.index = String(index);
    if (stage) {
      card.addEventListener("mouseenter", () => spawnCardHoverBurst(stage, card));
      card.addEventListener("focus", () => spawnCardHoverBurst(stage, card));
    }
    card.insertAdjacentHTML("beforeend", `<span class="memory-label">${CONFIG.memoryCaptions[index % CONFIG.memoryCaptions.length]}</span>`);
    main.appendChild(card);
  });

  girl.images.slice(0, 5).forEach((src, index) => {
    const base = slots[index];
    const dirX = Math.sign(base.x - 50) || (index % 2 ? 1 : -1);
    const dirY = Math.sign(base.y - 50) || (index < 2 ? -1 : 1);
    const slot = {
      x: clamp(base.x + dirX * rand(6, 10), 2, 84),
      y: clamp(base.y + dirY * rand(6, 10), 3, 84),
      w: Math.round(base.w * rand(0.74, 0.86)),
      h: Math.round(base.h * rand(0.74, 0.86)),
      r: base.r + rand(-11, 11),
      z: Math.max(2, base.z - rand(16, 22)),
      orbit: base.orbit + rand(1.1, 2.8),
    };
    echo.appendChild(
      createMemoryCard(
        src,
        moveSlotAwayFromCore(slot, isMobile() ? (sakuraMode ? 30 : 20) : (sakuraMode ? 34 : 25)),
        "memory-photo--echo"
      )
    );
  });

  girl.images.slice(0, 5).forEach((src, index) => {
    const base = slots[index];
    const dirX = Math.sign(base.x - 50) || (index % 2 ? 1 : -1);
    const dirY = Math.sign(base.y - 50) || (index < 2 ? -1 : 1);
    const slot = {
      x: clamp(base.x - dirX * rand(9, 14), 2, 86),
      y: clamp(base.y - dirY * rand(9, 14), 3, 86),
      w: Math.round(base.w * rand(0.62, 0.72)),
      h: Math.round(base.h * rand(0.62, 0.72)),
      r: base.r + rand(-14, 14),
      z: Math.max(1, base.z - rand(24, 30)),
      orbit: base.orbit + rand(2.2, 4.8),
    };
    echo.appendChild(
      createMemoryCard(
        src,
        moveSlotAwayFromCore(slot, isMobile() ? (sakuraMode ? 34 : 24) : (sakuraMode ? 38 : 30)),
        "memory-photo--echo memory-photo--echo-soft"
      )
    );
  });

  const sparse = sakuraMode
    ? (isMobile()
      ? [
        { x: 2, y: 28, w: 74, h: 96, r: -6, z: 4, orbit: 16.8 },
        { x: 84, y: 24, w: 74, h: 96, r: 7, z: 4, orbit: 16.2 },
        { x: 44, y: 80, w: 72, h: 92, r: -4, z: 3, orbit: 17.4 },
      ]
      : [
        { x: 3, y: 24, w: 88, h: 112, r: -7, z: 5, orbit: 18.2 },
        { x: 84, y: 22, w: 88, h: 112, r: 8, z: 5, orbit: 17.8 },
        { x: 5, y: 73, w: 88, h: 112, r: -6, z: 4, orbit: 18.8 },
        { x: 84, y: 72, w: 88, h: 112, r: 7, z: 4, orbit: 18.4 },
      ])
    : (isMobile()
      ? [{ x: 3, y: 27, w: 78, h: 100, r: -8, z: 4, orbit: 16.2 }, { x: 82, y: 27, w: 78, h: 100, r: 7, z: 4, orbit: 15.8 }]
      : [{ x: 3, y: 20, w: 96, h: 122, r: -8, z: 5, orbit: 17.4 }, { x: 81, y: 22, w: 96, h: 122, r: 8, z: 5, orbit: 16.8 }, { x: 43, y: 76, w: 96, h: 122, r: -6, z: 4, orbit: 18.2 }]);

  sparse.forEach((slot, idx) => {
    echo.appendChild(createMemoryCard(girl.images[idx % girl.images.length], slot, "memory-photo--echo memory-photo--echo-faint"));
  });

  if (!isMobile()) {
    const ringCount = sakuraMode ? 6 : 10;
    for (let i = 0; i < ringCount; i += 1) {
      const angle = (Math.PI * 2 * i) / ringCount + rand(-0.18, 0.18);
      const slot = {
        x: clamp(50 + (Math.cos(angle) * rand(sakuraMode ? 38 : 31, sakuraMode ? 46 : 42)), 1, 89),
        y: clamp(50 + (Math.sin(angle) * rand(sakuraMode ? 30 : 24, sakuraMode ? 40 : 36)), 2, 88),
        w: Math.round(rand(sakuraMode ? 78 : 86, sakuraMode ? 96 : 104)),
        h: Math.round(rand(sakuraMode ? 100 : 110, sakuraMode ? 122 : 130)),
        r: rand(-12, 12),
        z: rand(2, 8),
        orbit: rand(16, 21),
      };
      echo.appendChild(
        createMemoryCard(
          girl.images[i % girl.images.length],
          moveSlotAwayFromCore(slot, sakuraMode ? 40 : 34),
          "memory-photo--echo memory-photo--echo-faint memory-photo--ambient"
        )
      );
    }
  }

  requestAnimationFrame(() => renderStageLinks());
}

function clearMemoryHighlight() {
  if (state.memoryInterval) clearInterval(state.memoryInterval);
  if (state.memoryTimeout) clearTimeout(state.memoryTimeout);
  state.memoryInterval = null;
  state.memoryTimeout = null;
  $("#memoryCaption").textContent = "";
  $$(".memory-photo--main.is-highlight").forEach((card) => card.classList.remove("is-highlight"));
}

function startMemoryHighlight() {
  clearMemoryHighlight();
  if (state.screen !== 2) return;
  const cards = $$(".memory-photo--main");
  const caption = $("#memoryCaption");
  if (!cards.length || !caption) return;

  const highlight = () => {
    cards.forEach((card) => card.classList.remove("is-highlight"));
    const picked = cards[Math.floor(rand(0, cards.length))];
    picked.classList.add("is-highlight");
    caption.textContent = picked.querySelector(".memory-label")?.textContent || "One sweet memory";
    state.memoryTimeout = setTimeout(() => picked.classList.remove("is-highlight"), 2200);
  };

  highlight();
  state.memoryInterval = setInterval(highlight, 4600);
}

function setupStageParallax() {
  if (state.stageParallaxBound) return;
  const stage = $("#memoryStage");
  const main = $("#memoryGallery");
  const echo = $("#memoryGalleryEcho");
  const cursorGlow = $("#stageCursorGlow");
  const portal = $("#openLetterBtn");
  if (!stage || !main || !echo || !cursorGlow) return;
  state.stageParallaxBound = true;

  const motion = state.stageMotion;
  if (motion.raf) cancelAnimationFrame(motion.raf);
  let lastLinkTs = 0;

  const updateStageField = () => {
    const transitioning = state.portalBusy || stage.classList.contains("is-portal-transition") || stage.classList.contains("is-blackhole-transition");
    const active = state.screen === 2 && !isMobile() && !transitioning;
    if (active) {
      motion.wasActive = true;
      motion.x += (motion.targetX - motion.x) * 0.15;
      motion.y += (motion.targetY - motion.y) * 0.15;
      const x = motion.x - 0.5;
      const y = motion.y - 0.5;
      const t = performance.now() * 0.001;
      const driftX = Math.sin(t * 0.45) * 2.4;
      const driftY = Math.cos(t * 0.4) * 1.9;
      const driftTilt = Math.sin(t * 0.24) * 0.9;

      stage.classList.add("is-pointer");
      stage.style.setProperty("--sx", `${(motion.x * 100).toFixed(2)}%`);
      stage.style.setProperty("--sy", `${(motion.y * 100).toFixed(2)}%`);
      cursorGlow.style.transform = `translate3d(${((motion.x - 0.5) * 18).toFixed(2)}px, ${((motion.y - 0.5) * 18).toFixed(2)}px, 0)`;

      main.style.transform = `rotateY(${(x * 7.4).toFixed(2)}deg) rotateX(${(-y * 7.4).toFixed(2)}deg) rotateZ(${driftTilt.toFixed(2)}deg) translate3d(${((x * 10) + driftX).toFixed(2)}px, ${((y * 10) + driftY).toFixed(2)}px, 0)`;
      echo.style.transform = `rotateY(${(x * 4.8).toFixed(2)}deg) rotateX(${(-y * 4.8).toFixed(2)}deg) rotateZ(${(-driftTilt * 0.66).toFixed(2)}deg) translate3d(${((x * 16) - (driftX * 0.5)).toFixed(2)}px, ${((y * 16) - (driftY * 0.5)).toFixed(2)}px, 0)`;
      if (portal) {
        portal.style.setProperty("--px", `${((x * 7) + (driftX * 0.3)).toFixed(2)}px`);
        portal.style.setProperty("--py", `${((-y * 7) + (driftY * 0.3)).toFixed(2)}px`);
      }

      const stageRect = stage.getBoundingClientRect();
      const pointerX = stageRect.left + (motion.x * stageRect.width);
      const pointerY = stageRect.top + (motion.y * stageRect.height);
      let nearest = null;
      let nearestDist = Number.POSITIVE_INFINITY;
      const mainCards = $$(".memory-photo--main");
      mainCards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + (r.width / 2);
        const cy = r.top + (r.height / 2);
        const d = Math.hypot(pointerX - cx, pointerY - cy);
        if (d < nearestDist) {
          nearest = card;
          nearestDist = d;
        }
      });

      $$(".memory-photo").forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + (r.width / 2);
        const cy = r.top + (r.height / 2);
        const dx = pointerX - cx;
        const dy = pointerY - cy;
        const dist = Math.hypot(dx, dy);
        const isMain = card.classList.contains("memory-photo--main");
        const radius = isMain ? 300 : 220;
        const safeDist = dist || 0.001;

        let tx = 0;
        let ty = 0;
        if (dist < radius) {
          const force = 1 - (dist / radius);
          const strength = isMain ? 10 : 6;
          tx = (-dx / safeDist) * force * strength;
          ty = (-dy / safeDist) * force * strength;
        }

        if (card === nearest && nearestDist < 260) {
          const pullForce = 1 - (nearestDist / 260);
          tx += (dx / safeDist) * pullForce * 7.5;
          ty += (dy / safeDist) * pullForce * 7.5;
          card.classList.add("is-magnetic");
        } else {
          card.classList.remove("is-magnetic");
        }

        card.style.translate = `${tx.toFixed(2)}px ${ty.toFixed(2)}px`;
      });

      const now = performance.now();
      if (now - lastLinkTs > 420) {
        renderStageLinks();
        lastLinkTs = now;
      }
    } else {
      if (motion.wasActive) {
        stage.classList.remove("is-pointer");
        main.style.transform = "";
        echo.style.transform = "";
        cursorGlow.style.transform = "";
        if (portal) {
          portal.style.setProperty("--px", "0px");
          portal.style.setProperty("--py", "0px");
        }
        $$(".memory-photo").forEach((card) => {
          card.style.translate = "0 0";
          card.classList.remove("is-magnetic");
        });
      }
      motion.wasActive = false;
      motion.targetX = 0.5;
      motion.targetY = 0.5;
      motion.x += (0.5 - motion.x) * 0.2;
      motion.y += (0.5 - motion.y) * 0.2;
    }
    motion.raf = requestAnimationFrame(updateStageField);
  };

  motion.raf = requestAnimationFrame(updateStageField);

  stage.addEventListener("mousemove", (event) => {
    const rect = stage.getBoundingClientRect();
    motion.targetX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    motion.targetY = clamp((event.clientY - rect.top) / rect.height, 0, 1);

    const now = performance.now();
    if (now - state.stageHoverTick > 46) {
      spawnStageTrail(stage, motion.targetX * 100, motion.targetY * 100);
      state.stageHoverTick = now;
    }
  });

  stage.addEventListener("mouseleave", () => {
    motion.targetX = 0.5;
    motion.targetY = 0.5;
  });
}

function startPortalTransition() {
  if (state.portalBusy || !currentGirl()) return;
  const stage = $("#memoryStage");
  if (!stage) return;
  state.portalBusy = true;
  clearMemoryHighlight();

  const mainGallery = $("#memoryGallery");
  const echoGallery = $("#memoryGalleryEcho");
  const cursorGlow = $("#stageCursorGlow");
  stage.classList.remove("is-pointer");
  if (mainGallery) mainGallery.style.transform = "";
  if (echoGallery) echoGallery.style.transform = "";
  if (cursorGlow) cursorGlow.style.transform = "";
  $$(".memory-photo").forEach((card) => {
    card.style.translate = "0 0";
    card.classList.remove("is-magnetic", "is-highlight");
  });

  const clearPortalState = () => {
    stage.classList.remove(
      "is-portal-transition",
      "is-blackhole-transition",
      "is-blackhole-burst",
      "is-sakura-portal-transition",
      "is-sakura-portal-bloom"
    );
    $$(".memory-photo.to-portal").forEach((card) => {
      card.classList.remove("to-portal", "to-sakura-portal");
      card.style.translate = "0 0";
      [
        "--portal-dx",
        "--portal-dy",
        "--arc-x",
        "--arc-y",
        "--spin-a",
        "--spin-b",
        "--spin-c",
        "--petal-scale",
        "--pull-delay",
      ].forEach((key) => card.style.removeProperty(key));
    });
  };

  if (state.theme === "cosmic") {
    const portal = $("#openLetterBtn");
    const stageRect = stage.getBoundingClientRect();
    const portalRect = portal?.getBoundingClientRect();
    const portalX = portalRect ? portalRect.left + (portalRect.width / 2) : stageRect.left + (stageRect.width / 2);
    const portalY = portalRect ? portalRect.top + (portalRect.height / 2) : stageRect.top + (stageRect.height / 2);

    stage.classList.add("is-blackhole-transition");
    $$(".memory-photo").forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + (rect.width / 2);
      const cardY = rect.top + (rect.height / 2);
      const dx = portalX - cardX;
      const dy = portalY - cardY;
      const dist = Math.hypot(dx, dy);
      const side = index % 2 === 0 ? 1 : -1;
      card.style.translate = "0 0";
      card.style.setProperty("--portal-dx", `${dx.toFixed(2)}px`);
      card.style.setProperty("--portal-dy", `${dy.toFixed(2)}px`);
      card.style.setProperty("--arc-x", `${(side * rand(34, 86)).toFixed(2)}px`);
      card.style.setProperty("--arc-y", `${rand(-78, 38).toFixed(2)}px`);
      card.style.setProperty("--spin-a", `${(side * rand(90, 180)).toFixed(2)}deg`);
      card.style.setProperty("--spin-b", `${(side * rand(240, 420)).toFixed(2)}deg`);
      card.style.setProperty("--pull-delay", `${clamp((dist / Math.max(stageRect.width, stageRect.height)) * 0.12, 0, 0.14).toFixed(3)}s`);
      card.classList.add("to-portal");
    });

    setTimeout(() => {
      stage.classList.add("is-blackhole-burst");
    }, 760);

    setTimeout(() => {
      transitionToScreen(3, {
        effect: "supernova",
        switchDelay: 240,
        totalDuration: 760,
        onSwitched: () => {
          startLetterSequence();
          clearPortalState();
          state.portalBusy = false;
        },
      });
    }, 860);
    return;
  }

  if (state.theme === "sakura") {
    const portal = $("#openLetterBtn");
    const stageRect = stage.getBoundingClientRect();
    const portalRect = portal?.getBoundingClientRect();
    const portalX = portalRect ? portalRect.left + (portalRect.width / 2) : stageRect.left + (stageRect.width / 2);
    const portalY = portalRect ? portalRect.top + (portalRect.height / 2) : stageRect.top + (stageRect.height / 2);

    stage.classList.add("is-sakura-portal-transition");
    spawnSakuraPortalSwirl(portalX, portalY);

    $$(".memory-photo").forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + (rect.width / 2);
      const cardY = rect.top + (rect.height / 2);
      const dx = portalX - cardX;
      const dy = portalY - cardY;
      const dist = Math.hypot(dx, dy);
      const side = cardX < portalX ? -1 : 1;
      const lift = cardY < portalY ? -1 : 1;
      card.style.translate = "0 0";
      card.style.setProperty("--portal-dx", `${dx.toFixed(2)}px`);
      card.style.setProperty("--portal-dy", `${dy.toFixed(2)}px`);
      card.style.setProperty("--arc-x", `${(side * rand(26, 74)).toFixed(2)}px`);
      card.style.setProperty("--arc-y", `${(lift * rand(-68, 34)).toFixed(2)}px`);
      card.style.setProperty("--spin-a", `${(side * rand(14, 34)).toFixed(2)}deg`);
      card.style.setProperty("--spin-b", `${(side * rand(54, 116)).toFixed(2)}deg`);
      card.style.setProperty("--spin-c", `${(side * rand(110, 180)).toFixed(2)}deg`);
      card.style.setProperty("--petal-scale", `${rand(0.08, 0.24).toFixed(2)}`);
      card.style.setProperty(
        "--pull-delay",
        `${clamp((dist / Math.max(stageRect.width, stageRect.height)) * 0.1, 0, 0.12).toFixed(3)}s`
      );
      card.classList.add("to-portal", "to-sakura-portal");
    });

    setTimeout(() => {
      stage.classList.add("is-sakura-portal-bloom");
    }, 620);

    setTimeout(() => {
      transitionToScreen(3, {
        effect: "blossom",
        switchDelay: 260,
        totalDuration: 900,
        onSwitched: () => {
          startLetterSequence();
          clearPortalState();
          state.portalBusy = false;
        },
      });
    }, 760);
    return;
  }

  stage.classList.add("is-portal-transition");
  $$(".memory-photo--main").forEach((card) => card.classList.add("to-portal"));
  $$(".memory-photo--echo").forEach((card) => card.classList.add("to-portal"));

  setTimeout(() => {
    transitionToScreen(3, {
      effect: "portal",
      onSwitched: () => {
        startLetterSequence();
        clearPortalState();
        state.portalBusy = false;
      },
    });
  }, 980);
}

function stopTyping() {
  if (state.typingTimer) clearTimeout(state.typingTimer);
  state.typingTimer = null;
}

function clearLetterTimers() {
  state.letterTimers.forEach((timer) => clearTimeout(timer));
  state.letterTimers = [];
}

function resetLetterScene() {
  const envelope = $("#envelope");
  const paper = $("#letterPaper");
  const typing = $("#typing");
  const ending = $("#letterEnding");
  const scene = $("#letterScene");

  if (scene) scene.classList.remove("is-arriving");
  if (envelope) envelope.classList.remove("is-arrived", "is-open", "is-paper", "is-floating");
  if (paper) paper.classList.remove("is-visible");
  if (typing) {
    typing.textContent = "";
    typing.scrollTop = 0;
  }
  if (ending) ending.classList.remove("show");
}

function typeWriter(text, target) {
  stopTyping();
  target.textContent = "";
  target.scrollTop = 0;
  let index = 0;

  const delayFor = (char) => {
    if (char === ".") return CONFIG.typeBaseDelay + 500;
    if (char === ",") return CONFIG.typeBaseDelay + 200;
    if (char === "!" || char === "?") return CONFIG.typeBaseDelay + 420;
    if (char === "\n") return CONFIG.typeBaseDelay + 120;
    return CONFIG.typeBaseDelay;
  };

  const tick = () => {
    const char = text[index] ?? "";
    target.textContent += char;
    target.scrollTop = target.scrollHeight;
    index += 1;
    if (index < text.length) {
      state.typingTimer = setTimeout(tick, delayFor(char));
    } else {
      $("#letterEnding")?.classList.add("show");
      burstLetterHearts();
    }
  };

  tick();
}

function burstLetterHearts() {
  const scene = $("#letterScene");
  if (!scene) return;
  const icon = state.theme === "sakura" ? "🌸" : "💖";
  for (let i = 0; i < 6; i += 1) {
    const heart = document.createElement("span");
    heart.className = "letter-burst";
    heart.textContent = icon;
    heart.style.left = `${rand(28, 72)}%`;
    heart.style.bottom = `${rand(14, 24)}%`;
    heart.style.setProperty("--dx", `${rand(-90, 90)}px`);
    heart.style.setProperty("--dy", `${rand(140, 220)}px`);
    heart.style.animationDelay = `${(i * 0.07).toFixed(2)}s`;
    scene.appendChild(heart);
    setTimeout(() => heart.remove(), 2400);
  }
}

function startLetterSequence() {
  const girl = currentGirl();
  if (!girl) return;
  const scene = $("#letterScene");
  const envelope = $("#envelope");
  const paper = $("#letterPaper");
  const typing = $("#typing");
  if (!scene || !envelope || !paper || !typing) return;

  resetLetterScene();
  scene.classList.add("is-arriving");

  const t1 = setTimeout(() => envelope.classList.add("is-arrived"), 260);
  const t2 = setTimeout(() => envelope.classList.add("is-open"), 640);
  const t3 = setTimeout(() => {
    envelope.classList.add("is-paper");
    paper.classList.add("is-visible");
  }, 980);
  const tFloat = setTimeout(() => envelope.classList.add("is-floating"), 1040);
  const t4 = setTimeout(() => typeWriter(girl.letter, typing), 1220);
  state.letterTimers.push(t1, t2, t3, tFloat, t4);
}

function backToStage() {
  transitionToScreen(2, {
    effect: "drift",
    onSwitched: () => {
      renderGallery();
      startMemoryHighlight();
    },
  });
}

function loadWishes() {
  try {
    const raw = localStorage.getItem(CONFIG.storageWishes);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.text === "string").slice(-28);
  } catch {
    return [];
  }
}

function saveWishes() {
  localStorage.setItem(CONFIG.storageWishes, JSON.stringify(state.wishes.slice(-28)));
}

function pickWishPosition() {
  const sky = $("#wishSky");
  const width = sky?.clientWidth || (isMobile() ? 320 : 760);
  const height = sky?.clientHeight || 300;
  let best = { x: rand(10, 90), y: rand(12, 78) };

  for (let i = 0; i < 28; i += 1) {
    const c = { x: rand(10, 90), y: rand(12, 78) };
    const overlap = state.wishes.some((w) => {
      const dx = ((c.x - w.x) / 100) * width;
      const dy = ((c.y - w.y) / 100) * height;
      return Math.hypot(dx, dy) < (isMobile() ? 52 : 64);
    });
    best = c;
    if (!overlap) break;
  }
  return best;
}

function wishNode(wish, animate = false) {
  const item = document.createElement("article");
  item.className = `wish-node ${wish.theme === "sakura" ? "is-sakura" : "is-cosmic"}`;
  item.style.setProperty("--x", `${wish.x}%`);
  item.style.setProperty("--y", `${wish.y}%`);
  item.innerHTML = `<span class="wish-node__spark">${wish.theme === "sakura" ? "🌸" : "✨"}</span><p class="wish-node__text">${wish.text}</p>`;
  if (animate) {
    item.classList.add("is-launching");
    requestAnimationFrame(() => item.classList.add("is-settled"));
  } else {
    item.classList.add("is-settled");
  }
  return item;
}

function renderWishSky() {
  const sky = $("#wishSky");
  if (!sky) return;
  sky.innerHTML = "";
  state.wishes.forEach((wish) => sky.appendChild(wishNode(wish, false)));
}

function makeWish() {
  const input = $("#wishInput");
  const sky = $("#wishSky");
  if (!input || !sky) return;
  const text = input.value.trim().replace(/\s+/g, " ").slice(0, 140);
  if (!text) {
    showToast("Nhập điều ước trước nhé ✨");
    input.focus();
    return;
  }

  if (state.wishes.length >= 28) state.wishes.shift();
  const pos = pickWishPosition();
  const wish = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
    text,
    x: pos.x,
    y: pos.y,
    theme: state.theme,
  };
  state.wishes.push(wish);
  saveWishes();
  sky.appendChild(wishNode(wish, true));
  input.value = "";
  showToast("Điều ước của bạn đã bay lên bầu trời.");
}

function openWishScreen(fromScreen) {
  state.previousScreen = fromScreen;
  transitionToScreen(4, {
    effect: "petal",
    onSwitched: () => setTimeout(() => $("#wishInput")?.focus({ preventScroll: true }), 120),
  });
}

function toggleMusic() {
  const audio = $("#bgm");
  const btn = $("#toggleMusic");
  if (!audio || !btn) return;

  if (!state.musicOn) {
    audio.volume = 0.16;
    const p = audio.play();
    if (p && typeof p.catch === "function") {
      p.then(() => {
        state.musicOn = true;
        btn.classList.add("is-on");
        localStorage.setItem(CONFIG.storageMusic, "1");
      }).catch(() => {
        state.musicOn = false;
        btn.classList.remove("is-on");
        showToast("Trình duyệt đang chặn autoplay.");
      });
      return;
    }
    state.musicOn = true;
  } else {
    audio.pause();
    state.musicOn = false;
  }

  btn.classList.toggle("is-on", state.musicOn);
  localStorage.setItem(CONFIG.storageMusic, state.musicOn ? "1" : "0");
}

function bindEvents() {
  $$(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.dataset.theme));
  });

  $$(".choice-card").forEach((btn) => {
    btn.addEventListener("click", () => startHomeTransition(btn.dataset.girl, btn));
  });

  $$(".hero-photo[data-girl]").forEach((card) => {
    card.addEventListener("click", () => startHomeTransition(card.dataset.girl, card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        startHomeTransition(card.dataset.girl, card);
      }
    });
  });

  $("#backToHome")?.addEventListener("click", () => transitionToScreen(1, { effect: "drift" }));
  $("#openWishFromHome")?.addEventListener("click", () => openWishScreen(1));
  $("#openWishFromStage")?.addEventListener("click", () => openWishScreen(2));
  $("#backFromWish")?.addEventListener("click", () => {
    transitionToScreen(state.previousScreen || 1, {
      effect: "drift",
      onSwitched: () => {
        if (state.previousScreen === 2) startMemoryHighlight();
      },
    });
  });
  $("#openLetterBtn")?.addEventListener("click", startPortalTransition);
  $("#backToStage")?.addEventListener("click", backToStage);
  $("#againBtn")?.addEventListener("click", backToStage);
  $("#makeWishBtn")?.addEventListener("click", makeWish);
  $("#wishInput")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      makeWish();
    }
  });
  $("#toggleMusic")?.addEventListener("click", toggleMusic);

  window.addEventListener("resize", () => {
    renderGalaxyBackgroundStars();
    renderHeroPetalPreview();
    if (state.screen === 2 && state.currentGirlKey) renderGallery();
    renderStageStars();
    if (state.screen === 4) renderWishSky();
  });
}

function init() {
  state.wishes = loadWishes();

  const savedTheme = localStorage.getItem(CONFIG.storageTheme);
  setTheme(savedTheme === "sakura" ? "sakura" : "cosmic", false);
  showScreen(1);
  bindEvents();
  setupCustomCursor();
  setupHeroInteraction();
  runIntro();

  if (localStorage.getItem(CONFIG.storageMusic) === "1") {
    toggleMusic();
  }
}

init();
