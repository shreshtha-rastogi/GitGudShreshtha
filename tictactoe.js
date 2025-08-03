const game = document.getElementById('game');
const status = document.getElementById('status');
const reset = document.getElementById('reset');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6] // diags
];

function renderBoard() {
  game.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleMove(index));
    game.appendChild(cellDiv);
  });
}

function handleMove(index) {
  if (!gameActive || cells[index] !== '') return;
  cells[index] = currentPlayer;
  renderBoard();
  checkResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameActive) status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      status.textContent = `Player ${cells[a]} wins! 🎉`;
      gameActive = false;
      return;
    }
  }
  if (!cells.includes('')) {
    status.textContent = "It's a draw!";
    gameActive = false;
  }
}

reset.addEventListener('click', () => {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player X's turn`;
  renderBoard();
});

renderBoard();