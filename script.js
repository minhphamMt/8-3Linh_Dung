const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const CONFIG = {
  girls: {
    Dung: {
      name: "Linh",
      images: ["./assets/Linh/Linh1.png", "./assets/Linh/linh2.png", "./assets/Linh/Linh3.png", "./assets/Linh/Linh4.png", "./assets/Linh/Linh5.png"],
      letter: [
        "Linh ơi,",
        "",
        "8/3 chúc bạn xinh đẹp vượt KPI của chính mình 🌸",
        "Chụp ảnh góc nào cũng “auto đẹp”,",
        "và ra đường thì được ưu ái như nhân vật chính.",
        "",
        "Mong bạn luôn vui vẻ, ít drama, nhiều niềm vui,",
        "deadline thì né bạn ra xa một chút 😆",
        "",
        "Cảm ơn vì đã luôn là một người bạn dễ thương và nói chuyện cực kỳ cuốn.",
        "Giữ nguyên vibe đó nha, đừng có thay đổi gì hết đó!",
        "",
        "Chúc Linh một ngày 8/3 thiệt chill, thiệt vui",
        "và thiệt nhiều quàaa 💗",
      ].join("\n"),
    },
    ha: {
      name: "Dung",
      images: ["./assets/Dung/Dung1.png", "./assets/Dung/Dung2.png", "./assets/Dung/Dung3.png", "./assets/Dung/Dung4.png", "./assets/Dung/Dung5.png"],
      letter: [
        "Dung nè,", "", "8/3 chúc bạn luôn rạng rỡ, vui vẻ và cười nhiều hơn cả số lần deadline dí 🌷", "Mong Dung ngày nào cũng có mood tốt, ảnh nào đăng lên cũng full tim.",
        "", "Chúc bạn gặp toàn chuyện dễ thương,", "đi đâu cũng có đồng bọn xịn, làm gì cũng thuận buồm xuôi gió.", "",
        "Cứ giữ nét hài hước và năng lượng tích cực như bây giờ nhé,", "vì đó là 'đặc sản' khiến ai chơi cùng cũng thấy vui lây 💞", "", "Chúc Dung 8/3 thiệt chill, thiệt vui và thiệt nhiều quà!",
      ].join("\n"),
    },
  },
  layouts: {
    desktop: [
      { x: 4, y: 8, w: 170, h: 212, r: -6 },
      { x: 24, y: 7, w: 188, h: 136, r: 4 },
      { x: 50, y: 6, w: 176, h: 210, r: -5 },
      { x: 70, y: 10, w: 182, h: 140, r: 6 },
      { x: 77, y: 38, w: 168, h: 206, r: -6 },
      { x: 57, y: 58, w: 184, h: 136, r: 4 },
      { x: 30, y: 58, w: 172, h: 206, r: -4 },
      { x: 7, y: 40, w: 184, h: 138, r: 7 },
      { x: 39, y: 28, w: 164, h: 122, r: 8 },
      { x: 17, y: 72, w: 170, h: 120, r: -8 },
      { x: 66, y: 74, w: 168, h: 124, r: 5 },
    ],
    mobile: [
      { x: 5, y: 8, w: 124, h: 158, r: -6 },
      { x: 52, y: 8, w: 126, h: 94, r: 5 },
      { x: 56, y: 29, w: 126, h: 158, r: 7 },
      { x: 8, y: 35, w: 130, h: 98, r: -6 },
      { x: 9, y: 58, w: 132, h: 158, r: 5 },
      { x: 53, y: 58, w: 126, h: 122, r: -4 },
      { x: 32, y: 76, w: 126, h: 108, r: 3 },
      { x: 1, y: 76, w: 116, h: 92, r: -9 },
      { x: 66, y: 72, w: 112, h: 92, r: 10 },
    ],
  },
  wishPool: [
    { id: "radiant", emoji: "🌸", title: "Rạng rỡ", text: "Mỗi ngày bạn đều có năng lượng tích cực và tỏa sáng theo cách rất riêng.", rarity: "common", weight: 44 },
    { id: "beloved", emoji: "💖", title: "Được yêu thương", text: "Bạn luôn gặp những người tử tế, biết trân trọng và nâng niu bạn.", rarity: "common", weight: 40 },
    { id: "peace", emoji: "🌷", title: "Bình yên", text: "Lịch trình bận rộn vẫn có những khoảng lặng thật dễ chịu dành cho bạn.", rarity: "common", weight: 36 },
    { id: "brave", emoji: "🫶", title: "Can đảm", text: "Mọi mục tiêu bạn theo đuổi đều có đủ kiên định và may mắn để đạt được thành công.", rarity: "rare", weight: 22 },
    { id: "lucky", emoji: "✨", title: "May mắn", text: "Điều tốt đẹp luôn đến đúng lúc, đúng cách, đúng người.", rarity: "rare", weight: 18 },
    { id: "joyful", emoji: "💐", title: "Hạnh phúc", text: "Nụ cười hôm nay sẽ kéo dài thật lâu và kéo sang cả những người xung quanh nhéeee.", rarity: "common", weight: 30 },
    { id: "crown", emoji: "👑", title: "Legendary", text: "Bạn chính là phiên bản giới hạn: luôn tự tin, luôn xịn, luôn là nhân vật chính!", rarity: "legendary", weight: 6 },
  ],
  gardenDailyLimit: 3,
  gardenStorageKey: "wishGardenState_v2",
  typeSpeed: 28,
};

let currentGirl = null;
let typingTimer = null;
let musicOn = false;
let previousScreen = 1;
let giftStep = 0;
let stageParallaxBound = false;
let floatingTimers = [];
let gardenState = null;

const rand = (min, max) => Math.random() * (max - min) + min;
const isMobile = () => window.matchMedia("(max-width: 820px)").matches;


const todayStamp = () => new Date().toISOString().slice(0, 10);

const defaultGardenState = () => ({
  day: todayStamp(),
  openedToday: 0,
  streak: 0,
  lastDrawDay: "",
  revealedIds: [],
  drawHistory: [],
  rareHits: 0,
});

function loadGardenState() {
  try {
    const raw = localStorage.getItem(CONFIG.gardenStorageKey);
    if (!raw) return defaultGardenState();
    const parsed = JSON.parse(raw);
    return { ...defaultGardenState(), ...parsed };
  } catch {
    return defaultGardenState();
  }
}

function saveGardenState() {
  if (!gardenState) return;
  localStorage.setItem(CONFIG.gardenStorageKey, JSON.stringify(gardenState));
}

function refreshGardenDay() {
  const today = todayStamp();
  if (gardenState.day === today) return;
  gardenState.day = today;
  gardenState.openedToday = 0;
  gardenState.revealedIds = [];
}

function updateGardenMeta() {
  if (!gardenState) return;
  const daily = $("#wishDailyCount");
  const streak = $("#wishStreak");
  const rare = $("#wishRareCount");
  if (daily) daily.textContent = `${gardenState.openedToday}/${CONFIG.gardenDailyLimit}`;
  if (streak) streak.textContent = `${gardenState.streak} ngày`;
  if (rare) rare.textContent = String(gardenState.rareHits);
}

function updateGardenTip(message = "") {
  const tip = $("#gardenTip");
  if (!tip) return;
  tip.textContent = message || `Mỗi ngày bạn có thể mở tối đa ${CONFIG.gardenDailyLimit} bông hoa ✨`;
}

function drawWishFromPool() {
  const unrevealed = CONFIG.wishPool.filter((wish) => !gardenState.revealedIds.includes(wish.id));
  const pool = unrevealed.length ? unrevealed : CONFIG.wishPool;
  const total = pool.reduce((sum, wish) => sum + wish.weight, 0);
  let pick = rand(0, total);
  for (const wish of pool) {
    pick -= wish.weight;
    if (pick <= 0) return wish;
  }
  return pool[pool.length - 1];
}

function cardMessageByRarity(rarity) {
  if (rarity === "legendary") return "Trúng hoa legendary! 💥";
  if (rarity === "rare") return "Một điều ước hiếm vừa nở ✨";
  return "Một bông hoa tích cực cho hôm nay 🌸";
}

function showScreen(n) {
  $$(".screen").forEach((sec) => {
    const active = sec.dataset.screen === String(n);
    sec.classList.toggle("active", active);
    sec.setAttribute("aria-hidden", active ? "false" : "true");
  });
}

function setTheme(mode) {
  const now = new Date().getHours();
  const auto = now >= 19 || now < 5 ? "night" : now < 12 ? "morning" : "afternoon";
  const theme = mode === "auto" ? auto : mode;
  document.body.dataset.theme = theme;
  localStorage.setItem("themeMode", mode);
  $$(".theme-icon").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.themeMode === mode));
}

function spawnFloating(icon, container, cls, dur) {
  const el = document.createElement("div");
  el.className = cls;
  el.textContent = icon();
  el.style.left = `${rand(0, 100)}vw`;
  el.style.bottom = "-20px";
  el.style.fontSize = `${rand(12, 24)}px`;
  el.style.setProperty("--drift", `${rand(-60, 60)}px`);
  el.style.animationDuration = `${rand(...dur)}s`;
  container.appendChild(el);
  setTimeout(() => el.remove(), 18000);
}

function spawnConfettiBurst(count = 30, x = 50, y = 55) {
  const layer = $("#confettiLayer");
  for (let i = 0; i < count; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.style.left = `${x + rand(-8, 8)}%`;
    c.style.top = `${y + rand(-5, 5)}%`;
    c.style.background = `hsl(${rand(0, 360)}deg 95% 68%)`;
    c.style.setProperty("--dx", `${rand(-180, 180)}px`);
    c.style.setProperty("--dy", `${rand(-220, 100)}px`);
    c.style.animationDuration = `${rand(1.2, 2.3)}s`;
    layer.appendChild(c);
    setTimeout(() => c.remove(), 2400);
  }
}

function createPhoto(imgSrc, slot, photoClass = "photo") {
  const wrap = document.createElement("div");
  wrap.className = photoClass;
  Object.assign(wrap.style, {
    left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}px`, height: `${slot.h}px`, transform: `translateZ(${Math.round(rand(8, 60))}px) rotate(${slot.r}deg)`,
  });
  wrap.style.setProperty("--photo-url", `url('${imgSrc}')`);
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = `${currentGirl?.name ?? "photo"} photo`;
  img.loading = "lazy";
  wrap.appendChild(img);
  return wrap;
}

function loadGallery() {
  const g = $("#gallery");
  const gBg = $("#galleryBg");
  if (!g || !gBg || !currentGirl) return;
  g.innerHTML = "";
  gBg.innerHTML = "";
  const layout = isMobile() ? CONFIG.layouts.mobile : CONFIG.layouts.desktop;
  const isPhone = isMobile();
  const bgDensity = isPhone ? 0.25 : 0.7;
  layout.forEach((slot, idx) => {
    const wrap = createPhoto(currentGirl.images[idx % currentGirl.images.length], slot);
    if (!isPhone) {
      wrap.addEventListener("mousemove", (e) => {
        const r = wrap.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        wrap.style.transform = `translateZ(40px) rotate(${slot.r}deg) rotateY(${dx * 10}deg) rotateX(${(-dy) * 10}deg)`;
      });
      wrap.addEventListener("mouseleave", () => (wrap.style.transform = `translateZ(${Math.round(rand(8, 60))}px) rotate(${slot.r}deg)`));
    }
    g.appendChild(wrap);
  });
  const bgSlots = [...layout, ...layout.slice(0, Math.ceil(layout.length * bgDensity))];
  bgSlots.forEach((slot, idx) => {
    const drift = {
      ...slot,
      x: Math.max(0, Math.min(84, slot.x + rand(-8, 8))),
      y: Math.max(0, Math.min(82, slot.y + rand(-10, 10))),
      w: Math.round(slot.w * rand(0.92, 1.12)),
      h: Math.round(slot.h * rand(0.9, 1.1)),
      r: slot.r + rand(-6, 6),
    };
    gBg.appendChild(createPhoto(currentGirl.images[(idx + 1) % currentGirl.images.length], drift, "photo photo--bg"));
  });
}

function setupStageParallax() {
  const stage = $(".stage");
  const gallery = $("#gallery");
  const galleryBg = $("#galleryBg");
  if (!stage || !gallery || !galleryBg || stageParallaxBound) return;
  stageParallaxBound = true;

  const resetTransform = () => { gallery.style.transform = "none"; galleryBg.style.transform = "none"; };
  let raf = null;
  const applyTilt = (x, y) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      gallery.style.transform = `rotateY(${x * 10}deg) rotateX(${(-y) * 10}deg) scale(1.01)`;
      galleryBg.style.transform = `rotateY(${x * 6}deg) rotateX(${(-y) * 6}deg) scale(1.02)`;
    });
  };

  stage.addEventListener("mousemove", (e) => {
    if (isMobile()) return;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    applyTilt(x, y);
  });
  stage.addEventListener("mouseleave", resetTransform);

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
      if (!isMobile() || !$(".screen-2")?.classList.contains("active")) return;
      const gamma = Math.max(-35, Math.min(35, e.gamma ?? 0));
      const beta = Math.max(-35, Math.min(35, e.beta ?? 0));
      applyTilt(gamma / 35, (beta - 8) / 35);
    }, { passive: true });
  }

  stage.addEventListener("touchend", () => isMobile() && setTimeout(resetTransform, 120));
}

function stopTyping() { if (typingTimer) clearTimeout(typingTimer); typingTimer = null; }
function typeWriter(text, el, speed) {
  stopTyping();
  el.textContent = "";
  let i = 0;
  const tick = () => {
    el.textContent += text[i] ?? "";
    i += 1;
    if (i < text.length) typingTimer = setTimeout(tick, speed);
  };
  tick();
}

function setMusic(on) {
  const audio = $("#bgm");
  if (!audio) return;
  if (on) {
    audio.volume = 0.35;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          musicOn = true;
          $("#toggleMusic")?.classList.add("is-on");
        })
        .catch(() => {
          musicOn = false;
          $("#toggleMusic")?.classList.remove("is-on");
        });
      return;
    }
    musicOn = true;
  } else {
    audio.pause();
    musicOn = false;
  }
  $("#toggleMusic")?.classList.toggle("is-on", on);
}

function setupAutoplayRetry() {
  const resume = () => {
    if (!musicOn) setMusic(true);
    if (musicOn) {
      ["pointerdown", "touchstart", "keydown", "visibilitychange"].forEach((evt) => {
        document.removeEventListener(evt, resume);
      });
    }
  };
  ["pointerdown", "touchstart", "keydown", "visibilitychange"].forEach((evt) => {
    document.addEventListener(evt, resume, { passive: true });
  });
}

function setupFloatingEffects() {
  floatingTimers.forEach((timer) => clearInterval(timer));
  floatingTimers = [];
  const lowPower = isMobile();
  const recipes = [
    { icon: () => (Math.random() > 0.35 ? "💗" : "💖"), target: "#hearts", className: "heart", duration: lowPower ? [7.2, 12.5] : [6.5, 11.5], interval: lowPower ? 1300 : 620 },
    { icon: () => "", target: "#petals", className: "petal", duration: lowPower ? [9.2, 15.5] : [7.5, 14], interval: lowPower ? 1800 : 900 },
    { icon: () => (Math.random() > 0.5 ? "🌸" : "🌺"), target: "#flowers", className: "flower", duration: lowPower ? [10.5, 17] : [9, 16], interval: lowPower ? 2200 : 1300 },
  ];
  recipes.forEach((recipe) => {
    const layer = $(recipe.target);
    if (!layer) return;
    const timer = setInterval(() => spawnFloating(recipe.icon, layer, recipe.className, recipe.duration), recipe.interval);
    floatingTimers.push(timer);
  });
}

function openEnvelopeAndType() {
  const env = $("#envelope");
  const typing = $("#typing");
  const text = document.getElementById("signatureText");
const length = text.getComputedTextLength();
text.style.strokeDasharray = length;
text.style.strokeDashoffset = length;
  if (!env || !typing || !currentGirl) return;
  env.classList.add("open");
  $("#signatureSvg")?.classList.remove("draw");
  requestAnimationFrame(() => $("#signatureSvg")?.classList.add("draw"));
  typeWriter(currentGirl.letter, typing, CONFIG.typeSpeed);
  spawnConfettiBurst(28);
  for (let i = 0; i < 15; i++) setTimeout(() => spawnFloating(() => (Math.random() > 0.3 ? "💗" : "💖"), $("#hearts"), "heart", [5.2, 8.4]), i * 80);
}

function startGiftSequence() {
  giftStep = 1;
  const seq = $("#giftSequence");
  $("#giftBox")?.classList.remove("open");
  $("#giftText").textContent = "Bấm lần nữa để mở quà nha ✨";
  seq.classList.add("active");
  seq.setAttribute("aria-hidden", "false");
  spawnConfettiBurst(24, 50, 50);
}

function finishGiftSequence() {
  giftStep = 0;
  const seq = $("#giftSequence");
  seq.classList.remove("active");
  seq.setAttribute("aria-hidden", "true");
  $("#girlNameLetter").textContent = currentGirl.name;
  $("#girlNameTo").textContent = currentGirl.name;
  $("#envelope")?.classList.remove("open");
  $("#typing").textContent = "";
  showScreen(3);
  setTimeout(openEnvelopeAndType, 400);
}

function handleGiftTap() {
  if (giftStep === 1) {
    giftStep = 2;
    $("#giftBox")?.classList.add("open");
    $("#giftText").textContent = "Wowww! Quà bung rồi 💥";
    spawnConfettiBurst(55, 50, 45);
    setTimeout(() => spawnConfettiBurst(36, 30, 32), 180);
    setTimeout(() => spawnConfettiBurst(36, 70, 28), 280);
    setTimeout(() => spawnConfettiBurst(42, 52, 22), 420);
    setTimeout(finishGiftSequence, 900);
  }
}

function renderWishCards(lastWishId = "") {
  const target = $("#wishGrid");
  if (!target || !gardenState) return;
  target.innerHTML = "";

  CONFIG.wishPool.forEach((wish) => {
    const card = document.createElement("button");
    const revealed = gardenState.revealedIds.includes(wish.id);
    card.className = `wish-card ${revealed ? "revealed" : ""}`;
    card.dataset.rarity = wish.rarity;
    card.dataset.id = wish.id;
    card.type = "button";
    card.setAttribute("aria-pressed", revealed ? "true" : "false");
    card.innerHTML = `<div class="wish-badge">${wish.rarity}</div><div class="wish-emoji">${wish.emoji}</div><div class="wish-title">${wish.title}</div><div class="wish-text">${wish.text}</div>`;
    card.addEventListener("click", () => {
      if (!card.classList.contains("revealed")) {
        updateGardenTip("Bấm nút 'Nhận điều ước ngẫu nhiên' để mở hoa nha ✨");
        return;
      }
      card.classList.toggle("focus");
    });
    if (lastWishId && lastWishId === wish.id) {
      card.classList.add("just-unlocked");
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    target.appendChild(card);
  });
  updateGardenMeta();
}

function handleWishDraw() {
  if (!gardenState) return;
  refreshGardenDay();

  if (gardenState.openedToday >= CONFIG.gardenDailyLimit) {
    updateGardenTip("Bạn đã mở đủ quota hôm nay rồi. Mai quay lại nhận hoa mới nha 🌙");
    updateGardenMeta();
    return;
  }

  const wish = drawWishFromPool();
  const isFirstOpenToday = gardenState.openedToday === 0;
  gardenState.openedToday += 1;
  if (!gardenState.revealedIds.includes(wish.id)) gardenState.revealedIds.push(wish.id);
  gardenState.drawHistory = [wish.id, ...gardenState.drawHistory].slice(0, 20);
  if (wish.rarity !== "common") gardenState.rareHits += 1;

  const today = todayStamp();
  if (isFirstOpenToday) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    gardenState.streak = gardenState.lastDrawDay === yesterday ? gardenState.streak + 1 : 1;
    gardenState.lastDrawDay = today;
  }

  saveGardenState();
  renderWishCards(wish.id);

  const burst = wish.rarity === "legendary" ? 70 : wish.rarity === "rare" ? 44 : 28;
  spawnConfettiBurst(burst, rand(30, 70), rand(34, 54));
  updateGardenTip(`${cardMessageByRarity(wish.rarity)} (${gardenState.openedToday}/${CONFIG.gardenDailyLimit})`);
}

function resetGardenProgress() {
  gardenState = defaultGardenState();
  saveGardenState();
  renderWishCards();
  updateGardenTip("Đã reset vườn điều ước. Bắt đầu lại từ đầu nha 🌱");
}

function renderHeroBelts() {
  const left = $("#heroBeltLeft");
  const right = $("#heroBeltRight");
  if (!left || !right) return;
  const allImages = [...CONFIG.girls.Dung.images, ...CONFIG.girls.ha.images];
  const build = (target, offset = 0) => {
    target.innerHTML = "";
    const seq = allImages.slice(offset).concat(allImages.slice(0, offset));
    for (let clone = 0; clone < 2; clone++) {
      const track = document.createElement("div");
      track.className = "belt-track";
      seq.forEach((src, idx) => {
        const item = document.createElement("div");
        item.className = "belt-item";
        item.innerHTML = `<img src="${src}" alt="Kỷ niệm ${idx + 1}" loading="lazy"/>`;
        track.appendChild(item);
      });
      target.appendChild(track);
    }
  };
  build(left, 0); build(right, Math.floor(allImages.length / 2));
}

function openGarden(fromScreen = 1) {
  previousScreen = fromScreen;
  $("#gardenName").textContent = currentGirl?.name ?? "Bạn";
  refreshGardenDay();
  renderWishCards();
  showScreen(4);
}

function syncStageHint() {
  const hint = $(".stage-hint");
  if (!hint) return;
  hint.textContent = isMobile() ? "Nghiêng điện thoại để xoay ảnh 3D ✨" : "Di chuột để cảm nhận “không gian” ✨";
}

function init() {
  renderHeroBelts();
  syncStageHint();
  gardenState = loadGardenState();
  refreshGardenDay();
  saveGardenState();
  const savedTheme = localStorage.getItem("themeMode") || "auto";
  setTheme(savedTheme);
  $$(".theme-icon").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.themeMode === savedTheme);
    btn.addEventListener("click", () => setTheme(btn.dataset.themeMode));
  });

  setupFloatingEffects();

  $$(".choice-btn").forEach((btn) => btn.addEventListener("click", () => {
    currentGirl = CONFIG.girls[btn.dataset.girl];
    $("#girlNameTop").textContent = currentGirl.name;
    showScreen(2); loadGallery(); setupStageParallax();
  }));

  $("#openGardenFromHero").addEventListener("click", () => openGarden(1));
  $("#openGardenBtn").addEventListener("click", () => openGarden(2));
  $("#backFromGarden").addEventListener("click", () => showScreen(previousScreen));
  $("#backTo1").addEventListener("click", () => { stopTyping(); showScreen(1); });
  $("#backTo2").addEventListener("click", () => { stopTyping(); $("#envelope")?.classList.remove("open"); $("#typing").textContent = ""; showScreen(2); });
  $("#toggleMusic")?.addEventListener("click", () => setMusic(!musicOn));
  $("#openLetterBtn").addEventListener("click", () => currentGirl && startGiftSequence());
  $("#giftBox").addEventListener("click", handleGiftTap);
  $("#giftBox").addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && handleGiftTap());
  $("#againBtn").addEventListener("click", () => { stopTyping(); $("#envelope")?.classList.remove("open"); $("#typing").textContent = ""; showScreen(2); });
  $("#drawWishBtn")?.addEventListener("click", handleWishDraw);
  $("#resetGardenBtn")?.addEventListener("click", resetGardenProgress);
  window.addEventListener("resize", () => {
    syncStageHint();
    setupFloatingEffects();
    if (currentGirl && $(".screen-2").classList.contains("active")) loadGallery();
  });

  setMusic(true);
  setupAutoplayRetry();
}

init();
