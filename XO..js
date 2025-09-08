const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let scoreX = 0;
let scoreO = 0;
let currentPlayer = 'X'; // X emoji
let nextPlayer = 'O';    // O emoji




let gameActive = true;

function handleClick(e) {
 

  const cell = e.target;
  if (cell.textContent !== '' || !gameActive) return;

    
 cell.textContent = currentPlayer;
statusText.textContent = `Player ${currentPlayer}'s turn`;


    const aiToggle = document.getElementById('aiToggle');

function makeAIMove() {
  const emptyCells = [...cells].filter(cell => cell.textContent === '');
  if (emptyCells.length === 0) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
    }
          if (aiToggle.checked && currentPlayer === 'X' && gameActive) {
  setTimeout(makeAIMove, 100); // slight delay for realism
}


    if (checkWin()) {
      if (currentPlayer === 'X') {
  scoreX++;
  document.getElementById('scoreX').textContent = scoreX;
} else {
  scoreO++;
  document.getElementById('scoreO').textContent = scoreO;
}

    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
    

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer;
    });
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

}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
cells.forEach(cell => {
  cell.textContent = '';
  cell.classList.remove('winning-cell');
});

}
    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartBtn.addEventListener('click', restartGame);

