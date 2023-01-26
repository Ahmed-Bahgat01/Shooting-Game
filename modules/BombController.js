import { ConfigController } from './ConfigController.js';

export class BombController {
  #htmlTemplate = document.querySelector('img.bomb-template');
  #level;
  constructor(level = 1) {
    this.#level = level;
  }

  throwBomb() {
    const bombConfigs = new ConfigController(this.#level).configs.bombConfigs;
    let newBomb = this.#htmlTemplate.cloneNode();
    newBomb.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
    document.body.append(newBomb);

    // add click listener for new bomb
    newBomb.addEventListener('click', function () {
      bombClickListener(this, bombConfigs.explosionRadius);
    });
    // move bomb
    moveBomb(
      newBomb,
      bombConfigs.bombMovingStep,
      bombConfigs.bombMovingInterval
    );
  }
}

// === Utility Functions ===

let bombClickListener = function (newBomb, explosionRadius) {
  let eventData = {
    bombCenter: {
      x: parseInt(newBomb.style.left) + 0.5 * newBomb.width,
      y: parseInt(newBomb.style.top) + 0.5 * newBomb.height,
    },
    explodeRadius: explosionRadius,
  };
  // dispatch event on explosion
  const explodeevent = new CustomEvent('bombexplode', {
    detail: eventData,
    bubbles: true,
  });
  newBomb.dispatchEvent(explodeevent);
};

let moveBomb = function (newBomb, bombMovingStep, bombMovingInterval) {
  let topPosition = 0 - newBomb.height;
  newBomb.style.top = `${topPosition}px`;
  newBomb.classList.remove('hidden');
  let thownBombIntervalID = setInterval(function () {
    newBomb.style.top = `${topPosition}px`;

    topPosition += bombMovingStep;
    if (topPosition > window.innerHeight) {
      clearInterval(thownBombIntervalID);
      newBomb.remove();
    }
  }, bombMovingInterval);
};
