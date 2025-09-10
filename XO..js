
// Select DOM elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const aiToggle = document.getElementById('aiToggle');

// Sound effect functions
function playClickSound() {
  const sound = document.getElementById("clickSound");
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

function playWinSound() {
  const sound = document.getElementById("winSound");
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

function playDrawSound() {
  const sound = document.getElementById("drawSound");
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

// Game state variables
let scoreX = 0;
let scoreO = 0;
let currentPlayer = 'X';
let gameActive = true;
let aiPlayer = 'O'; // AI plays as 'O' by default

// Handle cell click
function handleClick(e) {
  const cell = e.target;
  if (cell.textContent !== '' || !gameActive) return;

  makeMove(cell);

  // If AI mode is on and it's AI's turn, trigger AI move
  if (aiToggle.checked && currentPlayer === aiPlayer && gameActive) {
    setTimeout(makeAIMove, 300);
  }
}

// Make a move
function makeMove(cell) {
  cell.textContent = currentPlayer;
  cell.classList.add('clicked');
  setTimeout(() => cell.classList.remove('clicked'), 300);
  playClickSound();

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    playWinSound();
    updateScore();
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    playDrawSound();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// AI move logic
function makeAIMove() {
  const emptyCells = [...cells].filter(cell => cell.textContent === '');
  if (emptyCells.length === 0 || !gameActive) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomCell);
}

// Update score
function updateScore() {
  if (currentPlayer === 'X') {
    scoreX++;
    document.getElementById('scoreX').textContent = scoreX;
  } else {
    scoreO++;
    document.getElementById('scoreO').textContent = scoreO;
  }
}

// Check for win
function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      cells[a].classList.add('winning-cell');
      cells[b].classList.add('winning-cell');
      cells[c].classList.add('winning-cell');
      return true;
    }
    return false;
  });
}

// Check for draw
function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// Restart game
function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell', 'clicked');
  });

  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  ['clickSound', 'winSound', 'drawSound'].forEach(id => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });

  // If AI starts first
  if (aiToggle.checked && currentPlayer === aiPlayer) {
    setTimeout(makeAIMove, 300);
  }
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'))
    .catch(error => console.error('Service Worker registration failed:', error));
}

// Initial AI move if needed
window.addEventListener('load', () => {
  if (aiToggle.checked && currentPlayer === aiPlayer) {
    setTimeout(makeAIMove, 300);
  }
});

