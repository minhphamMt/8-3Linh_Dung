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
};

const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const isMobile = () => window.matchMedia("(max-width: 820px)").matches;
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
  const portalText = $(".portal-btn__text");
  if (portalText) portalText.textContent = normalized === "sakura" ? "Open Letter" : "Open Letter";
  const ending = $("#letterEnding");
  if (ending) ending.textContent = normalized === "sakura"
    ? "Hope this little garden made you smile 🌸"
    : "Hope this little universe made you smile ✨";

  renderHeroPetalPreview();
  renderWishSky();
  if (state.screen === 2 && state.currentGirlKey) renderGallery();
  startBackgroundEffects();
}

function runIntro() {
  const intro = $("#introOverlay");
  if (!intro) return;
  if (prefersReducedMotion()) {
    intro.remove();
    return;
  }
  intro.classList.add("is-visible");
  setTimeout(() => intro.classList.add("is-hidden"), 1700);
  setTimeout(() => intro.remove(), 2300);
}

function spawnBackgroundItem(layerId, className, text, durationMin, durationMax) {
  const layer = $(layerId);
  if (!layer) return;
  const item = document.createElement("span");
  item.className = `fx-item ${className}`;
  if (text) item.textContent = text;
  item.style.setProperty("--x", `${rand(2, 98).toFixed(2)}%`);
  item.style.setProperty("--y", `${rand(-16, 0).toFixed(2)}%`);
  item.style.setProperty("--dx", `${rand(-70, 70).toFixed(2)}px`);
  item.style.setProperty("--spin", `${rand(-240, 240).toFixed(1)}deg`);
  item.style.animationDuration = `${rand(durationMin, durationMax).toFixed(2)}s`;
  layer.appendChild(item);
  setTimeout(() => item.remove(), 22000);
}

function clearBackgroundEffects() {
  state.backgroundIntervals.forEach((timer) => clearInterval(timer));
  state.backgroundIntervals = [];
  $$(".fx-item").forEach((node) => node.remove());
}

function startBackgroundEffects() {
  clearBackgroundEffects();

  const lowPower = prefersReducedMotion() || isMobile();
  const sakura = state.theme === "sakura";
  const recipes = [];

  if (sakura) {
    recipes.push({ layer: "#bgSakura", className: "fx-petal", text: "🌸", min: 8.2, max: 13.6, interval: lowPower ? 1300 : 760 });
    recipes.push({ layer: "#bgParticles", className: "fx-leaf", text: "🍃", min: 10, max: 15.4, interval: lowPower ? 1800 : 1100 });
    recipes.push({ layer: "#bgStars", className: "fx-spark", text: "✨", min: 7.8, max: 11.4, interval: lowPower ? 1400 : 880 });
  } else {
    recipes.push({ layer: "#bgStars", className: "fx-star", text: "", min: 7.5, max: 12.2, interval: lowPower ? 900 : 430 });
    recipes.push({ layer: "#bgParticles", className: "fx-soft", text: "", min: 8.8, max: 14, interval: lowPower ? 1200 : 620 });
    recipes.push({ layer: "#bgSakura", className: "fx-petal fx-petal--faint", text: "🌸", min: 9.8, max: 15.6, interval: lowPower ? 2200 : 1300 });
  }

  recipes.forEach((recipe) => {
    spawnBackgroundItem(recipe.layer, recipe.className, recipe.text, recipe.min, recipe.max);
    const timer = setInterval(
      () => spawnBackgroundItem(recipe.layer, recipe.className, recipe.text, recipe.min, recipe.max),
      recipe.interval
    );
    state.backgroundIntervals.push(timer);
  });
}

function renderHeroPetalPreview() {
  const layer = $("#heroPetalPreview");
  const sparkLayer = $("#heroSparkles");
  if (!layer || !sparkLayer) return;

  const allImages = [...CONFIG.girls.linh.images, ...CONFIG.girls.dung.images];
  const shuffled = allImages.slice().sort(() => Math.random() - 0.5);
  const count = isMobile() ? 4 : 8;
  const sparkCount = isMobile() ? 7 : 14;

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
  const bloom = document.createElement("span");
  bloom.className = "transition-bloom";
  bloom.style.left = `${rect.left + rect.width / 2}px`;
  bloom.style.top = `${rect.top + rect.height / 2}px`;
  document.body.appendChild(bloom);
  requestAnimationFrame(() => bloom.classList.add("is-live"));

  setTimeout(() => {
    showScreen(2);
    renderGallery();
    startMemoryHighlight();
    setupStageParallax();
  }, 620);

  setTimeout(() => {
    bloom.remove();
    state.homeBusy = false;
  }, 1300);
}

function gallerySlots() {
  if (isMobile()) {
    return [
      { x: 12, y: 16, w: 118, h: 152, r: -7, z: 34 },
      { x: 39, y: 10, w: 116, h: 148, r: 6, z: 36 },
      { x: 64, y: 18, w: 116, h: 148, r: -6, z: 34 },
      { x: 63, y: 48, w: 118, h: 152, r: 7, z: 33 },
      { x: 12, y: 48, w: 118, h: 152, r: -7, z: 33 },
    ];
  }
  return [
    { x: 10, y: 14, w: 168, h: 214, r: -8, z: 36 },
    { x: 32, y: 8, w: 174, h: 220, r: 6, z: 40 },
    { x: 56, y: 13, w: 168, h: 214, r: -6, z: 35 },
    { x: 64, y: 42, w: 170, h: 218, r: 7, z: 34 },
    { x: 26, y: 44, w: 170, h: 218, r: -7, z: 34 },
  ];
}

function createMemoryCard(src, slot, className = "") {
  const card = document.createElement("article");
  card.className = `memory-photo ${className}`.trim();
  card.style.left = `${slot.x}%`;
  card.style.top = `${slot.y}%`;
  card.style.width = `${slot.w}px`;
  card.style.height = `${slot.h}px`;
  card.style.transform = `translate3d(0,0,${slot.z}px) rotate(${slot.r}deg)`;
  card.dataset.rotate = String(slot.r);
  card.dataset.depth = String(slot.z);
  card.innerHTML = `<img src="${src}" alt="Memory photo" loading="lazy" />`;
  return card;
}

function renderGallery() {
  const girl = currentGirl();
  if (!girl) return;
  const main = $("#memoryGallery");
  const echo = $("#memoryGalleryEcho");
  if (!main || !echo) return;

  main.innerHTML = "";
  echo.innerHTML = "";

  const slots = gallerySlots();
  girl.images.slice(0, 5).forEach((src, index) => {
    const slot = slots[index];
    const card = createMemoryCard(src, {
      ...slot,
      r: slot.r + rand(-1.2, 1.2),
      z: slot.z + rand(-1, 2),
    }, "memory-photo--main");
    card.dataset.index = String(index);
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
    };
    echo.appendChild(createMemoryCard(src, slot, "memory-photo--echo"));
  });

  const sparse = isMobile()
    ? [{ x: 4, y: 28, w: 78, h: 100, r: -8, z: 4 }, { x: 80, y: 26, w: 78, h: 100, r: 7, z: 4 }]
    : [{ x: 4, y: 20, w: 92, h: 118, r: -9, z: 4 }, { x: 78, y: 20, w: 92, h: 118, r: 8, z: 4 }, { x: 41, y: 74, w: 92, h: 118, r: -6, z: 3 }];

  sparse.forEach((slot, idx) => {
    echo.appendChild(createMemoryCard(girl.images[idx % girl.images.length], slot, "memory-photo--echo memory-photo--echo-faint"));
  });
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
  if (!stage || !main || !echo) return;
  state.stageParallaxBound = true;

  stage.addEventListener("mousemove", (event) => {
    if (state.screen !== 2 || isMobile()) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    main.style.transform = `rotateY(${(x * 7).toFixed(2)}deg) rotateX(${(-y * 7).toFixed(2)}deg) translate3d(${(x * 10).toFixed(2)}px, ${(y * 10).toFixed(2)}px, 0)`;
    echo.style.transform = `rotateY(${(x * 4).toFixed(2)}deg) rotateX(${(-y * 4).toFixed(2)}deg) translate3d(${(x * 14).toFixed(2)}px, ${(y * 14).toFixed(2)}px, 0)`;
  });

  stage.addEventListener("mouseleave", () => {
    main.style.transform = "";
    echo.style.transform = "";
  });
}

function startPortalTransition() {
  if (state.portalBusy || !currentGirl()) return;
  const stage = $("#memoryStage");
  if (!stage) return;
  state.portalBusy = true;

  stage.classList.add("is-portal-transition");
  $$(".memory-photo--main").forEach((card) => card.classList.add("to-portal"));
  $$(".memory-photo--echo").forEach((card) => card.classList.add("to-portal"));

  setTimeout(() => {
    showScreen(3);
    startLetterSequence();
    stage.classList.remove("is-portal-transition");
    $$(".memory-photo.to-portal").forEach((card) => card.classList.remove("to-portal"));
    state.portalBusy = false;
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
  if (envelope) envelope.classList.remove("is-arrived", "is-open", "is-paper");
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
  const t4 = setTimeout(() => typeWriter(girl.letter, typing), 1220);
  state.letterTimers.push(t1, t2, t3, t4);
}

function backToStage() {
  showScreen(2);
  renderGallery();
  startMemoryHighlight();
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
  showScreen(4);
  setTimeout(() => $("#wishInput")?.focus({ preventScroll: true }), 120);
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

  $("#backToHome")?.addEventListener("click", () => showScreen(1));
  $("#openWishFromHome")?.addEventListener("click", () => openWishScreen(1));
  $("#openWishFromStage")?.addEventListener("click", () => openWishScreen(2));
  $("#backFromWish")?.addEventListener("click", () => {
    showScreen(state.previousScreen || 1);
    if (state.previousScreen === 2) startMemoryHighlight();
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
    renderHeroPetalPreview();
    if (state.screen === 2 && state.currentGirlKey) renderGallery();
    if (state.screen === 4) renderWishSky();
  });
}

function init() {
  state.wishes = loadWishes();

  const savedTheme = localStorage.getItem(CONFIG.storageTheme);
  setTheme(savedTheme === "sakura" ? "sakura" : "cosmic", false);
  showScreen(1);
  bindEvents();
  runIntro();

  if (localStorage.getItem(CONFIG.storageMusic) === "1") {
    toggleMusic();
  }
}

init();
