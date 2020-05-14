/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
document.addEventListener("DOMContentLoaded", function() {
    // code...
  });
/**
 * Global variables
 * @global
 */
const overlay = document.getElementById('overlay');
const phraseSection = document.getElementById('phrase');
const keyboard = document.getElementById('qwerty');
const keys = keyboard.getElementsByClassName('key');
const startButton = document.getElementById('btn__reset');
const hearts = document.getElementById('scoreboard').firstElementChild.children;
let game;

/**
 * To start out with the lives and keyboard hidden.
 * (Some CSS was overridding it being hidden, causing it to sit on top)
 */
for (let heart of hearts){
    heart.style.display = 'none';
}
keyboard.style.display = 'none';

/**
 * Event listener for clicking on the start button.
 * Will remove the list elements that were added (if any).
 * Resets the lives for the player.
 * Creates a new Game object.
 * Runs the startGame function.
 * 
 */
startButton.addEventListener('click', (e) => {
    while(phraseSection.firstElementChild.firstChild){
        phraseSection.firstElementChild.removeChild(phraseSection.firstElementChild.firstElementChild)
    }
    while(document.getElementById('winning-phrase-over-screen')){
        overlay.removeChild(document.getElementById('winning-phrase-over-screen'));
    }
    const livesArray = [].slice.call(hearts); 
        livesArray.forEach(life => {
            life.firstElementChild.src = 'images/liveHeart.png';
            life.firstElementChild.classList.remove('lostLife');
        });
    game = new Game;
    game.startGame(); 
    //keyboard.focus();  
});

/**
 * Event listener for clicking on the onscreen keyboard keys.
 * Ensures that the key is being clicked on.
 * Calls on the handleInteraction function, passing in the event target and event type.
 */
keyboard.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains('key')){
        game.handleInteraction(e.target, e.type); 
    }
});

/**
 * Event listener for using a physical keyboard.
 * Prevents keys presses from interfering with the win/lose screen.
 * Calls on the handleInteraction function, passing in the event key and event type.
 */
document.addEventListener('keypress', (e) => {
    if(overlay.classList.contains('win')
        || overlay.classList.contains('lose')){
    } else {
        game.handleInteraction(e.key, e.type); 
    }
    
});