
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

// Handle cell click
function handleClick(e) {
  const cell = e.target;
  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add('clicked'); // Add bounce animation
  setTimeout(() => cell.classList.remove('clicked'), 300);
  playClickSound();

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    playWinSound();

    if (currentPlayer === 'X') {
      scoreX++;
      document.getElementById('scoreX').textContent = scoreX;
    } else {
      scoreO++;
      document.getElementById('scoreO').textContent = scoreO;
    }

  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    playDrawSound();

  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    if (aiToggle.checked && currentPlayer === 'X' && gameActive) {
      setTimeout(makeAIMove, 100);
    }
  }
}

// AI move logic
function makeAIMove() {
  const emptyCells = [...cells].filter(cell => cell.textContent === '');
  if (emptyCells.length === 0) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = currentPlayer;
  randomCell.classList.add('clicked');
  setTimeout(() => randomCell.classList.remove('clicked'), 300);
  playClickSound();

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    playWinSound();
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    playDrawSound();
  } else {
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for win
function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let pattern of winPatterns) {
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
  }
  return false;
}

// Check for draw
function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// Restart game
function restartGame() {
  // Clear board and reset visuals
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
    cell.classList.remove('clicked');
  });

  // Reset game state
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  // Stop and reset all sounds
  const sounds = ['clickSound', 'winSound', 'drawSound'];
  sounds.forEach(id => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
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

