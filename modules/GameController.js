import { BirdController } from './BirdController.js';
import { BombController } from './BombController.js';
import { ConfigController } from './ConfigController.js';

export class GameController {
  constructor() {
    console.log('GameController consturctor');
  }
  showGame(level) {
    createStartGameWidget(level);
    // startGame(level);
  }
} //class GameController

// === Utility Functions ===
//

const createStartGameWidget = function (level) {
  const template = document.querySelector('.startGameWidgetTemplate').content;
  const newWidget = template.cloneNode(true);
  document.body.append(newWidget);
  const startGameBtn = document.querySelector('.startGameBtn');
  startGameBtn.addEventListener('click', function () {
    document.querySelector('.startGameWidget').remove();
    startGame(level);
  });
};

const startGame = function (level) {
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

  // start timer
  startGameTimer(
    createBirdsInterval,
    createBombsInterval,
    configs.gameConfigs.levelTime,
    configs.gameConfigs.winScore,
    level
  );
};

const startGameTimer = function (
  createBirdsInterval,
  createBombsInterval,
  gameTime,
  winScore,
  level
) {
  // console.log('sssssssssssssss');
  const intervalTime = 1000;
  const timeLimitLabel = document.querySelector('.timeLimitLabel');
  let totalTime = gameTime / 1000;
  let minutes;
  let seconds;
  const gameTimeInterval = setInterval(function () {
    // console.log(`ttttttt: ${totalTime}`);
    minutes = Math.trunc(totalTime / 60);
    seconds = totalTime % 60;
    timeLimitLabel.innerHTML = `${minutes} : ${seconds}`;
    if (totalTime == 0) {
      // clearing intervals of objects creation
      clearInterval(createBombsInterval);
      clearInterval(createBirdsInterval);
      // remove all birds and bombs
      removeBirdsAndBombs();
      // show win lose div
      createEndGameWidget(winScore, level);
      clearInterval(gameTimeInterval);
    }
    totalTime -= 1;
  }, intervalTime);
  console.log(`gameTimeInterval: ${gameTimeInterval}`);
};

const createEndGameWidget = function (winScore, level) {
  const endGameWidgetTemplate =
    document.querySelector('.endGameTemplate').content;
  const newEndGameWidget = endGameWidgetTemplate.cloneNode(true);
  const score = parseInt(document.querySelector('.scoreLabel').textContent);
  let imgSrc;
  let messageText;
  if (score >= winScore) {
    messageText = 'YOU WIN';
    imgSrc = './images/happyHunter.png';
  } else {
    messageText = 'YOU LOSE';
    imgSrc = './images/sadHunter.png';
  }
  newEndGameWidget.querySelector('.endGameHeader').innerHTML = messageText;
  newEndGameWidget.querySelector('img').src = imgSrc;
  document.body.append(newEndGameWidget);
  document.querySelector('.playAgainBtn').onclick = function () {
    document.querySelector('.endGameWidget').remove();
    document.querySelector('.gameHeaderContainer').remove();
    createStartGameWidget(level);
  };
};

const removeBirdsAndBombs = function () {
  const imgs = document.querySelectorAll('.movingImgs:not(.hidden)');
  imgs.forEach((img) => {
    img.remove();
  });
};

const createGameHeader = function () {
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

const killedBirdListner = function (event) {
  const scoreLabel = document.querySelector('.scoreLabel');
  const birdsKilledLabel = document.querySelector('.birdsKilledLabel');
  scoreLabel.innerHTML = parseInt(scoreLabel.innerHTML) + event.detail;
  birdsKilledLabel.innerHTML = parseInt(birdsKilledLabel.innerHTML) + 1;
  event.target.remove();
};

const bombExplosionListner = function (event) {
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
