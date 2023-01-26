import { BirdController } from './BirdController.js';
import { BombController } from './BombController.js';
import { ConfigController } from './ConfigController.js';
import { GameController } from './GameController.js';

window.addEventListener('load', function () {
  let level = 1;

  // =======create main menu=========
  let templateMainMenu = this.document.querySelector(
    '.main-menu-template'
  ).content;
  let newMainMenu = templateMainMenu.cloneNode(true);
  this.document.querySelector('body').append(newMainMenu);

  // start game click listner
  let startGameButton = this.document.querySelector('button');
  startGameButton.onclick = function (event) {
    // TODO: handle user configuration

    document.querySelector('.main-menu').remove();

    // start game
    let newGame = new GameController(level);
    newGame.startGame();
  };
});

// TODO: get user inputs from form
// TODO: save user data into local storage
