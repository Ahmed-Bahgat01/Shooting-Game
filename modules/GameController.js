import { BirdController } from './BirdController.js';
import { BombController } from './BombController.js';
import { ConfigController } from './ConfigController.js';

export class GameController {
  constructor() {
    console.log('GameController consturctor');
  }
  startGame(level) {
    createGameHeader();

    // listen for killed bird event on score
    document.addEventListener('killedbird', (e) => {
      killedBirdListner(e);
    });

    // listen for explosion
    document.addEventListener('bombexplode', (e) => {
      bombExplosionListner(e);
    });

    // configs
    const configs = new ConfigController(level).configs;
    // create game controllers
    const newBird = new BirdController(level);
    const newBomb = new BombController(level);

    // creating birds and bombs
    const createBirdsInterval = setInterval(function () {
      newBird.flyRandomBird();
    }, configs.gameConfigs.birdCreationInterval);

    const createBombsInterval = setInterval(function () {
      newBomb.throwBomb();
    }, configs.gameConfigs.bombCreationInterval);
  }
}

let createGameHeader = function () {
  let templateGameHeader = document.querySelector(
    '.gameHeaderTemplate'
  ).content;

  // prepare values
  templateGameHeader.querySelector('.playerLabel').innerHTML = `Bahgat`;
  templateGameHeader.querySelector('.scoreLabel').innerHTML = 0;
  templateGameHeader.querySelector('.timeLimitLabel').innerHTML = `00:00`;
  templateGameHeader.querySelector('.birdsKilledLabel').innerHTML = 0;
  templateGameHeader.querySelector('.levelLabel').innerHTML = 1;

  let newGameHeader = templateGameHeader.cloneNode(true);
  document.body.append(newGameHeader);
};

let killedBirdListner = function (event) {
  const scoreLabel = document.querySelector('.scoreLabel');
  const birdsKilledLabel = document.querySelector('.birdsKilledLabel');
  scoreLabel.innerHTML = parseInt(scoreLabel.innerHTML) + event.detail;
  birdsKilledLabel.innerHTML = parseInt(birdsKilledLabel.innerHTML) + 1;
  event.target.remove();
}; //class GameController

// === Utility Functions ===

let bombExplosionListner = function (event) {
  event.target.remove();

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
};
