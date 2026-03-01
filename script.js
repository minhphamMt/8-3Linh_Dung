/* -------------------------------------------
   8/3 Frontend Project (no backend)
   - Screen 1: choose girl
   - Screen 2: 3D-ish gallery + center button
   - Screen 3: envelope + typewriter letter
-------------------------------------------- */

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// =====================
// CONFIG (Edit here)
// =====================
const CONFIG = {
  fromName: "Minh",
  girls: {
    lan: {
      name: "Lan",
      // Add as many images as you want
      images: [
        "./assets/Linh/Linh1.png",
        "./assets/Linh/Linh2.png",
        "./assets/Linh/Linh3.png",
        "./assets/Linh/Linh4.png",
        "./assets/Linh/Linh5.png",
      ],
      letter: [
        "Lan à,",
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
      name: "Hà",
      images: [
        "./assets/Dung/Dung1.png",
        "./assets/Dung/Dung2.png",
        "./assets/Dung/Dung3.png",
        "./assets/Dung/Dung4.png",
        "./assets/Dung/Dung5.png",
      ],
      letter: [
        "Hà yêu,",
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

  // gallery layout preset (desktop)
  // (x,y) in percentage of stage, w/h in px
  // You can tweak these for a different vibe.
  layoutDesktop: [
    { x: 10, y: 18, w: 190, h: 250, r: -6 },
    { x: 28, y: 8,  w: 220, h: 160, r: 4  },
    { x: 66, y: 10, w: 210, h: 240, r: 8  },
    { x: 78, y: 42, w: 180, h: 220, r: -8 },
    { x: 16, y: 52, w: 240, h: 170, r: 10 },
    { x: 40, y: 62, w: 210, h: 230, r: -4 },
    { x: 56, y: 44, w: 160, h: 150, r: 6  },
    { x: 6,  y: 36, w: 170, h: 160, r: -10 },
  ],

  // simplified layout for mobile (relative)
  layoutMobile: [
    { x: 10, y: 14, w: 150, h: 200, r: -6 },
    { x: 58, y: 12, w: 160, h: 120, r: 6  },
    { x: 60, y: 34, w: 150, h: 190, r: 10 },
    { x: 8,  y: 40, w: 165, h: 130, r: -8 },
    { x: 18, y: 60, w: 170, h: 190, r: 8  },
    { x: 58, y: 62, w: 140, h: 150, r: -4 },
  ],

  typeSpeed: 28, // typing speed (ms)
};

// =====================
// State
// =====================
let currentKey = null;
let currentGirl = null;
let typingTimer = null;
let musicOn = false;

// =====================
// Screen handling
// =====================
function showScreen(n){
  $$(".screen").forEach(sec => {
    const active = sec.dataset.screen === String(n);
    sec.classList.toggle("active", active);
    sec.setAttribute("aria-hidden", active ? "false" : "true");
  });
}

// =====================
// Decor: hearts + petals
// =====================
function rand(min, max){ return Math.random() * (max - min) + min; }

function spawnHeart(){
  const el = document.createElement("div");
  el.className = "heart";
  el.textContent = Math.random() > 0.4 ? "💗" : "💖";
  el.style.left = `${rand(0, 100)}vw`;
  el.style.bottom = `-20px`;
  el.style.fontSize = `${rand(14, 24)}px`;
  el.style.setProperty("--drift", `${rand(-60, 60)}px`);
  el.style.animationDuration = `${rand(6.5, 11.5)}s`;
  $("#hearts").appendChild(el);

  setTimeout(() => el.remove(), 12000);
}

function spawnPetal(){
  const el = document.createElement("div");
  el.className = "petal";
  el.style.left = `${rand(0, 100)}vw`;
  el.style.top = `-30px`;
  el.style.setProperty("--drift", `${rand(-80, 80)}px`);
  el.style.animationDuration = `${rand(7.5, 14)}s`;
  el.style.transform = `rotate(${rand(0, 360)}deg)`;
  $("#petals").appendChild(el);

  setTimeout(() => el.remove(), 16000);
}

setInterval(spawnHeart, 550);
setInterval(spawnPetal, 850);

// =====================
// Gallery
// =====================
function isMobile(){
  return window.matchMedia("(max-width: 820px)").matches;
}

function loadGallery(){
  const g = $("#gallery");
  g.innerHTML = "";

  const layout = isMobile() ? CONFIG.layoutMobile : CONFIG.layoutDesktop;

  // We will place as many images as possible using layout slots
  const imgs = currentGirl.images;
  const count = Math.min(imgs.length, layout.length);

  for(let i=0;i<count;i++){
    const slot = layout[i];
    const wrap = document.createElement("div");
    wrap.className = "photo";
    wrap.style.left = `${slot.x}%`;
    wrap.style.top = `${slot.y}%`;
    wrap.style.width = `${slot.w}px`;
    wrap.style.height = `${slot.h}px`;
    wrap.style.transform = `translateZ(${Math.round(rand(10, 70))}px) rotate(${slot.r}deg)`;

    const img = document.createElement("img");
    img.src = imgs[i];
    img.alt = `${currentGirl.name} photo ${i+1}`;
    img.loading = "lazy";

    // slight hover tilt on each photo
    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      wrap.style.transform =
        `translateZ(${Math.round(40)}px) rotate(${slot.r}deg) rotateY(${dx*10}deg) rotateX(${-dy*10}deg)`;
    });
    wrap.addEventListener("mouseleave", () => {
      wrap.style.transform = `translateZ(${Math.round(rand(10, 70))}px) rotate(${slot.r}deg)`;
    });

    wrap.appendChild(img);
    g.appendChild(wrap);
  }

  // If user has more images than layout, ignore extras (or you can extend layout arrays).
}

// Parallax feel on stage
function setupStageParallax(){
  const stage = $(".stage");
  const gallery = $("#gallery");
  if(!stage || !gallery) return;

  stage.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gallery.style.transform = `rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.01)`;
  });

  stage.addEventListener("mouseleave", () => {
    gallery.style.transform = "none";
  });
}

// =====================
// Typewriter
// =====================
function stopTyping(){
  if(typingTimer) clearTimeout(typingTimer);
  typingTimer = null;
}

function typeWriter(text, el, speed){
  stopTyping();
  el.textContent = "";
  let i = 0;

  const tick = () => {
    // Support newline
    el.textContent += text[i] ?? "";
    i++;
    if(i < text.length){
      typingTimer = setTimeout(tick, speed);
    }
  };
  tick();
}

// =====================
// Music toggle (optional)
// =====================
function setMusic(on){
  const audio = $("#bgm");
  musicOn = on;

  if(!audio) return;
  if(on){
    audio.volume = 0.35;
    audio.play().catch(() => {
      // autoplay might be blocked; user can tap again.
    });
  }else{
    audio.pause();
  }

  $("#toggleMusic")?.classList.toggle("is-on", on);
}

// =====================
// Envelope open
// =====================
function openEnvelopeAndType(){
  const env = $("#envelope");
  const typing = $("#typing");
  if(!env || !typing) return;

  env.classList.add("open");
  typeWriter(currentGirl.letter, typing, CONFIG.typeSpeed);
}

// =====================
// Init events
// =====================
function init(){
  $("#fromName").textContent = CONFIG.fromName;

  // Screen 1 choices
  $$(".choice-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.girl;
      currentKey = key;
      currentGirl = CONFIG.girls[key];

      $("#girlNameTop").textContent = currentGirl.name;

      showScreen(2);
      loadGallery();
      setupStageParallax();

      // try music on first interaction? keep off by default
      // setMusic(true);
    });
  });

  // Back buttons
  $("#backTo1").addEventListener("click", () => {
    stopTyping();
    showScreen(1);
  });

  $("#backTo2").addEventListener("click", () => {
    stopTyping();
    // reset envelope state
    $("#envelope")?.classList.remove("open");
    $("#typing").textContent = "";
    showScreen(2);
  });

  // Music toggle
  $("#toggleMusic").addEventListener("click", () => setMusic(!musicOn));

  // Open letter
  $("#openLetterBtn").addEventListener("click", () => {
    if(!currentGirl) return;

    $("#girlNameLetter").textContent = currentGirl.name;
    $("#girlNameTo").textContent = currentGirl.name;

    // reset envelope
    $("#envelope")?.classList.remove("open");
    $("#typing").textContent = "";

    showScreen(3);

    // Delay for nicer transition
    setTimeout(openEnvelopeAndType, 450);
  });

  // Again button
  $("#againBtn").addEventListener("click", () => {
    stopTyping();
    $("#envelope")?.classList.remove("open");
    $("#typing").textContent = "";
    showScreen(2);
  });

  // Re-layout on resize
  window.addEventListener("resize", () => {
    if(currentGirl && $(".screen-2").classList.contains("active")){
      loadGallery();
    }
  });
}

init();