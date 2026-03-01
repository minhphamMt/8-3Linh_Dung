const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const CONFIG = {
  fromName: "Minh",
  girls: {
    Dung: {
      name: "Linh",
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
        "Chúc bạn có ngày 8/3 vui như trúng sale 90% mà vẫn còn đúng size 🌸",
        "Tuổi mới của nhan sắc (à quên, ngày mới của nhan sắc) luôn ổn áp,",
        "chụp góc nào cũng đẹp và cười phát là cả team có năng lượng.",
        "",
        "Cảm ơn Linh vì lúc nào cũng hòa đồng, nhiệt tình và nói chuyện siêu cuốn.",
        "Nếu có hôm nào mệt thì cứ nghỉ xíu, để mai mình bung lụa tiếp nha 💗",
        "",
        "Chúc Linh luôn vui, khỏe, nhiều may mắn và ví tiền luôn không 'tụt mood'!",
      ].join("\n"),
    },
    ha: {
      name: "Dung",
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
        "8/3 chúc bạn luôn rạng rỡ, vui vẻ và cười nhiều hơn cả số lần deadline dí 🌷",
        "Mong Dung ngày nào cũng có mood tốt, ảnh nào đăng lên cũng full tim.",
        "",
        "Chúc bạn gặp toàn chuyện dễ thương,",
        "đi đâu cũng có đồng bọn xịn, làm gì cũng thuận buồm xuôi gió.",
        "",
        "Cứ giữ nét hài hước và năng lượng tích cực như bây giờ nhé,",
        "vì đó là 'đặc sản' khiến ai chơi cùng cũng thấy vui lây 💞",
        "",
        "Chúc Dung 8/3 thiệt chill, thiệt vui và thiệt nhiều quà!",
      ].join("\n"),
    },
  },
  layoutDesktop: [
    { x: 6, y: 9, w: 176, h: 214, r: -7 },
    { x: 29, y: 8, w: 198, h: 144, r: 4 },
    { x: 61, y: 8, w: 184, h: 216, r: 6 },
    { x: 78, y: 40, w: 166, h: 208, r: -7 },
    { x: 11, y: 48, w: 208, h: 148, r: 8 },
    { x: 34, y: 60, w: 192, h: 204, r: -4 },
    { x: 54, y: 44, w: 150, h: 142, r: 5 },
    { x: 2, y: 30, w: 148, h: 150, r: -9 },
  ],
  layoutDesktopBg: [
    { x: -6, y: -8, w: 184, h: 142, r: -8 },
    { x: 20, y: -10, w: 164, h: 132, r: 7 },
    { x: 71, y: -8, w: 178, h: 142, r: -6 },
    { x: 88, y: 16, w: 152, h: 186, r: 9 },
    { x: 83, y: 63, w: 170, h: 154, r: -8 },
    { x: 61, y: 82, w: 164, h: 132, r: 6 },
    { x: 20, y: 84, w: 176, h: 142, r: -5 },
    { x: -10, y: 72, w: 158, h: 174, r: 8 },
    { x: -10, y: 30, w: 152, h: 162, r: -8 },
  ],
  layoutMobile: [
    { x: 7, y: 10, w: 128, h: 162, r: -6 },
    { x: 55, y: 10, w: 132, h: 98, r: 6 },
    { x: 55, y: 32, w: 130, h: 162, r: 8 },
    { x: 9, y: 34, w: 136, h: 106, r: -7 },
    { x: 15, y: 58, w: 140, h: 162, r: 6 },
    { x: 57, y: 58, w: 124, h: 132, r: -3 },
  ],
  layoutMobileBg: [
    { x: -8, y: -6, w: 114, h: 92, r: -8 },
    { x: 32, y: -7, w: 112, h: 92, r: 7 },
    { x: 73, y: -1, w: 112, h: 88, r: -7 },
    { x: 84, y: 26, w: 108, h: 126, r: 8 },
    { x: 85, y: 64, w: 106, h: 106, r: -6 },
    { x: 65, y: 83, w: 112, h: 86, r: 5 },
    { x: 31, y: 84, w: 114, h: 94, r: -4 },
    { x: -9, y: 74, w: 112, h: 122, r: 8 },
    { x: -10, y: 36, w: 112, h: 118, r: -8 },
  ],
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

function setupAutoMusic() {
  const audio = $("#bgm");
  if (!audio) return;

  const tryPlay = () => {
    setMusic(true);
  };

  tryPlay();

  const unlock = () => {
    if (!musicOn) {
      tryPlay();
    }
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };

  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
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


function renderHeroBelts() {
  const left = $("#heroBeltLeft");
  const right = $("#heroBeltRight");
  if (!left || !right) return;

  const allImages = [
    ...CONFIG.girls.Dung.images,
    ...CONFIG.girls.ha.images,
  ];

  const buildTrack = (target, offset = 0) => {
    target.innerHTML = "";
    const sequence = allImages.slice(offset).concat(allImages.slice(0, offset));

    for (let clone = 0; clone < 2; clone++) {
      const track = document.createElement("div");
      track.className = "belt-track";

      sequence.forEach((src, idx) => {
        const item = document.createElement("div");
        item.className = "belt-item";
        item.innerHTML = `<img src="${src}" alt="Kỷ niệm ${idx + 1}" loading="lazy" />`;
        track.appendChild(item);
      });

      target.appendChild(track);
    }
  };

  buildTrack(left, 0);
  buildTrack(right, Math.floor(allImages.length / 2));
}

function openGarden(fromScreen = 1) {
  previousScreen = fromScreen;
  $("#gardenName").textContent = currentGirl?.name ?? "Bạn";
  renderWishCards();
  showScreen(4);
}

function init() {
  $("#fromName").textContent = CONFIG.fromName;
  renderHeroBelts();

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

  $("#toggleMusic")?.addEventListener("click", () => setMusic(!musicOn));

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

  setupAutoMusic();
}

init();
