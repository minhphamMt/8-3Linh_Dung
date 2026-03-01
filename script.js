const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const CONFIG = {
  girls: {
    Dung: {
      name: "Linh",
      images: ["./assets/Linh/Linh1.png", "./assets/Linh/linh2.png", "./assets/Linh/Linh3.png", "./assets/Linh/Linh4.png", "./assets/Linh/Linh5.png"],
      letter: [
        "Linh ơi,", "", "Chúc bạn có ngày 8/3 vui như trúng sale 90% mà vẫn còn đúng size 🌸", "Tuổi mới của nhan sắc (à quên, ngày mới của nhan sắc) luôn ổn áp,",
        "chụp góc nào cũng đẹp và cười phát là cả team có năng lượng.", "", "Cảm ơn Linh vì lúc nào cũng hòa đồng, nhiệt tình và nói chuyện siêu cuốn.",
        "Nếu có hôm nào mệt thì cứ nghỉ xíu, để mai mình bung lụa tiếp nha 💗", "", "Chúc Linh luôn vui, khỏe, nhiều may mắn và ví tiền luôn không 'tụt mood'!",
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
      { x: 6, y: 9, w: 176, h: 214, r: -7 }, { x: 29, y: 8, w: 198, h: 144, r: 4 }, { x: 61, y: 8, w: 184, h: 216, r: 6 },
      { x: 78, y: 40, w: 166, h: 208, r: -7 }, { x: 11, y: 48, w: 208, h: 148, r: 8 }, { x: 34, y: 60, w: 192, h: 204, r: -4 },
    ],
    mobile: [
      { x: 7, y: 10, w: 128, h: 162, r: -6 }, { x: 55, y: 10, w: 132, h: 98, r: 6 }, { x: 55, y: 32, w: 130, h: 162, r: 8 },
      { x: 9, y: 34, w: 136, h: 106, r: -7 }, { x: 15, y: 58, w: 140, h: 162, r: 6 }, { x: 57, y: 58, w: 124, h: 132, r: -3 },
    ],
  },
  wishes: [
    { emoji: "🌸", title: "Rạng rỡ", text: "Mỗi ngày bạn đều có năng lượng tích cực và tỏa sáng theo cách rất riêng." },
    { emoji: "💖", title: "Được yêu thương", text: "Bạn luôn gặp những người tử tế, biết trân trọng và nâng niu bạn." },
    { emoji: "🌷", title: "Bình yên", text: "Lịch trình bận rộn vẫn có những khoảng lặng thật dễ chịu dành cho bạn." },
    { emoji: "🫶", title: "Can đảm", text: "Mọi mục tiêu bạn theo đuổi đều có đủ kiên định và may mắn để đạt được thành công." },
    { emoji: "✨", title: "May mắn", text: "Điều tốt đẹp luôn đến đúng lúc, đúng cách, đúng người." },
    { emoji: "💐", title: "Hạnh phúc", text: "Nụ cười hôm nay sẽ kéo dài thật lâu và kéo sang cả những người xung quanh nhéeee." },
  ],
  typeSpeed: 28,
};

let currentGirl = null;
let typingTimer = null;
let musicOn = false;
let previousScreen = 1;
let giftStep = 0;

const rand = (min, max) => Math.random() * (max - min) + min;
const isMobile = () => window.matchMedia("(max-width: 820px)").matches;

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
  layout.forEach((slot, idx) => {
    const wrap = createPhoto(currentGirl.images[idx % currentGirl.images.length], slot);
    wrap.addEventListener("mousemove", (e) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      wrap.style.transform = `translateZ(40px) rotate(${slot.r}deg) rotateY(${dx * 10}deg) rotateX(${(-dy) * 10}deg)`;
    });
    wrap.addEventListener("mouseleave", () => (wrap.style.transform = `translateZ(${Math.round(rand(8, 60))}px) rotate(${slot.r}deg)`));
    g.appendChild(wrap);
  });
  layout.forEach((slot, idx) => gBg.appendChild(createPhoto(currentGirl.images[(idx + 1) % currentGirl.images.length], slot, "photo photo--bg")));
}

function setupStageParallax() {
  const stage = $(".stage");
  const gallery = $("#gallery");
  const galleryBg = $("#galleryBg");
  if (!stage || !gallery || !galleryBg) return;
  stage.addEventListener("mousemove", (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gallery.style.transform = `rotateY(${x * 10}deg) rotateX(${(-y) * 10}deg) scale(1.01)`;
    galleryBg.style.transform = `rotateY(${x * 6}deg) rotateX(${(-y) * 6}deg) scale(1.02)`;
  });
  stage.addEventListener("mouseleave", () => { gallery.style.transform = "none"; galleryBg.style.transform = "none"; });
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
  musicOn = on;
  if (!audio) return;
  if (on) { audio.volume = 0.35; audio.play().catch(() => {}); } else { audio.pause(); }
  $("#toggleMusic")?.classList.toggle("is-on", on);
}

function openEnvelopeAndType() {
  const env = $("#envelope");
  const typing = $("#typing");
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
    setTimeout(finishGiftSequence, 900);
  }
}

function renderWishCards() {
  const target = $("#wishGrid");
  target.innerHTML = "";
  CONFIG.wishes.forEach((wish) => {
    const card = document.createElement("button");
    card.className = "wish-card";
    card.innerHTML = `<div class="wish-emoji">${wish.emoji}</div><div class="wish-title">${wish.title}</div><div class="wish-text">${wish.text}</div>`;
    card.addEventListener("click", () => card.classList.toggle("revealed"));
    target.appendChild(card);
  });
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

function openGarden(fromScreen = 1) { previousScreen = fromScreen; $("#gardenName").textContent = currentGirl?.name ?? "Bạn"; renderWishCards(); showScreen(4); }

function init() {
  renderHeroBelts();
  const savedTheme = localStorage.getItem("themeMode") || "auto";
  $("#themeSelect").value = savedTheme;
  setTheme(savedTheme);
  $("#themeSelect").addEventListener("change", (e) => setTheme(e.target.value));

  setInterval(() => spawnFloating(() => (Math.random() > 0.35 ? "💗" : "💖"), $("#hearts"), "heart", [6.5, 11.5]), 620);
  setInterval(() => spawnFloating(() => "", $("#petals"), "petal", [7.5, 14]), 900);
  setInterval(() => spawnFloating(() => (Math.random() > 0.5 ? "🌸" : "🌺"), $("#flowers"), "flower", [9, 16]), 1300);

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
  window.addEventListener("resize", () => currentGirl && $(".screen-2").classList.contains("active") && loadGallery());

  setMusic(true);
}

init();
