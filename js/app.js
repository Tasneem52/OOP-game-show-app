/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
let keysPressed = []

const buttonElement = document.getElementById('btn__reset');

// Event listener for start game button.
buttonElement.addEventListener('click', () => {
  game = new Game();
  game.startGame();
  keysPressed = [];
});

const keyElement = document.getElementById('qwerty');

// Event listener for keyboard click.
keyElement.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    game.handleInteractions(e.target.textContent);
  }
})

// Event listener for keyboard press.
const alphabetRegex = /[a-zA-Z]+/;
document.addEventListener('keypress', (e) => {
  if (alphabetRegex.test(e.key) && e.key != 'Enter') {
    if (!keysPressed.includes(e.key.toLowerCase())) {
      keysPressed.push(e.key.toLowerCase())
      game.handleInteractions(e.key.toLowerCase());
    }
  }
});
