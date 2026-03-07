/* Screen 3: typing, letter sequence, back-to-stage flow */

function stopTyping() {
  if (state.typingTimer) clearTimeout(state.typingTimer);
  state.typingTimer = null;
}

function clearLetterTimers() {
  state.letterTimers.forEach((timer) => clearTimeout(timer));
  state.letterTimers = [];
}

function resetLetterScene() {
  const envelope = $("#envelope");
  const paper = $("#letterPaper");
  const typing = $("#typing");
  const ending = $("#letterEnding");
  const scene = $("#letterScene");
  const signature = $("#letterSignature");
  const signatureWrap = signature?.closest(".signature");

  if (scene) scene.classList.remove("is-arriving");
  if (envelope) envelope.classList.remove("is-arrived", "is-open", "is-paper", "is-floating");
  if (paper) paper.classList.remove("is-visible");
  if (typing) {
    typing.textContent = "";
    typing.scrollTop = 0;
  }
  if (ending) ending.classList.remove("show");
  if (signature) signature.textContent = "";
  if (signatureWrap) signatureWrap.classList.remove("is-signing");
}

function typeWriter(text, target) {
  stopTyping();
  target.textContent = "";
  target.scrollTop = 0;
  let index = 0;

  const delayFor = (char) => {
    if (char === ".") return CONFIG.typeBaseDelay + 500;
    if (char === ",") return CONFIG.typeBaseDelay + 200;
    if (char === "!" || char === "?") return CONFIG.typeBaseDelay + 420;
    if (char === "\n") return CONFIG.typeBaseDelay + 120;
    return CONFIG.typeBaseDelay;
  };

  const tick = () => {
    const char = text[index] ?? "";
    target.textContent += char;
    target.scrollTop = target.scrollHeight;
    index += 1;
    if (index < text.length) {
      state.typingTimer = setTimeout(tick, delayFor(char));
    } else {
      signLetterName();
    }
  };

  tick();
}

function burstLetterHearts() {
  const scene = $("#letterScene");
  if (!scene) return;
  const icon = state.theme === "sakura" ? "🌸" : "💖";
  for (let i = 0; i < 6; i += 1) {
    const heart = document.createElement("span");
    heart.className = "letter-burst";
    heart.textContent = icon;
    heart.style.left = `${rand(28, 72)}%`;
    heart.style.bottom = `${rand(14, 24)}%`;
    heart.style.setProperty("--dx", `${rand(-90, 90)}px`);
    heart.style.setProperty("--dy", `${rand(140, 220)}px`);
    heart.style.animationDelay = `${(i * 0.07).toFixed(2)}s`;
    scene.appendChild(heart);
    setTimeout(() => heart.remove(), 2400);
  }
}

function signLetterName() {
  const signature = $("#letterSignature");
  const signatureWrap = signature?.closest(".signature");
  if (!signature) {
    $("#letterEnding")?.classList.add("show");
    burstLetterHearts();
    return;
  }

  const fullText = signature.dataset.signature || "Minh Phạm";
  signature.textContent = "";
  signatureWrap?.classList.add("is-signing");

  let index = 0;
  const tick = () => {
    signature.textContent += fullText[index] ?? "";
    index += 1;
    if (index < fullText.length) {
      state.typingTimer = setTimeout(tick, rand(72, 132));
      return;
    }
    signatureWrap?.classList.remove("is-signing");
    $("#letterEnding")?.classList.add("show");
    burstLetterHearts();
  };

  tick();
}

function startLetterSequence() {
  const girl = currentGirl();
  if (!girl) return;
  const scene = $("#letterScene");
  const envelope = $("#envelope");
  const paper = $("#letterPaper");
  const typing = $("#typing");
  if (!scene || !envelope || !paper || !typing) return;

  resetLetterScene();
  scene.classList.add("is-arriving");

  const t1 = setTimeout(() => envelope.classList.add("is-arrived"), 260);
  const t2 = setTimeout(() => envelope.classList.add("is-open"), 640);
  const t3 = setTimeout(() => {
    envelope.classList.add("is-paper");
    paper.classList.add("is-visible");
  }, 980);
  const tFloat = setTimeout(() => envelope.classList.add("is-floating"), 1040);
  const t4 = setTimeout(() => typeWriter(girl.letter, typing), 1220);
  state.letterTimers.push(t1, t2, t3, tFloat, t4);
}

function backToStage() {
  transitionToScreen(2, {
    effect: "drift",
  });
}

