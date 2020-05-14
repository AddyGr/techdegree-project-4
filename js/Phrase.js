/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 /**
  * Phrase class
  * @class
  * @constructor @param {string} [phrase] - the active phrase, passed from the Game constructor (this.phrases)
  */
 class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
        this.letters = [];
    }
    /**
     * Creates and appends <li>s for each letter of the active phrase.
     * Allows the phrase to be shown on screen, but hidden (CSS classes added)
     * 
     * @method addPhraseToDisplay
     */
    addPhraseToDisplay(){
        for(let x = 0; x < this.phrase.length; x++){
            const li = document.createElement('li');
            if(this.phrase[x] === ' '){
                li.classList.add('space');    
            } else {
                li.classList.add('hide');
                li.classList.add('letter');
                li.classList.add(`${this.phrase[x]}`); 
                li.textContent = (`${this.phrase[x]}`);
                this.letters.push(li);   
            }
            phraseSection.firstElementChild.appendChild(li);
        }
    }
    /**
     * Checks to see if the letter selected matches one in the active phrase.
     * returns true if there's a match.
     * 
     * @method checkLetter
     * @param {event.target/event.key} letter - value of the key/letter selected
     */
    checkLetter(letter){
        for(let z = 0; z < this.phrase.length; z++){
            let currentLetter = this.phrase[z];
            if(letter.textContent === currentLetter || letter === currentLetter){
                return true;
            } 
        }
    }
    /**
     * Will show any letters that are matching in the active phrase.
     * 
     * @method showMatchedLetter
     * @param {event.textContent/event} [letter] - receives the letter pressed from Game.handleInteraction()
     */
    showMatchedLetter(letter){
        for(let c = 0; c < phraseSection.firstElementChild.children.length; c++){
            if(phraseSection.firstElementChild.children[c].classList.contains(letter)){
                phraseSection.firstElementChild.children[c].classList.remove('hide');
                phraseSection.firstElementChild.children[c].classList.remove('letter');
                phraseSection.firstElementChild.children[c].classList.remove(letter);
                phraseSection.firstElementChild.children[c].classList.add('show'); 
                phraseSection.firstElementChild.children[c].classList.add('letter'); 
                phraseSection.firstElementChild.children[c].classList.add(letter); 
            }
        }
        
    }
 }

 