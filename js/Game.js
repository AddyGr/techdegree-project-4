/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 /**
  * Game class
  * @class
  * @constructor
  */
 class Game{
     constructor(){
        this.missed = 0;
        this.phrases = [new Phrase('Hello world'),
                        new Phrase('Meow is annoying'),
                        new Phrase('Cat flaps'),
                        new Phrase('Water is wet'),
                        new Phrase('Boo'),
                        new Phrase('Procrastination')];
        this.activePhrase = 'null';
     }
     /**
      * Sets the current phrase by using the value of getRandomPhrase().
      * Hides the start screen.
      * Calls on addPhraseToDisplay() to generate the HTML li for each letter.
      * @method
      */
     startGame(){
        overlay.classList.remove('win')
        overlay.classList.remove('lose')
        overlay.classList.add('start')
        this.activePhrase = this.getRandomPhrase();
        overlay.style.display = 'none';
        this.activePhrase.addPhraseToDisplay();
        for (let heart of hearts){
            heart.style.display = '';
        }
        keyboard.style.display = '';
     }
     /**
      * Generates a random number
      * @method getRandomPhrase
      */
     getRandomPhrase(){
         return this.phrases[Math.floor(Math.random() * this.phrases.length)];
     }
     /**
      *  Method for game logic.
      * Checks to see if the keys have been selected, and the type of selection made (click or keyboard).
      * Checks to see if the key/button selected matches a letter in the phrase, checkLetter().
      * Will disable the selected letters(onscreen keyboard).  
      * Letters can only be guessed once.
      * If guess is wrong, removeLife() is called.
      * If there is a match showMatchedLetter() is called
      * checkForWin() is called if the letter is matched.
      * Calls gameOver() is checkForWin is true.
      * 
      * @method handleInteraction
      * @param {event.target/event.key} [e] - The event target or key, depending on the listener activated
      * @param {event.type} [type] - The event type triggered (click or keypress)
      */
     handleInteraction(e, type){
         if(type === 'click'){
            if(e.classList.contains('chosen') || e.classList.contains('wrong')){  
            } else if(this.activePhrase.checkLetter(e)){
                //if this is true (match), then...
                e.classList.add('chosen');
                this.activePhrase.showMatchedLetter(e.textContent);
                if(this.checkForWin() === true){
                    this.gameOver();
                }
            } else {
                //if this is not true (no match), then...
                e.classList.add('wrong');
                this.removeLife();
            }    
         } else if(type === 'keypress'){
                for (let key of keys){
                    if(key.classList.contains('chosen') || key.classList.contains('wrong')){  
                    } else if(key.textContent === e && this.activePhrase.checkLetter(e)){
                        //once the matching key is found, and it's a matching letter...
                        key.classList.add('chosen');
                        this.activePhrase.showMatchedLetter(e);
                        if(this.checkForWin() === true){
                            this.gameOver();
                        } 
                    } else if(key.textContent === e && this.activePhrase.checkLetter(e) !== true) {
                        //if this is not true (no match), then...
                        key.classList.add('wrong'); 
                        this.removeLife();
                    } 
            }        
         } 
     }
     /**
      * Will only work if the game is active (and there is no win screen), to prevent unwanted behavior.
      * Will remove a life if a guess was wrong.
      * liveHeart.png is replaced with a lostHeart.png 
      * Increments this.missed if needed. 
      * Calls gameOver() if 5 missed guesses. 
      * 
      * @method removeLife
      */
     removeLife(){
        if(overlay.classList.contains('win')){
        } else {
            const liveHeart = [];
            this.missed ++;
            for(let x = 0; x < hearts.length; x++){
                if(hearts[x].firstElementChild.classList != 'lostLife'){
                    liveHeart.push(hearts[x]);
                }
            }
            if(liveHeart.length > 1){//if they have any lives left
                liveHeart[0].firstElementChild.src = 'images/lostHeart.png';
                liveHeart[0].firstElementChild.classList.add('lostLife');
            } else { //else if no lives left, then game is over
                this.gameOver();
            }
        }
    }
        /**
         * Checks to see if the player has revealed all letters in the active phrase.
         * Increments unguessedLetters if any letters in the phrase are still 'hidden'.
         * Will return true if unguessLetters === 0.
         * 
         * @method checkForWin
         */
        checkForWin(){
            let unguessedLetters = 0; 
            for(let c = 0; c < this.activePhrase.phrase.length; c++){
                if(phraseSection.firstElementChild.children[c].classList.contains('hide')){
                    unguessedLetters ++;
                } 
            } 
            if(unguessedLetters === 0){
                return true;
            } 
        }
     /**
      * Will hide the letters of the phrase, to help override some CSS changes.
      * Will reset the added classes on the onscreen keys.
      * Displays the original start screen, and adjusts depending on the outcome of the game (using win/lose CSS classes).
      * Updates the overlay h1 element with a win or loss message.
      * A win screen will also display the correctly guessed phrase. 
      *
      * @method gameOver
      */
     gameOver(){
        this.activePhrase.letters.forEach(letter => letter.style.display = 'none');  
        const keysArray =  [].slice.call(keys);
        keysArray.forEach(key => {
            if(key.classList.contains('chosen')){
                key.classList.remove('chosen');
            } else if(key.classList.contains('wrong')){
                key.classList.remove('wrong');
            }
        });
        overlay.style.display = '';
        if(this.missed === 5){
            for (let heart of hearts){
                heart.style.display = 'none';
            }
            keyboard.style.display = 'none';
            overlay.classList.remove('start');
            overlay.classList.add('lose');
            document.getElementById('game-over-message').textContent = 'Sorry, you ran out of lives...';  
              
        } else {
            for (let heart of hearts){
                heart.style.display = 'none';
            }
            keyboard.style.display = 'none';
            overlay.classList.remove('start');
            overlay.classList.add('win');
            document.getElementById('game-over-message').textContent = 'You won!';
            const winningPhrase = document.createElement('h4');
            winningPhrase.setAttribute('id', 'winning-phrase-over-screen');
            overlay.insertBefore(winningPhrase, document.getElementById('btn__reset'));
            winningPhrase.innerHTML = `The phrase was: "${this.activePhrase.phrase}"`; 
        }  
     }
 }