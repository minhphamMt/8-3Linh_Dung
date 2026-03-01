const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const CONFIG = {
  fromName: "Minh",
  girls: {
    Dung: {
      name: "Dung",
      images: [
        "./assets/Linh/Linh1.png",
        "./assets/Linh/Linh2.png",
        "./assets/Linh/Linh3.png",
        "./assets/Linh/Linh4.png",
        "./assets/Linh/Linh5.png",
      ],
      letter: [
        "Dung à,",
        "",
        "Chúc em một ngày 8/3 thật dịu dàng và rực rỡ 🌸",
        "Mong em luôn vui vẻ, được yêu thương đúng cách,",
        "luôn tự tin toả sáng theo cách của riêng mình.",
        "",
        "Cảm ơn em vì đã xuất hiện và làm cho mọi thứ trở nên mềm mại hơn.",
        "Nếu mệt, cứ chậm lại một chút… rồi lại bước tiếp nha 💗",
        "",
        "Chúc em luôn hạnh phúc!",
      ].join("\n"),
    },
    ha: {
      name: "Linh",
      images: [
        "./assets/Dung/Dung1.png",
        "./assets/Dung/Dung2.png",
        "./assets/Dung/Dung3.png",
        "./assets/Dung/Dung4.png",
        "./assets/Dung/Dung5.png",
      ],
      letter: [
        "Linh yêu,",
        "",
        "Nhân ngày 8/3, chúc em luôn xinh đẹp,",
        "tươi tắn như những bông hoa mùa xuân 🌷",
        "",
        "Mong em có thật nhiều niềm vui,",
        "gặp toàn điều tử tế và những người trân trọng em.",
        "",
        "Hôm nay và cả những ngày sau nữa,",
        "em xứng đáng được nâng niu và yêu thương thật nhiều 💞",
        "",
        "Chúc em 8/3 thật hạnh phúc!",
      ].join("\n"),
    },
  },
  layoutDesktop: [
    { x: 10, y: 18, w: 190, h: 250, r: -6 },
    { x: 28, y: 8, w: 220, h: 160, r: 4 },
    { x: 66, y: 10, w: 210, h: 240, r: 8 },
    { x: 78, y: 42, w: 180, h: 220, r: -8 },
    { x: 16, y: 52, w: 240, h: 170, r: 10 },
    { x: 40, y: 62, w: 210, h: 230, r: -4 },
    { x: 56, y: 44, w: 160, h: 150, r: 6 },
    { x: 6, y: 36, w: 170, h: 160, r: -10 },
  ],
  layoutDesktopBg: [
    { x: -5, y: -6, w: 200, h: 160, r: -10 },
    { x: 22, y: -8, w: 180, h: 150, r: 8 },
    { x: 72, y: -5, w: 210, h: 170, r: -6 },
    { x: 88, y: 14, w: 170, h: 210, r: 10 },
    { x: 84, y: 62, w: 190, h: 180, r: -9 },
    { x: 62, y: 82, w: 180, h: 150, r: 6 },
    { x: 22, y: 82, w: 200, h: 160, r: -5 },
    { x: -8, y: 70, w: 180, h: 190, r: 9 },
    { x: -10, y: 30, w: 170, h: 180, r: -8 },
  ],
  layoutMobile: [
    { x: 8, y: 14, w: 148, h: 192, r: -6 },
    { x: 56, y: 12, w: 156, h: 116, r: 6 },
    { x: 60, y: 34, w: 148, h: 186, r: 10 },
    { x: 8, y: 40, w: 164, h: 130, r: -8 },
    { x: 18, y: 62, w: 168, h: 184, r: 8 },
    { x: 58, y: 64, w: 138, h: 148, r: -4 },
  ],
  layoutMobileBg: [
    { x: -8, y: -6, w: 136, h: 104, r: -10 },
    { x: 34, y: -6, w: 130, h: 106, r: 8 },
    { x: 74, y: 0, w: 130, h: 96, r: -8 },
    { x: 84, y: 28, w: 124, h: 146, r: 8 },
    { x: 86, y: 68, w: 122, h: 118, r: -6 },
    { x: 66, y: 88, w: 126, h: 96, r: 6 },
    { x: 30, y: 88, w: 128, h: 104, r: -4 },
    { x: -8, y: 78, w: 126, h: 132, r: 10 },
    { x: -10, y: 38, w: 128, h: 126, r: -8 },
  ],
  wishes: [
    { emoji: "🌸", title: "Rạng rỡ", text: "Mỗi ngày bạn đều có năng lượng tích cực và tỏa sáng theo cách rất riêng." },
    { emoji: "💖", title: "Được yêu thương", text: "Bạn luôn gặp những người tử tế, biết trân trọng và nâng niu bạn." },
    { emoji: "🌷", title: "Bình yên", text: "Lịch trình bận rộn vẫn có những khoảng lặng thật dễ chịu dành cho bạn." },
    { emoji: "🫶", title: "Can đảm", text: "Mọi mục tiêu bạn theo đuổi đều có đủ kiên định và may mắn để tLinhnh công." },
    { emoji: "✨", title: "May mắn", text: "Điều tốt đẹp luôn đến đúng lúc, đúng cách, đúng người." },
    { emoji: "💐", title: "Hạnh phúc", text: "Nụ cười hôm nay sẽ kéo dài thật lâu và Dung sang cả những người xung quanh." },
  ],
  typeSpeed: 28,
};

let currentGirl = null;
let typingTimer = null;
let musicOn = false;
let previousScreen = 1;

function showScreen(n) {
  $$(".screen").forEach((sec) => {
    const active = sec.dataset.screen === String(n);
    sec.classList.toggle("active", active);
    sec.setAttribute("aria-hidden", active ? "false" : "true");
  });
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnHeart() {
  const el = document.createElement("div");
  el.className = "heart";
  el.textContent = Math.random() > 0.35 ? "💗" : "💖";
  el.style.left = `${rand(0, 100)}vw`;
  el.style.bottom = "-20px";
  el.style.fontSize = `${rand(14, 24)}px`;
  el.style.setProperty("--drift", `${rand(-60, 60)}px`);
  el.style.animationDuration = `${rand(6.5, 11.5)}s`;
  $("#hearts").appendChild(el);
  setTimeout(() => el.remove(), 12000);
}

function spawnPetal() {
  const el = document.createElement("div");
  el.className = "petal";
  el.style.left = `${rand(0, 100)}vw`;
  el.style.top = "-30px";
  el.style.setProperty("--drift", `${rand(-80, 80)}px`);
  el.style.animationDuration = `${rand(7.5, 14)}s`;
  el.style.transform = `rotate(${rand(0, 360)}deg)`;
  $("#petals").appendChild(el);
  setTimeout(() => el.remove(), 16000);
}

function spawnFlower() {
  const el = document.createElement("div");
  el.className = "flower";
  el.textContent = Math.random() > 0.5 ? "🌸" : "🌺";
  el.style.left = `${rand(0, 100)}vw`;
  el.style.bottom = "-14px";
  el.style.fontSize = `${rand(12, 18)}px`;
  el.style.setProperty("--drift", `${rand(-40, 40)}px`);
  el.style.animationDuration = `${rand(9, 16)}s`;
  $("#flowers").appendChild(el);
  setTimeout(() => el.remove(), 17000);
}

setInterval(spawnHeart, 620);
setInterval(spawnPetal, 900);
setInterval(spawnFlower, 1300);

function isMobile() {
  return window.matchMedia("(max-width: 820px)").matches;
}

function createPhoto(imgSrc, slot, photoClass = "photo") {
  const wrap = document.createElement("div");
  wrap.className = photoClass;
  wrap.style.left = `${slot.x}%`;
  wrap.style.top = `${slot.y}%`;
  wrap.style.width = `${slot.w}px`;
  wrap.style.height = `${slot.h}px`;
  wrap.style.transform = `translateZ(${Math.round(rand(8, 60))}px) rotate(${slot.r}deg)`;

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = `${currentGirl.name} photo`;
  img.loading = "lazy";

  wrap.appendChild(img);
  return wrap;
}

function loadGallery() {
  const g = $("#gallery");
  const gBg = $("#galleryBg");
  g.innerHTML = "";
  gBg.innerHTML = "";

  const layout = isMobile() ? CONFIG.layoutMobile : CONFIG.layoutDesktop;
  const layoutBg = isMobile() ? CONFIG.layoutMobileBg : CONFIG.layoutDesktopBg;
  const imgs = currentGirl.images;

  layout.forEach((slot, idx) => {
    const imgSrc = imgs[idx % imgs.length];
    const wrap = createPhoto(imgSrc, slot);

    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      wrap.style.transform = `translateZ(40px) rotate(${slot.r}deg) rotateY(${dx * 10}deg) rotateX(${(-dy) * 10}deg)`;
    });
    wrap.addEventListener("mouseleave", () => {
      wrap.style.transform = `translateZ(${Math.round(rand(8, 60))}px) rotate(${slot.r}deg)`;
    });

    g.appendChild(wrap);
  });

  layoutBg.forEach((slot, idx) => {
    const imgSrc = imgs[(idx + 1) % imgs.length];
    const wrap = createPhoto(imgSrc, slot, "photo photo--bg");
    gBg.appendChild(wrap);
  });
}

function setupStageParallax() {
  const stage = $(".stage");
  const gallery = $("#gallery");
  const galleryBg = $("#galleryBg");
  if (!stage || !gallery || !galleryBg) return;

  stage.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gallery.style.transform = `rotateY(${x * 10}deg) rotateX(${(-y) * 10}deg) scale(1.01)`;
    galleryBg.style.transform = `rotateY(${x * 6}deg) rotateX(${(-y) * 6}deg) scale(1.02)`;
  });

  stage.addEventListener("mouseleave", () => {
    gallery.style.transform = "none";
    galleryBg.style.transform = "none";
  });
}

function stopTyping() {
  if (typingTimer) clearTimeout(typingTimer);
  typingTimer = null;
}

function typeWriter(text, el, speed) {
  stopTyping();
  el.textContent = "";
  let i = 0;

  const tick = () => {
    el.textContent += text[i] ?? "";
    i++;
    if (i < text.length) {
      typingTimer = setTimeout(tick, speed);
    }
  };
  tick();
}

function setMusic(on) {
  const audio = $("#bgm");
  musicOn = on;
  if (!audio) return;

  if (on) {
    audio.volume = 0.35;
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }

  $("#toggleMusic")?.classList.toggle("is-on", on);
}

function openEnvelopeAndType() {
  const env = $("#envelope");
  const typing = $("#typing");
  if (!env || !typing || !currentGirl) return;

  env.classList.add("open");
  typeWriter(currentGirl.letter, typing, CONFIG.typeSpeed);
}

function renderWishCards() {
  const target = $("#wishGrid");
  target.innerHTML = "";

  CONFIG.wishes.forEach((wish) => {
    const card = document.createElement("button");
    card.className = "wish-card";
    card.innerHTML = `
      <div class="wish-emoji">${wish.emoji}</div>
      <div class="wish-title">${wish.title}</div>
      <div class="wish-text">${wish.text}</div>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("revealed");
    });

    target.appendChild(card);
  });
}

function openGarden(fromScreen = 1) {
  previousScreen = fromScreen;
  $("#gardenName").textContent = currentGirl?.name ?? "Bạn";
  renderWishCards();
  showScreen(4);
}

function init() {
  $("#fromName").textContent = CONFIG.fromName;

  $$(".choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.girl;
      currentGirl = CONFIG.girls[key];
      $("#girlNameTop").textContent = currentGirl.name;
      showScreen(2);
      loadGallery();
      setupStageParallax();
    });
  });

  $("#openGardenFromHero").addEventListener("click", () => openGarden(1));
  $("#openGardenBtn").addEventListener("click", () => openGarden(2));

  $("#backFromGarden").addEventListener("click", () => {
    showScreen(previousScreen);
  });

  $("#backTo1").addEventListener("click", () => {
    stopTyping();
    showScreen(1);
  });

  $("#backTo2").addEventListener("click", () => {
    stopTyping();
    $("#envelope")?.classList.remove("open");
    $("#typing").textContent = "";
    showScreen(2);
  });

  $("#toggleMusic").addEventListener("click", () => setMusic(!musicOn));

  $("#openLetterBtn").addEventListener("click", () => {
    if (!currentGirl) return;

    $("#girlNameLetter").textContent = currentGirl.name;
    $("#girlNameTo").textContent = currentGirl.name;

    $("#envelope")?.classList.remove("open");
    $("#typing").textContent = "";

    showScreen(3);
    setTimeout(openEnvelopeAndType, 450);
  });

  $("#againBtn").addEventListener("click", () => {
    stopTyping();
    $("#envelope")?.classList.remove("open");
    $("#typing").textContent = "";
    showScreen(2);
  });

  window.addEventListener("resize", () => {
    if (currentGirl && $(".screen-2").classList.contains("active")) {
      loadGallery();
    }
  });
}

init();
