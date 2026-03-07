/* Screen 1: hero preview, custom cursor, home transitions */

function renderHeroPetalPreview() {
  const layer = $("#heroPetalPreview");
  const sparkLayer = $("#heroSparkles");
  if (!layer || !sparkLayer) return;
  const phone = isPhoneViewport();
  const homeScreen = state.screen === 1;

  const allImages = [...CONFIG.girls.linh.images, ...CONFIG.girls.dung.images];
  const shuffled = allImages.slice().sort(() => Math.random() - 0.5);
  const count = phone
    ? 0
    : isMobile()
    ? scalePerformanceCount(4, 4, 3)
    : state.theme === "cosmic"
      ? scalePerformanceCount(8, 5, 3)
      : scalePerformanceCount(8, 6, 4);
  const sparkCount = phone
    ? 0
    : isMobile()
    ? scalePerformanceCount(8, 6, 4)
    : state.theme === "cosmic"
      ? scalePerformanceCount(20, 14, 8)
      : scalePerformanceCount(14, 10, 6);

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
    card.innerHTML = `<img src="${shuffled[i % shuffled.length]}" alt="Memory petal ${i + 1}" loading="lazy" decoding="async" />`;
    layer.appendChild(card);
  }

  if (state.theme === "cosmic") {
    sparkLayer.style.backgroundImage = buildGalaxyDustMap(scalePerformanceCount(
      homeScreen ? (phone ? 10 : isMobile() ? 42 : 88) : (phone ? 18 : isMobile() ? 76 : 144),
      homeScreen ? (phone ? 6 : isMobile() ? 28 : 58) : (phone ? 12 : isMobile() ? 54 : 96),
      homeScreen ? (phone ? 2 : isMobile() ? 14 : 32) : (phone ? 6 : isMobile() ? 30 : 62)
    ), {
      minX: 2,
      maxX: 98,
      minY: 4,
      maxY: 94,
      clusterCount: pickPerformanceValue(phone ? 2 : isMobile() ? 5 : 8, phone ? 2 : isMobile() ? 4 : 6, phone ? 1 : isMobile() ? 3 : 4),
      clusterBias: pickPerformanceValue(phone ? 0.46 : 0.74, phone ? 0.42 : 0.68, phone ? 0.38 : 0.62),
      avoidRects: [
        { x1: 10, x2: 48, y1: 18, y2: 64, allowChance: 0.42 },
      ],
    });
    if (phone) return;

    const starCount = scalePerformanceCount(
      homeScreen ? (isMobile() ? 24 : 54) : (isMobile() ? 42 : 92),
      homeScreen ? (isMobile() ? 16 : 34) : (isMobile() ? 28 : 56),
      homeScreen ? (isMobile() ? 8 : 18) : (isMobile() ? 16 : 28)
    );
    const stars = generateGalaxyStarfield(starCount, {
      minX: 2,
      maxX: 98,
      minY: 4,
      maxY: 94,
      clusterCount: pickPerformanceValue(isMobile() ? 5 : 8, isMobile() ? 4 : 6, isMobile() ? 3 : 4),
      clusterBias: pickPerformanceValue(isMobile() ? 0.62 : 0.74, isMobile() ? 0.58 : 0.66, isMobile() ? 0.52 : 0.6),
      minGap: pickPerformanceValue(isMobile() ? 0.66 : 0.82, isMobile() ? 0.84 : 1, isMobile() ? 1.02 : 1.18),
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
      spark.style.animationDuration = `${rand(4.8, 8.4).toFixed(2)}s`;
      sparkLayer.appendChild(spark);
    });
    return;
  }

  sparkLayer.style.backgroundImage = "";
  if (phone) return;

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

  const particleCount = scalePerformanceCount(18, 12, 8);
  for (let i = 0; i < particleCount; i += 1) {
    const p = document.createElement("span");
    p.className = "cosmic-launch__particle";
    const angle = (Math.PI * 2 * i) / particleCount;
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
  const petalCount = scalePerformanceCount(16, 12, 8);
  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "sakura-launch__petal";
    petal.textContent = petals[i % petals.length];
    const angle = (Math.PI * 2 * i) / petalCount;
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
  const petalCount = scalePerformanceCount(18, 13, 9);
  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "sakura-portal-swirl__petal";
    petal.textContent = petals[i % petals.length];
    const angle = (Math.PI * 2 * i) / petalCount;
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
    if (state.screen !== 1 || !state.performance?.allowHeroParallax) return;
    const rect = hero.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
    hero.style.setProperty("--mx", `${x.toFixed(2)}%`);
    hero.style.setProperty("--my", `${y.toFixed(2)}%`);
    hero.classList.add("is-hovering");

    const intensity = pickPerformanceValue(1, 0.72, 0.5);
    const nx = ((x / 100) - 0.5) * intensity;
    const ny = ((y / 100) - 0.5) * intensity;
    copy.style.transform = `translate3d(${(nx * -10).toFixed(2)}px, ${(ny * -8).toFixed(2)}px, 0)`;
    visual.style.transform = `translate3d(${(nx * 14).toFixed(2)}px, ${(ny * 10).toFixed(2)}px, 0)`;
    floatingDecor.forEach((node) => {
      const factor = Number(node.dataset.float || 0.8);
      node.style.transform = `translate3d(${(nx * -24 * factor).toFixed(2)}px, ${(ny * -16 * factor).toFixed(2)}px, 0)`;
    });

    const now = performance.now();
    if (now - state.heroHoverTick > (state.performance?.heroHoverMs || 48)) {
      spawnHeroHoverParticle(sparkLayer, x, y);
      state.heroHoverTick = now;
    }
  }, { passive: true });

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
    const enabled = Boolean(state.performance?.allowCustomCursor);
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

  window.addEventListener("resize", syncCursorMode, { passive: true });
  window.addEventListener("blur", hideCursor);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hideCursor();
  });

  window.addEventListener("pointermove", (event) => {
    if (!state.performance?.allowCustomCursor || (event.pointerType && event.pointerType !== "mouse")) return;
    cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    cursor.classList.add("is-visible");
    const interactive = event.target instanceof Element
      ? event.target.closest("button, a, input, textarea, select, label, [role='button']")
      : null;
    cursor.classList.toggle("is-hover", Boolean(interactive));
  }, { passive: true });

  window.addEventListener("pointerdown", (event) => {
    if (!state.performance?.allowCustomCursor || (event.pointerType && event.pointerType !== "mouse")) return;
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

