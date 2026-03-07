/* Music toggle, event binding, app bootstrap */

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

  $("#backToHome")?.addEventListener("click", () => transitionToScreen(1, { effect: "drift" }));
  $("#openWishFromHome")?.addEventListener("click", () => openWishScreen(1));
  $("#openWishFromStage")?.addEventListener("click", () => openWishScreen(2));
  $("#backFromWish")?.addEventListener("click", () => {
    transitionToScreen(state.previousScreen || 1, {
      effect: "drift",
      onSwitched: () => {
        if (state.previousScreen === 2) startMemoryHighlight();
      },
    });
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

  const handleResize = debounce(() => {
    refreshPerformanceProfile();
    renderActiveScreenVisuals({ refreshHighlight: state.screen === 2 });
  }, state.performance?.resizeDebounceMs || 160);

  window.addEventListener("resize", handleResize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearBackgroundEffects();
      if (state.screen === 2) clearMemoryHighlight();
      return;
    }
    renderActiveScreenVisuals({ refreshHighlight: state.screen === 2 });
  });
}

function init() {
  state.wishes = loadWishes();
  refreshPerformanceProfile(true);

  const savedTheme = localStorage.getItem(CONFIG.storageTheme);
  setTheme(savedTheme === "sakura" ? "sakura" : "cosmic", false);
  showScreen(1);
  bindEvents();
  setupCustomCursor();
  setupHeroInteraction();
  runIntro();

  if (localStorage.getItem(CONFIG.storageMusic) === "1") {
    toggleMusic();
  }
}

init();
