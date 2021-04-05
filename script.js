'use strict';

let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//we can also write as
//const score1 =document.getElementById("score--1");
//in above statement we need not use the # to select the id
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
let scores, current, activePlayer, playing;
//rolling the
let init = function () {
  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

const switchplayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceroll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceroll}.png`;
    if (diceroll != 1) {
      current += diceroll;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    } else {
      switchplayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchplayer();
    }
  }
});
btnNew.addEventListener('click', init);
