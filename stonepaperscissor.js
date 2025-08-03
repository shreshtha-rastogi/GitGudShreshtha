function playGame(userChoice) {
  const choices = ['stone', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById('user-choice').innerText = `Your Choice: ${userChoice}`;
  document.getElementById('computer-choice').innerText = `Computer's Choice: ${computerChoice}`;

  let result = '';

  if (userChoice === computerChoice) {
    result = "It's a draw!";
  } else if (
    (userChoice === 'stone' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'stone') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'You win!';
  } else {
    result = 'Computer wins!';
  }

  document.getElementById('winner').innerText = `Result: ${result}`;
}
