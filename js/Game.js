/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      "Life is short",
      "live and let live",
      "Aspire to inspire before we expire",
      "Embrace the glorious mess that you are",
      "Stay hungry Stay foolish"
    ];
    this.activePhrase = null;
  }

  // This function initialises the game.
  startGame() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    this.activePhrase = new Phrase(this.getRandomPhrase());
    this.activePhrase.addPhraseToDisplay();
  }

  // This method randomly retrieves one of the phrases stored in the
  // phrases array and returns it.
  getRandomPhrase() {
    let randPhrase = Math.floor((Math.random() * this.phrases.length));
    return this.phrases[randPhrase];
  }

  // This method checks to see if the button clicked by the player
  // matches a letter in the phrase, and then directs the game
  // based on a correct or incorrect guess
  handleInteractions(event) {
    // Disable the selected letter’s onscreen keyboard button.
    const letter = event.target.textContent;
    event.target.disabled = true;

    // If the phrase includes the guessed letter, add the chosen CSS class
    // to the selected letter's keyboard button and
    // call the showMatchedLetter() method on the phrase.
    if(this.activePhrase.checkLetter(letter)){
      event.target.className = 'chosen'
      this.activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) {
        this.gameOver('win');
      }
    } else {
      //If the phrase does not include the guessed letter, add the wrong
      // CSS class to the selected letter's keyboard button and
      // call the removeLife() method.
      event.target.className = 'wrong'
      this.removeLife();
    }
  }

  //This method removes a life from the scoreboard
  removeLife() {
    let hearts = document.getElementsByClassName('tries');

    if (this.missed < 5) {
      const heartImage = hearts[this.missed].firstChild;
      // Replace the liveHeart.png images with a lostHeart.png image
      heartImage.setAttribute('src', 'images/lostHeart.png');
      // Increments the missed property.
      this.missed += 1;
    } else {
      this.gameOver('lose');
    }
  }

  checkForWin() {
    let lettersHidden = document.getElementsByClassName('hide');
    return lettersHidden.length === 0;
    }

  // There will be 2 condition, one when game is over a user wins and
  // other when user looses, so accordingly display messages.
  gameOver(resultsClass) {
    const gameOverMessage = document.getElementById('game-over-message');
    console.log(gameOverMessage);
    const overlay = document.getElementById('overlay');
    console.log(overlay);
    overlay.style.display = 'block'
    if(resultsClass === 'win') {
      gameOverMessage.innerText = "Congratulations! You won";
      overlay.className = 'win';
    } else if (resultsClass === 'lose'){
      gameOverMessage.innerText = "Sorry, better luck next time";
      overlay.className = 'lose';
    }
  }
};
