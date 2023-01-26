import { ConfigController } from './ConfigController.js';

export class BombController {
  #htmlTemplate = document.querySelector('img.bomb-template');
  #explosionRadius;
  #level;
  constructor(level) {
    console.log('Bomb constructor');
    this.#explosionRadius = 500; //TODO: take from configs only
    this.#level = level;
    // this.bombConfigs = new ConfigController(1).configs.bombConfigs;
  }

  throwBomb() {
    const bombConfigs = new ConfigController().configs.bombConfigs;
    // console.log(this.bombConfigs);
    let newBomb = this.#htmlTemplate.cloneNode();
    // TODO: ref
    newBomb.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
    document.body.append(newBomb);

    // add click listener for new bomb
    newBomb.addEventListener('click', () => {
      console.log('bomb clicked');
      let eventData = {
        bombCenter: {
          x: parseInt(newBomb.style.left) + 0.5 * newBomb.width,
          y: parseInt(newBomb.style.top) + 0.5 * newBomb.height,
        },
        explodeRadius: this.#explosionRadius, //RADIUS
      };
      // dispatchEvent on explosion
      console.log('event data on bomb');
      console.log(eventData);

      const explodeevent = new CustomEvent('bombexplode', {
        detail: eventData,
        bubbles: true,
      });
      newBomb.dispatchEvent(explodeevent);
    });

    // move bomb
    let topPosition = 0 - newBomb.height;
    newBomb.style.top = `${topPosition}px`;
    newBomb.classList.remove('hidden');
    let thownBombIntervalID = setInterval(function () {
      console.log(`pos: ${newBomb.style.top}`);
      newBomb.style.top = `${topPosition}px`;
      // console.log(`bombstep: ${bombConfigs.bombMovingStep}`);
      // console.log(`bombinterval: ${bombConfigs.bombMovingInterval}`);

      topPosition += bombConfigs.bombMovingStep; // TODO: put steps into configuration files
      if (topPosition > window.innerHeight) {
        console.log('bomb will be removed');
        clearInterval(thownBombIntervalID);
        newBomb.remove();
      }
    }, bombConfigs.bombMovingInterval);
    console.log('throw bomb()');
  }
}
