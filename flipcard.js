const board = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

const emojis = ['🐶', '🐱', '🐼', '🦊', '🐸', '🐵', '🐷', '🐯'];
let cards = [...emojis, ...emojis]; // duplicate emojis to create pairs
let flippedCards = [];
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  board.innerHTML = '';
  shuffle(cards);

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = emoji;

    card.addEventListener('click', () => {
      if (lockBoard || card.classList.contains('flip')) return;

      card.classList.add('flip');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkForMatch();
      }
    });

    board.appendChild(card);
  });
}

function checkForMatch() {
  const [first, second] = flippedCards;
  const isMatch = first.dataset.emoji === second.dataset.emoji;

  if (!isMatch) {
    lockBoard = true;
    setTimeout(() => {
      first.classList.remove('flip');
      second.classList.remove('flip');
      lockBoard = false;
      flippedCards = [];
    }, 800);
  } else {
    flippedCards = [];
  }
}

restartBtn.addEventListener('click', () => {
  flippedCards = [];
  lockBoard = false;
  createBoard();
});

createBoard();