/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  // Adds letter placeholders to the display when the game starts.
  addPhraseToDisplay() {
    let phraseElement = document.querySelector('#phrase ul');
    for (let i = 0; i < this.phrase.length; i++ ) {
        let list = document.createElement('li')
      if(this.phrase[i] === ' ') {
        list.className = 'space';
      } else {
        list.className = `hide letter ${this.phrase[i]} `;
      }
      list.textContent = this.phrase[i]
      phraseElement.appendChild(list);
    }
  }

  // Check to see if the letter was guessed correctly.
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  // Reveals the letter(s) on the board that matches the player's selection.
  showMatchedLetter(letter) {
    let phraseLetters = document.getElementsByClassName('letter');
    for (let i = 0; i < phraseLetters.length; i++) {
      // When the player correctly guesses a letter, the empty box
      // is replaced with the matched letter
      if(phraseLetters[i].textContent === letter) {
          phraseLetters[i].className = 'show letter';
      }
    }
  }
};
