// Elements
const gameBoard = document.getElementById("game-board");
const startBtn = document.getElementById("startBtn");
const difficultySelect = document.getElementById("difficulty");
const timerDisplay = document.getElementById("time");
const modal = document.getElementById("modal");
const finalTime = document.getElementById("final-time");
const rankLine = document.getElementById("rank-line");
const closeModal = document.getElementById("closeModal");
const playAgain = document.getElementById("playAgain");
const themeToggle = document.getElementById("themeToggle");
const confettiCanvas = document.getElementById("confetti-canvas");

// Sounds
const flipSound = document.getElementById("flip-sound");
const matchSound = document.getElementById("match-sound");
const winSound = document.getElementById("win-sound");

// Stats
const winsEl = document.getElementById("wins");
const lossesEl = document.getElementById("losses");
const bestEasy = document.getElementById("best-easy");
const bestMedium = document.getElementById("best-medium");
const bestHard = document.getElementById("best-hard");

// Leaderboards
const lbEasy = document.getElementById("lb-easy");
const lbMedium = document.getElementById("lb-medium");
const lbHard = document.getElementById("lb-hard");

// Game state
let timerInterval, startTime, gridSize, totalPairs, timeLimit;
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

const emojis = [
  "🍎","🍌","🍇","🍉","🍓","🥕","🥦","🥑",
  "🍔","🍟","🍕","🍩","🍪","🎂","🍫","🍭",
  "🐶","🐱","🐭","🐰","🦊","🐻","🐼","🐨",
  "🐯","🦁","🐮","🐷","🐸","🐵","🐤","🐧",
  "🐠","🐳","🦄","🐙","🐝","🦋","🌸","🌵",
  "⭐","🌙","☀️","⚽","🏀","🎲","🎧","🎸",
  "🚗","✈️","🚀","🏰","🧁","🥨","🍔","🍣"
];

function setDifficulty(level) {
  if (level === "easy") { gridSize = 4; timeLimit = 120; }
  if (level === "medium") { gridSize = 6; timeLimit = 180; }
  if (level === "hard") { gridSize = 8; timeLimit = 240; }
  document.documentElement.style.setProperty("--cols", gridSize);
  totalPairs = (gridSize * gridSize) / 2;
}

function startGame() {
  setDifficulty(difficultySelect.value);
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  flippedCards = [];
  lockBoard = false;
  clearInterval(timerInterval);
  startTime = Date.now();

  const selectedEmojis = shuffle(emojis).slice(0, totalPairs);
  const cardsArray = shuffle([...selectedEmojis, ...selectedEmojis]);

  cardsArray.forEach(emoji => {
    const card = document.createElement("button");
    card.className = "card";
    card.setAttribute("aria-label", "card");
    card.innerHTML = `
      <div class="front">?</div>
      <div class="back">${emoji}</div>
    `;
    card.addEventListener("click", () => flipCard(card, emoji));
    gameBoard.appendChild(card);
  });

  timerInterval = setInterval(updateTimer, 250);
  updateTimer();
}

function flipCard(card, emoji) {
  if (lockBoard) return;
  if (card.classList.contains("flip")) return;
  if (flippedCards.length === 2) return;

  safePlay(flipSound);
  card.classList.add("flip");
  flippedCards.push({ card, emoji });

  if (flippedCards.length === 2) {
    lockBoard = true;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;
  if (first.emoji === second.emoji) {
    safePlay(matchSound);
    // Permanently disable interaction
    first.card.style.pointerEvents = "none";
    second.card.style.pointerEvents = "none";
    flippedCards = [];
    matchedPairs++;
    lockBoard = false;

    if (matchedPairs === totalPairs) endGame(true);
  } else {
    setTimeout(() => {
      first.card.classList.remove("flip");
      second.card.classList.remove("flip");
      flippedCards = [];
      lockBoard = false;
    }, 750);
  }
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const remaining = Math.max(0, timeLimit - elapsed);
  timerDisplay.textContent = formatTime(remaining);
  if (remaining <= 0) {
    clearInterval(timerInterval);
    endGame(false);
  }
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function endGame(won) {
  clearInterval(timerInterval);
  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  updateStats(won, totalTime);

  if (won) {
    finalTime.textContent = formatTime(totalTime);
    // Update leaderboard and show rank
    const level = difficultySelect.value;
    const { rank, list } = pushToLeaderboard(level, totalTime);
    rankLine.textContent = rank ? `Your rank for ${capitalize(level)}: #${rank}` : "";
    renderLeaderboards(); // refresh UI
    safePlay(winSound);

    // Confetti!
    fireConfetti(3000);
    modal.classList.remove("hidden");
  }
}

function updateStats(won, totalTime) {
  const stats = JSON.parse(localStorage.getItem("memoryStats")) ||
    { wins: 0, losses: 0, bestTimes: { easy: null, medium: null, hard: null } };

  if (won) {
    stats.wins++;
    const level = difficultySelect.value;
    if (!stats.bestTimes[level] || totalTime < stats.bestTimes[level]) {
      stats.bestTimes[level] = totalTime;
    }
  } else {
    stats.losses++;
  }
  localStorage.setItem("memoryStats", JSON.stringify(stats));
  loadStats();
}

/* ===== Leaderboard Helpers ===== */
function getLeaderboard() {
  return JSON.parse(localStorage.getItem("memoryLeaderboard")) || {
    easy: [], medium: [], hard: []
  };
}
function setLeaderboard(lb) {
  localStorage.setItem("memoryLeaderboard", JSON.stringify(lb));
}
function pushToLeaderboard(level, timeSec) {
  const lb = getLeaderboard();
  const arr = lb[level] || [];
  arr.push(timeSec);
  arr.sort((a,b)=>a-b);
  if (arr.length > 5) arr.length = 5;
  lb[level] = arr;
  setLeaderboard(lb);
  const rank = arr.indexOf(timeSec) + 1 || null;
  return { rank: rank || null, list: arr };
}
function renderLeaderboards() {
  const lb = getLeaderboard();
  renderLBList(lb.easy, lbEasy);
  renderLBList(lb.medium, lbMedium);
  renderLBList(lb.hard, lbHard);
}
function renderLBList(times, el) {
  el.innerHTML = "";
  if (!times || times.length === 0) {
    const li = document.createElement("li");
    li.textContent = "—";
    el.appendChild(li);
    return;
  }
  times.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${i+1}. ${formatTime(t)}`;
    el.appendChild(li);
  });
}

/* ===== UI / Theme / Stats ===== */
function loadStats() {
  const stats = JSON.parse(localStorage.getItem("memoryStats")) ||
    { wins: 0, losses: 0, bestTimes: { easy: null, medium: null, hard: null } };
  winsEl.textContent = stats.wins;
  lossesEl.textContent = stats.losses;
  bestEasy.textContent = stats.bestTimes.easy ? formatTime(stats.bestTimes.easy) : "--";
  bestMedium.textContent = stats.bestTimes.medium ? formatTime(stats.bestTimes.medium) : "--";
  bestHard.textContent = stats.bestTimes.hard ? formatTime(stats.bestTimes.hard) : "--";
}

function applyTheme(dark) {
  if (dark) {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙 Dark Mode";
  }
}

themeToggle.addEventListener("click", () => {
  const darkMode = !document.body.classList.contains("dark");
  applyTheme(darkMode);
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
});

window.onload = () => {
  loadStats();
  renderLeaderboards();
  const darkMode = JSON.parse(localStorage.getItem("darkMode"));
  applyTheme(!!darkMode);
};

startBtn.addEventListener("click", startGame);
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
playAgain.addEventListener("click", () => { modal.classList.add("hidden"); startGame(); });

/* ===== Confetti (lightweight, no libs) ===== */
function fireConfetti(durationMs = 2500) {
  const ctx = confettiCanvas.getContext("2d");
  const W = confettiCanvas.width = window.innerWidth;
  const H = confettiCanvas.height = window.innerHeight;
  confettiCanvas.style.display = "block";

  const colors = ["#ff5d5d","#ffd166","#06d6a0","#118ab2","#9b5de5","#f15bb5"];
  const pieces = Array.from({ length: Math.floor(W/10) }, () => ({
    x: Math.random()*W,
    y: -20 - Math.random()*H,
    w: 6 + Math.random()*8,
    h: 10 + Math.random()*16,
    r: Math.random()*2*Math.PI,
    s: 1 + Math.random()*3,
    rs: (Math.random()-0.5)*0.2,
    color: colors[Math.floor(Math.random()*colors.length)]
  }));

  let start = null;
  function draw(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    ctx.clearRect(0,0,W,H);

    pieces.forEach(p => {
      p.y += p.s * 3;
      p.x += Math.sin((p.y+p.r)*0.02) * 1.5;
      p.r += p.rs;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();

      if (p.y > H + 30) {
        p.y = -20; p.x = Math.random()*W;
      }
    });

    if (elapsed < durationMs) {
      requestAnimationFrame(draw);
    } else {
      confettiCanvas.style.display = "none";
      ctx.clearRect(0,0,W,H);
    }
  }
  requestAnimationFrame(draw);
}
window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

/* ===== Utils ===== */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function capitalize(s){ return s[0].toUpperCase() + s.slice(1); }
function safePlay(audioEl){ audioEl && audioEl.currentTime !== undefined && audioEl.play && audioEl.play().catch(()=>{}); }

