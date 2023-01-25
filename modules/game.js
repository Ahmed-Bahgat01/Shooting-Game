import { BirdController } from './BirdController.js';
import { BombController } from './BombController.js';
import { ConfigController } from './ConfigController.js';

window.addEventListener('load', function () {
  let level = 1;
  const configs = new ConfigController(level).configs;

  let templateMainMenu = this.document.querySelector(
    '.main-menu-template'
  ).content;
  let newMainMenu = templateMainMenu.cloneNode(true);

  // =======create main menu=========
  this.document.querySelector('body').append(newMainMenu);

  // start game click
  let startGameButton = this.document.querySelector('button');
  startGameButton.onclick = function (event) {
    // TODO: handle user configuration

    document.querySelector('.main-menu').remove();

    // listen for killed bird event on score
    const scoreLabel = document.querySelector('#scoreLabel');
    document.addEventListener('killedbird', function (event) {
      console.log(event);
      scoreLabel.innerHTML = parseInt(scoreLabel.innerHTML) + event.detail;
      event.target.remove();
    });

    // listen for explosion
    document.addEventListener('bombexplode', function (event) {
      event.target.remove();

      console.log('bombexplosion event game');
      console.log(event);
      console.log(event.detail);

      let bombCenter, explodeRadius;
      ({ bombCenter, explodeRadius } = event.detail);

      console.log(`explode r: ${explodeRadius}`);

      // check all birds positions to kill near ones
      // TODO: ref events [click]
      let birds = document.querySelectorAll('.bird');
      let birdCenter = {};
      let difference = {};
      let birdBombDistance = 0;
      birds.forEach((bird) => {
        // bird.click();
        birdCenter = {
          x: parseInt(bird.style.left) + bird.width / 2,
          y: parseInt(bird.style.top) + bird.height / 2,
        };
        difference = {
          x: bombCenter.x - birdCenter.x,
          y: bombCenter.y - birdCenter.y,
        };

        birdBombDistance = Math.sqrt(
          difference.x * difference.x + difference.y * difference.y
        );
        if (birdBombDistance < explodeRadius) {
          console.log('bird auto click');
          bird.click();
        }
      });
    });

    // create game controller
    let newBird = new BirdController();
    let newBomb = new BombController();
    let createBirdsInterval = setInterval(function () {
      newBird.flyRandomBird();
    }, configs.gameConfigs.birdCreationInterval);
    // newBird.flyRandomBird();

    let createBombsInterval = setInterval(function () {
      newBomb.throwBomb();
    }, configs.gameConfigs.bombCreationInterval);

    // newBird.flyRandomBird();
    // newBomb.throwBomb();
    // newBird.flyRandomBird();
    // newBomb.throwBomb();
    // newBird.flyRandomBird();
    // newBomb.throwBomb();
  };
});

// TODO: get user inputs from form
// TODO: save user data into local storage
