/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const buttonElement = document.getElementById('btn__reset');


// Event listener for start game button.
buttonElement.addEventListener('click', () => {
  game = new Game();
  game.startGame();
})

const keyElement = document.getElementById('qwerty');

// Event listener for keyboard click.
keyElement.addEventListener('click',(e) => {
  game.handleInteractions(e);
})
