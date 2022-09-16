'use strict';

// Selector for id
// Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
// is a little bit faster then query selector
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let playing;

const initial = function () {
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    diceEL.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
}

initial();

const chnagePLayer = function () { 
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; //If active player 0 then change to 1 : else 0

    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

// ROLLING DICE FUNCTION
btnRoll.addEventListener('click', function () {
    if(playing){
        // Generate a random dice roll
        let dice = Math.trunc(Math.random() * 6 ) + 1;
        // Display the dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`; //template literal
        // check for roll 1
        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; // by active player
        } else { // If true switch to next player.
            chnagePLayer();
        }
    }

});

btnHold.addEventListener('click', function () {
    if(playing){
        // Add current score to active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // Check if player's score is >= 100
        if(scores[activePlayer] >= 100){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEL.classList.add('hidden');
    
        } else{
            chnagePLayer();
        }
    }

});

btnNew.addEventListener('click', initial);