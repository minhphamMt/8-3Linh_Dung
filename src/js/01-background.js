/* Intro overlay, galaxy/sakura background effects, starfields */

function runIntro() {
  const intro = $("#introOverlay");
  if (!intro) return;
  if (prefersReducedMotion()) {
    intro.remove();
    return;
  }
  intro.classList.add("is-visible");
  const revealDelay = pickPerformanceValue(260, 220, 180);
  const fadeDelay = pickPerformanceValue(1700, 1380, 1040);
  const removeDelay = pickPerformanceValue(2550, 2080, 1540);
  setTimeout(() => intro.classList.add("is-reveal"), revealDelay);
  setTimeout(() => intro.classList.add("is-fade"), fadeDelay);
  setTimeout(() => intro.remove(), removeDelay);
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
  const duration = rand(durationMin, durationMax);
  item.style.animationDuration = `${duration.toFixed(2)}s`;
  layer.appendChild(item);
  setTimeout(() => item.remove(), Math.round((duration * 1000) + (className.includes("fx-shooting") ? 320 : 1400)));
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
  const phone = isPhoneViewport();
  const homeScreen = state.screen === 1;

  layer.querySelectorAll(".bg-starfield__star").forEach((node) => node.remove());
  if (state.theme !== "cosmic") {
    layer.style.backgroundImage = "";
    if (constellationLayer) constellationLayer.style.removeProperty("--milky-dust-map");
    return;
  }

  layer.style.backgroundImage = buildGalaxyDustMap(scalePerformanceCount(
    homeScreen ? (phone ? 40 : isMobile() ? 96 : 176) : (phone ? 72 : isMobile() ? 150 : 260),
    homeScreen ? (phone ? 26 : isMobile() ? 62 : 122) : (phone ? 48 : isMobile() ? 102 : 184),
    homeScreen ? (phone ? 14 : isMobile() ? 36 : 84) : (phone ? 28 : isMobile() ? 72 : 132)
  ), {
    minX: 0.5,
    maxX: 99.5,
    minY: 0.5,
    maxY: 99.5,
    clusterCount: pickPerformanceValue(phone ? 4 : isMobile() ? 8 : 12, phone ? 3 : isMobile() ? 6 : 9, phone ? 2 : isMobile() ? 4 : 7),
    clusterBias: pickPerformanceValue(phone ? 0.52 : isMobile() ? 0.6 : 0.74, phone ? 0.48 : isMobile() ? 0.58 : 0.68, phone ? 0.44 : isMobile() ? 0.54 : 0.62),
  });
  if (constellationLayer) {
    constellationLayer.style.setProperty("--milky-dust-map", buildGalaxyDustMap(scalePerformanceCount(
      homeScreen ? (phone ? 10 : isMobile() ? 34 : 80) : (phone ? 22 : isMobile() ? 68 : 128),
      homeScreen ? (phone ? 6 : isMobile() ? 22 : 52) : (phone ? 14 : isMobile() ? 44 : 86),
      homeScreen ? (phone ? 3 : isMobile() ? 12 : 28) : (phone ? 8 : isMobile() ? 28 : 54)
    ), {
      minX: 14,
      maxX: 86,
      minY: 18,
      maxY: 78,
      clusterCount: pickPerformanceValue(phone ? 2 : isMobile() ? 5 : 7, phone ? 2 : isMobile() ? 3 : 5, phone ? 1 : isMobile() ? 2 : 4),
      clusterBias: pickPerformanceValue(phone ? 0.62 : 0.8, phone ? 0.58 : 0.72, phone ? 0.5 : 0.66),
    }));
  }

  const count = scalePerformanceCount(
    homeScreen ? (phone ? 30 : isMobile() ? 96 : 180) : (phone ? 56 : isMobile() ? 160 : 300),
    homeScreen ? (phone ? 18 : isMobile() ? 60 : 114) : (phone ? 34 : isMobile() ? 104 : 190),
    homeScreen ? (phone ? 8 : isMobile() ? 28 : 72) : (phone ? 18 : isMobile() ? 64 : 120)
  );
  const points = generateGalaxyStarfield(count, {
    minX: 0.8,
    maxX: 99.2,
    minY: 0.8,
    maxY: 99.2,
    clusterCount: pickPerformanceValue(phone ? 4 : isMobile() ? 7 : 10, phone ? 3 : isMobile() ? 5 : 7, phone ? 2 : isMobile() ? 4 : 5),
    clusterBias: pickPerformanceValue(phone ? 0.46 : isMobile() ? 0.58 : 0.72, phone ? 0.42 : isMobile() ? 0.54 : 0.66, phone ? 0.38 : isMobile() ? 0.48 : 0.6),
    minGap: pickPerformanceValue(phone ? 0.86 : isMobile() ? 0.42 : 0.54, phone ? 1 : isMobile() ? 0.56 : 0.72, phone ? 1.14 : isMobile() ? 0.74 : 0.94),
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
  const phone = isPhoneViewport();

  if (state.theme !== "cosmic" || state.screen !== 2) return;
  const count = scalePerformanceCount(
    phone ? 24 : isMobile() ? 72 : 140,
    phone ? 16 : isMobile() ? 48 : 92,
    phone ? 8 : isMobile() ? 28 : 54
  );
  const minCenterDistance = pickPerformanceValue(phone ? 16 : isMobile() ? 14 : 16, phone ? 18 : isMobile() ? 15 : 18, phone ? 20 : isMobile() ? 16 : 20);
  const points = generateGalaxyStarfield(count, {
    minX: 2,
    maxX: 98,
    minY: 4,
    maxY: 94,
    clusterCount: pickPerformanceValue(phone ? 3 : isMobile() ? 6 : 8, phone ? 2 : isMobile() ? 4 : 5, phone ? 2 : isMobile() ? 3 : 4),
    clusterBias: pickPerformanceValue(phone ? 0.46 : isMobile() ? 0.6 : 0.7, phone ? 0.42 : isMobile() ? 0.56 : 0.64, phone ? 0.38 : isMobile() ? 0.5 : 0.58),
    minGap: pickPerformanceValue(phone ? 1.04 : isMobile() ? 0.6 : 0.72, phone ? 1.18 : isMobile() ? 0.76 : 0.94, phone ? 1.28 : isMobile() ? 0.92 : 1.1),
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

  const profile = state.performance || buildPerformanceProfile();
  const lowPower = profile.reduced || profile.level === "low";
  const sakura = state.theme === "sakura";
  const homeScreen = state.screen === 1;
  const intervalScale = profile.backgroundIntervalScale || 1;
  if (document.hidden || isPhoneViewport() || ![1, 2].includes(state.screen)) return;
  const recipes = [];

  if (sakura) {
    recipes.push({ layer: "#bgSakura", className: "fx-petal", text: "🌸", min: 7.2, max: 11.8, interval: Math.round((lowPower ? 900 : 520) * intervalScale) });
    recipes.push({ layer: "#bgParticles", className: "fx-leaf", text: "🍃", min: 9.2, max: 13.8, interval: Math.round((lowPower ? 1450 : 860) * intervalScale) });
    recipes.push({ layer: "#bgStars", className: "fx-spark", text: "✨", min: 6.8, max: 10.6, interval: Math.round((lowPower ? 1300 : 740) * intervalScale) });
    if (profile.level !== "low") {
      recipes.push({ layer: "#bgSakura", className: "fx-butterfly", text: "🦋", min: 8.8, max: 13.4, interval: Math.round((profile.level === "medium" ? 4200 : 3000) * intervalScale) });
    }
    if (profile.level === "high") {
      recipes.push({ layer: "#bgParticles", className: "fx-bee", text: "🐝", min: 7.6, max: 11.2, interval: 3600 });
      recipes.push({ layer: "#bgSakura", className: "fx-bird", text: "🐦", min: 10.4, max: 14.8, interval: 5200 });
    }
  } else {
    recipes.push({
      layer: "#bgStars",
      className: "fx-star",
      text: "",
      min: 7.8,
      max: 11.8,
      interval: Math.round((homeScreen
        ? (profile.level === "low" ? 2600 : profile.level === "medium" ? 1800 : 1320)
        : (profile.level === "low" ? 1800 : profile.level === "medium" ? 1200 : 760)) * intervalScale)
    });
    recipes.push({
      layer: "#bgParticles",
      className: "fx-soft",
      text: "",
      min: 9.4,
      max: 14.8,
      interval: Math.round((homeScreen
        ? (profile.level === "low" ? 3200 : profile.level === "medium" ? 2400 : 1700)
        : (profile.level === "low" ? 2200 : profile.level === "medium" ? 1500 : 900)) * intervalScale)
    });
    if (!homeScreen) {
      recipes.push({ layer: "#bgParticles", className: "fx-shooting", text: "", min: 1.3, max: 2.1, interval: Math.round((profile.level === "low" ? 16800 : profile.level === "medium" ? 12200 : 8600) * intervalScale) });
    }
  }

  recipes.forEach((recipe) => {
    const isCreature = /fx-butterfly|fx-bee|fx-bird/.test(recipe.className);
    let burst = lowPower
      ? (recipe.className.includes("fx-shooting") ? 0 : 1)
      : performanceLevel() === "medium"
        ? (recipe.className.includes("fx-shooting") ? 1 : (isCreature ? 1 : 2))
        : (recipe.className.includes("fx-shooting") ? 1 : (isCreature ? 1 : 3));
    if (!sakura) {
      if (recipe.className.includes("fx-shooting")) burst = 0;
      if (recipe.className.includes("fx-star")) burst = performanceLevel() === "high" ? 1 : 0;
      if (recipe.className.includes("fx-soft")) burst = performanceLevel() === "low" ? 0 : 1;
    }
    for (let i = 0; i < burst; i += 1) {
      spawnBackgroundItem(recipe.layer, recipe.className, recipe.text, recipe.min, recipe.max);
    }
    const timer = setInterval(
      () => spawnBackgroundItem(recipe.layer, recipe.className, recipe.text, recipe.min, recipe.max),
      recipe.interval
    );
    state.backgroundIntervals.push(timer);
  });

  if (!sakura && profile.allowConstellation) {
    spawnConstellation();
    const constellationTimer = setInterval(spawnConstellation, 7600);
    state.backgroundIntervals.push(constellationTimer);
    state.backgroundTimeouts.push(setTimeout(spawnConstellation, 2600));
  }
}

