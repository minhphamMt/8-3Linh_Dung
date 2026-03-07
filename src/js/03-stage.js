/* Screen 2: gallery layout, stage links, parallax, portal transition */

function resolveSlotCollisions(slots, options = {}) {
  const { width, height } = getStageViewport();
  const gap = options.gap ?? (isMobile() ? 10 : 16);
  const padX = options.padX ?? (isMobile() ? 8 : 16);
  const padY = options.padY ?? (isMobile() ? 8 : 16);
  const portalRadius = options.portalRadius ?? (isMobile() ? 92 : isTightViewport() ? 120 : isCompactViewport() ? 132 : 142);
  const centerX = width / 2;
  const centerY = height / 2;
  const rects = slots.map((slot) => ({
    ...slot,
    px: (slot.x / 100) * width,
    py: (slot.y / 100) * height,
  }));

  const clampRect = (rect) => {
    rect.px = clamp(rect.px, padX, Math.max(padX, width - rect.w - padX));
    rect.py = clamp(rect.py, padY, Math.max(padY, height - rect.h - padY));
  };

  const pushAwayFromPortal = (rect) => {
    const cardCx = rect.px + rect.w / 2;
    const cardCy = rect.py + rect.h / 2;
    let dx = cardCx - centerX;
    let dy = cardCy - centerY;
    const dist = Math.hypot(dx, dy) || 0.001;
    const safeRadius = portalRadius + (Math.max(rect.w, rect.h) * 0.22);
    if (dist >= safeRadius) return;
    dx /= dist;
    dy /= dist;
    const push = safeRadius - dist;
    rect.px += dx * push;
    rect.py += dy * push;
    clampRect(rect);
  };

  rects.forEach((rect) => {
    clampRect(rect);
    pushAwayFromPortal(rect);
  });

  for (let step = 0; step < 36; step += 1) {
    let moved = false;
    for (let i = 0; i < rects.length; i += 1) {
      for (let j = i + 1; j < rects.length; j += 1) {
        const a = rects[i];
        const b = rects[j];
        const overlapX = Math.min(a.px + a.w + gap, b.px + b.w + gap) - Math.max(a.px - gap, b.px - gap);
        const overlapY = Math.min(a.py + a.h + gap, b.py + b.h + gap) - Math.max(a.py - gap, b.py - gap);
        if (overlapX <= 0 || overlapY <= 0) continue;

        moved = true;
        const aCx = a.px + a.w / 2;
        const aCy = a.py + a.h / 2;
        const bCx = b.px + b.w / 2;
        const bCy = b.py + b.h / 2;
        const deltaX = aCx - bCx;
        const deltaY = aCy - bCy;

        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          const shift = overlapX / 2 + 1.5;
          const dir = deltaX || (i % 2 ? 1 : -1);
          a.px += dir > 0 ? shift : -shift;
          b.px += dir > 0 ? -shift : shift;
        } else {
          const shift = overlapY / 2 + 1.5;
          const dir = deltaY || (i < j ? -1 : 1);
          a.py += dir > 0 ? shift : -shift;
          b.py += dir > 0 ? -shift : shift;
        }

        clampRect(a);
        clampRect(b);
        pushAwayFromPortal(a);
        pushAwayFromPortal(b);
      }
    }
    if (!moved) break;
  }

  return rects.map(({ px, py, ...slot }) => ({
    ...slot,
    x: (px / width) * 100,
    y: (py / height) * 100,
  }));
}

function gallerySlots() {
  if (state.theme === "sakura") {
    if (isMobile()) {
      return resolveSlotCollisions(normalizeGallerySlots([
        { x: 20, y: 8, w: 88, h: 118, r: -10, z: 48, orbit: 10.8 },
        { x: 59, y: 11, w: 98, h: 128, r: 8, z: 40, orbit: 11.4 },
        { x: 11, y: 35, w: 98, h: 130, r: -5, z: 56, orbit: 12.8 },
        { x: 67, y: 37, w: 92, h: 122, r: 6, z: 36, orbit: 12.1 },
        { x: 22, y: 66, w: 92, h: 122, r: 7, z: 38, orbit: 13.1 },
        { x: 57, y: 62, w: 100, h: 132, r: -9, z: 52, orbit: 12.7 },
      ]), { gap: 8, portalRadius: 64, padX: 6, padY: 6 });
    }
    return resolveSlotCollisions(normalizeGallerySlots([
      { x: 22, y: 7, w: 154, h: 198, r: -11, z: 54, orbit: 12.1 },
      { x: 58, y: 10, w: 176, h: 222, r: 8, z: 42, orbit: 12.7 },
      { x: 12, y: 31, w: 184, h: 234, r: -5, z: 62, orbit: 13.7 },
      { x: 66, y: 36, w: 162, h: 206, r: 6, z: 38, orbit: 13.2 },
      { x: 23, y: 66, w: 166, h: 210, r: 7, z: 40, orbit: 14.2 },
      { x: 57, y: 60, w: 178, h: 224, r: -9, z: 54, orbit: 13.9 },
    ]), { gap: 12, portalRadius: isCompactViewport() ? 88 : 94, padX: 10, padY: 10 });
  }
  if (isMobile()) {
    return resolveSlotCollisions(normalizeGallerySlots([
      { x: 20, y: 8, w: 90, h: 120, r: -11, z: 48, orbit: 10.3 },
      { x: 60, y: 10, w: 98, h: 128, r: 9, z: 40, orbit: 10.8 },
      { x: 11, y: 35, w: 100, h: 132, r: -5, z: 58, orbit: 11.8 },
      { x: 68, y: 37, w: 92, h: 122, r: 6, z: 36, orbit: 11.5 },
      { x: 22, y: 67, w: 94, h: 124, r: 8, z: 38, orbit: 12.9 },
      { x: 58, y: 62, w: 100, h: 132, r: -9, z: 52, orbit: 12.5 },
    ]), { gap: 8, portalRadius: 64, padX: 6, padY: 6 });
  }
  return resolveSlotCollisions(normalizeGallerySlots([
    { x: 22, y: 7, w: 160, h: 206, r: -12, z: 54, orbit: 12.1 },
    { x: 59, y: 10, w: 178, h: 224, r: 9, z: 42, orbit: 12.8 },
    { x: 12, y: 30, w: 188, h: 238, r: -5, z: 64, orbit: 13.8 },
    { x: 67, y: 35, w: 164, h: 210, r: 6, z: 38, orbit: 13.1 },
    { x: 22, y: 66, w: 168, h: 214, r: 8, z: 42, orbit: 14.3 },
    { x: 58, y: 60, w: 174, h: 220, r: -10, z: 56, orbit: 13.7 },
  ]), { gap: 12, portalRadius: isTightViewport() ? 84 : 92, padX: 10, padY: 10 });
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
  card.innerHTML = `<img src="${src}" alt="Memory photo" loading="lazy" decoding="async" />`;
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
  const burstCount = isMobile()
    ? scalePerformanceCount(4, 3, 2)
    : scalePerformanceCount(6, 4, 3);

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
  const compactStage = isCompactViewport();
  const tightStage = isTightViewport();
  const level = performanceLevel();
  const phoneViewport = isPhoneViewport();
  const tinyPhone = window.innerWidth <= 520;
  const slots = gallerySlots();
  const galleryImages = girl.images.slice(0, Math.min(girl.images.length, slots.length));
  const primaryEchoIndexes = phoneViewport
    ? []
    : level === "low"
    ? [0, 2, 4]
    : level === "medium"
      ? [0, 1, 3, 4, 5]
      : galleryImages.map((_, index) => index);
  const softEchoIndexes = phoneViewport
    ? []
    : level === "high"
    ? galleryImages.map((_, index) => index)
    : level === "medium"
      ? [0, 2, 4, 5]
      : [];

  main.innerHTML = "";
  echo.innerHTML = "";

  galleryImages.forEach((src, index) => {
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

  galleryImages.forEach((src, index) => {
    const base = slots[index];
    if (!primaryEchoIndexes.includes(index)) return;
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
        moveSlotAwayFromCore(slot, isMobile() ? (sakuraMode ? 30 : 20) : (sakuraMode ? (compactStage ? 38 : 34) : (compactStage ? 29 : 25))),
        "memory-photo--echo"
      )
    );
  });

  galleryImages.forEach((src, index) => {
    const base = slots[index];
    if (!softEchoIndexes.includes(index)) return;
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
        moveSlotAwayFromCore(slot, isMobile() ? (sakuraMode ? 34 : 24) : (sakuraMode ? (compactStage ? 42 : 38) : (compactStage ? 34 : 30))),
        "memory-photo--echo memory-photo--echo-soft"
      )
    );
  });

  const sparse = normalizeGallerySlots(sakuraMode
    ? (isMobile()
      ? [
        { x: 43, y: 2, w: 58, h: 74, r: -4, z: 4, orbit: 16.8 },
        { x: 1, y: 38, w: 56, h: 72, r: -8, z: 3, orbit: 16.2 },
        { x: 84, y: 39, w: 56, h: 72, r: 7, z: 3, orbit: 17.4 },
      ]
      : [
        { x: 3, y: 24, w: 88, h: 112, r: -7, z: 5, orbit: 18.2 },
        { x: 84, y: 22, w: 88, h: 112, r: 8, z: 5, orbit: 17.8 },
        { x: 5, y: 73, w: 88, h: 112, r: -6, z: 4, orbit: 18.8 },
        { x: 84, y: 72, w: 88, h: 112, r: 7, z: 4, orbit: 18.4 },
      ])
    : (isMobile()
      ? [
        { x: 43, y: 2, w: 60, h: 76, r: -6, z: 4, orbit: 16.2 },
        { x: 1, y: 39, w: 58, h: 74, r: -9, z: 3, orbit: 15.8 },
        { x: 84, y: 38, w: 58, h: 74, r: 8, z: 3, orbit: 17.2 },
      ]
      : [{ x: 3, y: 20, w: 96, h: 122, r: -8, z: 5, orbit: 17.4 }, { x: 81, y: 22, w: 96, h: 122, r: 8, z: 5, orbit: 16.8 }, { x: 43, y: 76, w: 96, h: 122, r: -6, z: 4, orbit: 18.2 }]));

  const sparseLimit = phoneViewport
    ? Math.min(tinyPhone ? 2 : 3, sparse.length)
    : level === "low"
      ? Math.min(2, sparse.length)
      : level === "medium"
        ? Math.min(3, sparse.length)
        : sparse.length;
  sparse.slice(0, sparseLimit).forEach((slot, idx) => {
    echo.appendChild(createMemoryCard(girl.images[idx % girl.images.length], slot, "memory-photo--echo memory-photo--echo-faint"));
  });

  if (!isMobile() && level !== "low") {
    const baseRingCount = sakuraMode ? (compactStage ? 5 : 6) : (tightStage ? 7 : compactStage ? 8 : 10);
    const ringCount = level === "medium" ? Math.max(3, Math.round(baseRingCount * 0.55)) : baseRingCount;
    for (let i = 0; i < ringCount; i += 1) {
      const angle = (Math.PI * 2 * i) / ringCount + rand(-0.18, 0.18);
      const slot = {
        x: clamp(50 + (Math.cos(angle) * rand(sakuraMode ? 38 : 31, sakuraMode ? 46 : 42)), 1, 89),
        y: clamp(50 + (Math.sin(angle) * rand(sakuraMode ? 30 : 24, sakuraMode ? 40 : 36)), 2, 88),
        w: Math.round(rand(sakuraMode ? (compactStage ? 70 : 78) : (compactStage ? 76 : 86), sakuraMode ? (compactStage ? 90 : 96) : (compactStage ? 96 : 104))),
        h: Math.round(rand(sakuraMode ? (compactStage ? 92 : 100) : (compactStage ? 100 : 110), sakuraMode ? (compactStage ? 116 : 122) : (compactStage ? 122 : 130))),
        r: rand(-12, 12),
        z: rand(2, 8),
        orbit: rand(16, 21),
      };
      echo.appendChild(
        createMemoryCard(
          girl.images[i % girl.images.length],
          moveSlotAwayFromCore(slot, sakuraMode ? (compactStage ? 44 : 40) : (compactStage ? 38 : 34)),
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
  state.memoryInterval = setInterval(highlight, pickPerformanceValue(4600, 5600, 6800));
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
  const resetStageTransforms = () => {
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
  };
  const isStageInteractive = () => {
    const transitioning = state.portalBusy || stage.classList.contains("is-portal-transition") || stage.classList.contains("is-blackhole-transition");
    return state.screen === 2 && !transitioning && Boolean(state.performance?.allowStageParallax);
  };

  const updateStageField = () => {
    const active = isStageInteractive();
    if (active) {
      motion.wasActive = true;
      motion.x += (motion.targetX - motion.x) * 0.15;
      motion.y += (motion.targetY - motion.y) * 0.15;
      const parallaxStrength = pickPerformanceValue(1, 0.76, 0.48);
      const x = (motion.x - 0.5) * parallaxStrength;
      const y = (motion.y - 0.5) * parallaxStrength;
      const t = performance.now() * 0.001;
      const driftX = Math.sin(t * 0.45) * pickPerformanceValue(2.4, 1.8, 1.2);
      const driftY = Math.cos(t * 0.4) * pickPerformanceValue(1.9, 1.4, 1.1);
      const driftTilt = Math.sin(t * 0.24) * pickPerformanceValue(0.9, 0.64, 0.42);

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

      const cardsToMove = performanceLevel() === "high"
        ? $$(".memory-photo")
        : performanceLevel() === "medium"
          ? $$(".memory-photo--main, .memory-photo--echo")
          : $$(".memory-photo--main");
      cardsToMove.forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + (r.width / 2);
        const cy = r.top + (r.height / 2);
        const dx = pointerX - cx;
        const dy = pointerY - cy;
        const dist = Math.hypot(dx, dy);
        const isMain = card.classList.contains("memory-photo--main");
        const radius = isMain ? pickPerformanceValue(300, 250, 210) : pickPerformanceValue(220, 180, 140);
        const safeDist = dist || 0.001;

        let tx = 0;
        let ty = 0;
        if (dist < radius) {
          const force = 1 - (dist / radius);
          const strength = isMain ? pickPerformanceValue(10, 7.5, 5.5) : pickPerformanceValue(6, 4.2, 3);
          tx = (-dx / safeDist) * force * strength;
          ty = (-dy / safeDist) * force * strength;
        }

        const magneticRadius = pickPerformanceValue(260, 220, 180);
        if (card === nearest && nearestDist < magneticRadius) {
          const pullForce = 1 - (nearestDist / magneticRadius);
          tx += (dx / safeDist) * pullForce * pickPerformanceValue(7.5, 5.8, 4.4);
          ty += (dy / safeDist) * pullForce * pickPerformanceValue(7.5, 5.8, 4.4);
          card.classList.add("is-magnetic");
        } else {
          card.classList.remove("is-magnetic");
        }

        card.style.translate = `${tx.toFixed(2)}px ${ty.toFixed(2)}px`;
      });

      const now = performance.now();
      if (now - lastLinkTs > (state.performance?.stageLinkRefreshMs || 420)) {
        renderStageLinks();
        lastLinkTs = now;
      }
      motion.raf = requestAnimationFrame(updateStageField);
    } else {
      if (motion.wasActive) {
        resetStageTransforms();
      }
      motion.wasActive = false;
      motion.targetX = 0.5;
      motion.targetY = 0.5;
      motion.raf = null;
      return;
    }
  };

  const ensureStageLoop = () => {
    if (motion.raf || !isStageInteractive()) return;
    motion.raf = requestAnimationFrame(updateStageField);
  };

  ensureStageLoop();

  stage.addEventListener("mousemove", (event) => {
    if (!isStageInteractive()) return;
    const rect = stage.getBoundingClientRect();
    motion.targetX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    motion.targetY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    ensureStageLoop();

    const now = performance.now();
    if (now - state.stageHoverTick > (state.performance?.stageHoverMs || 46)) {
      spawnStageTrail(stage, motion.targetX * 100, motion.targetY * 100);
      state.stageHoverTick = now;
    }
  }, { passive: true });

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
        onSettled: () => {
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
        onSettled: () => {
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
      onSettled: () => {
        startLetterSequence();
        clearPortalState();
        state.portalBusy = false;
      },
    });
  }, 980);
}

