import { GameController } from './GameController.js';

window.addEventListener('load', function () {
  let level = 1;

  // =======create main menu=========
  const templateMainMenu = this.document.querySelector(
    '.main-menu-template'
  ).content;
  let newMainMenu = templateMainMenu.cloneNode(true);
  this.document.querySelector('body').append(newMainMenu);

  // start game click listner
  let startGameButton = this.document.querySelector('button');
  startGameButton.onclick = function (event) {
    // take user input
    const selectLevelElement = document.querySelector(
      '.levels-select-grid-item'
    );
    const name = document.querySelector('.input-grid-item').value;
    // let name =
    if (validateInput(name)) {
      document.querySelector('.main-menu').remove();
      // start game
      let newGame = new GameController(level);
      newGame.showGame(level, name);
    }
  };
});

let validateInput = function (name) {
  if (name == '') {
    let erroMessageElement = document.querySelector('.formErrorMessage');
    erroMessageElement.innerHTML = '* Name Is Required';
    erroMessageElement.classList.remove('hidden');
    return false;
  } else return true;
};
