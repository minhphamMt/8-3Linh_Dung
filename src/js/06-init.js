/* Music toggle, event binding, app bootstrap */

function toggleMusic() {
  if (state.musicOn) {
    const audio = $("#bgm");
    const btn = $("#toggleMusic");
    if (!audio || !btn) return;
    audio.pause();
    state.musicOn = false;
    btn.classList.remove("is-on");
    localStorage.setItem(CONFIG.storageMusic, "0");
    return;
  }
  tryStartMusic();
}

function tryStartMusic(options = {}) {
  const {
    silent = false,
    persist = true,
  } = options;
  const audio = $("#bgm");
  const btn = $("#toggleMusic");
  if (!audio || !btn) return Promise.resolve(false);

  audio.volume = 0.16;
  const playResult = audio.play();
  if (playResult && typeof playResult.then === "function") {
    return playResult.then(() => {
      state.musicOn = true;
      btn.classList.add("is-on");
      if (persist) localStorage.setItem(CONFIG.storageMusic, "1");
      return true;
    }).catch(() => {
      state.musicOn = false;
      btn.classList.remove("is-on");
      if (!silent) showToast("Trình duyệt đang chặn autoplay.");
      return false;
    });
  }

  state.musicOn = true;
  btn.classList.add("is-on");
  if (persist) localStorage.setItem(CONFIG.storageMusic, "1");
  return Promise.resolve(true);
}

function setupAutoplayMusicFallback() {
  let armed = true;
  const activate = () => {
    if (!armed || state.musicOn) return;
    armed = false;
    tryStartMusic({ silent: true, persist: true });
    window.removeEventListener("pointerdown", activate, true);
    window.removeEventListener("keydown", activate, true);
    window.removeEventListener("touchstart", activate, true);
  };

  window.addEventListener("pointerdown", activate, { capture: true, once: true, passive: true });
  window.addEventListener("keydown", activate, { capture: true, once: true });
  window.addEventListener("touchstart", activate, { capture: true, once: true, passive: true });
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
  tryStartMusic({ silent: true, persist: true }).then((started) => {
    if (!started) setupAutoplayMusicFallback();
  });
}

init();
