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

  // This method checks to see if the button clicked or key pressed by the player matches a letter in the phrase, and then directs the game based on a correct or incorrect guess
  handleInteractions(letter) {
    const keyElements = document.querySelectorAll('.key');
    let matchedIndex = 0;
    for (let i = 0; i < keyElements.length; i++) {
      if (keyElements[i].textContent === letter) {
        matchedIndex = i;
        break;
      }
    }

    // Disable the selected letter’s onscreen keyboard button.
    keyElements[matchedIndex].disabled = true

    // If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button and call the showMatchedLetter() method on the phrase.
    if(this.activePhrase.checkLetter(letter)){
      keyElements[matchedIndex].className = 'key chosen';
      this.activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) {
        this.gameOver('win');
      }
    } else {
      //If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
      keyElements[matchedIndex].className = 'key wrong';
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

  // There will be 2 condition, one when game is over a user wins and other when user looses, so accordingly display messages.
  gameOver(resultsClass) {
    const gameOverMessage = document.getElementById('game-over-message');
    const overlay = document.getElementById('overlay');
    const buttonReset = document.getElementById('btn__reset');

    overlay.style.display = 'flex';
    if(resultsClass === 'win') {
      gameOverMessage.innerText = "Congratulations! You won";
      overlay.className = 'win';
    } else if (resultsClass === 'lose'){
      gameOverMessage.innerText = "Sorry, better luck next time";
      overlay.className = 'lose';
    }
    this.resetGame();
  }

  resetGame() {
    // Remove li elements from Phrase ul element
    const phraseElement = document.querySelector('#phrase ul');
    while (phraseElement.firstChild) {
      phraseElement.removeChild(phraseElement.firstChild)
    }

    // Enable all the onscreen keyboard buttons & reset their css
    const keyElement = document.querySelectorAll('.key');
    for (let i = 0; i < keyElement.length; i++) {
      keyElement[i].disabled = false;
      keyElement[i].classList.remove('chosen', 'wrong');
    }

    // Reset all the heart images to show live hearts.
    const hearts = document.querySelectorAll('img');
    for(let i = 0; i < hearts.length; i++) {
      hearts[i].src = 'images/liveHeart.png';
    }
  }
};
