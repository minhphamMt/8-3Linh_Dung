/* Screen 4: wish persistence, wish layout, wish submission */

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
  const minDistance = state.theme === "sakura"
    ? (isMobile() ? 74 : 94)
    : (isMobile() ? 52 : 64);

  for (let i = 0; i < 28; i += 1) {
    const c = { x: rand(10, 90), y: rand(12, 78) };
    const overlap = state.wishes.some((w) => {
      const dx = ((c.x - w.x) / 100) * width;
      const dy = ((c.y - w.y) / 100) * height;
      return Math.hypot(dx, dy) < minDistance;
    });
    best = c;
    if (!overlap) break;
  }
  return best;
}

function wishNode(wish, animate = false) {
  const item = document.createElement("article");
  const renderTheme = state.theme === "sakura" ? "sakura" : "cosmic";
  item.className = `wish-node ${renderTheme === "sakura" ? "is-sakura" : "is-cosmic"}`;
  item.style.setProperty("--x", `${wish.x}%`);
  item.style.setProperty("--y", `${wish.y}%`);
  item.style.setProperty("--wish-delay", `${rand(-4.2, 0).toFixed(2)}s`);
  item.style.setProperty("--wish-tilt", `${rand(-8, 8).toFixed(2)}deg`);
  if (renderTheme === "sakura") {
    item.innerHTML = `
      <span class="wish-node__halo" aria-hidden="true"></span>
      <span class="wish-node__flower" aria-hidden="true">
        <span class="wish-node__petal wish-node__petal--1"></span>
        <span class="wish-node__petal wish-node__petal--2"></span>
        <span class="wish-node__petal wish-node__petal--3"></span>
        <span class="wish-node__petal wish-node__petal--4"></span>
        <span class="wish-node__petal wish-node__petal--5"></span>
        <span class="wish-node__core">❀</span>
      </span>
      <p class="wish-node__text">${wish.text}</p>
    `;
  } else {
    item.innerHTML = `<span class="wish-node__halo" aria-hidden="true"></span><span class="wish-node__spark">✨</span><p class="wish-node__text">${wish.text}</p>`;
  }
  if (animate) {
    item.classList.add("is-launching");
    requestAnimationFrame(() => item.classList.add("is-settled"));
  } else {
    item.classList.add("is-settled");
  }
  return item;
}

function renderWishSky() {
  const sky = $("#wishSkyNodes");
  if (!sky) return;
  sky.innerHTML = "";
  state.wishes.forEach((wish) => sky.appendChild(wishNode(wish, false)));
}

function makeWish() {
  const input = $("#wishInput");
  const sky = $("#wishSkyNodes");
  if (!input || !sky) return;
  const text = input.value.trim().replace(/\s+/g, " ").slice(0, 140);
  if (!text) {
    showToast(state.theme === "sakura" ? "Nhập điều ước trước nhé 🌸" : "Nhập điều ước trước nhé ✨");
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
  showToast(state.theme === "sakura" ? "Điều ước của bạn đã nở trong khu vườn sakura." : "Điều ước của bạn đã bay vào dải ngân hà.");
}

function openWishScreen(fromScreen) {
  state.previousScreen = fromScreen;
  transitionToScreen(4, {
    effect: "petal",
    onSwitched: () => setTimeout(() => $("#wishInput")?.focus({ preventScroll: true }), 120),
  });
}

