const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const playerSelect = document.getElementById('player');
const board = document.querySelector('.board');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = 'X';

startButton.addEventListener('click', () => {
  currentPlayer = playerSelect.value;
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 10);
  } else if (isDraw()) {
    setTimeout(() => alert(`It's a draw!`), 10);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(currentPlayer) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
}
