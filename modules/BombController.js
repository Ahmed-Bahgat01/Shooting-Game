export class BombController {
  #htmlTemplate = document.querySelector('img.bomb-template');
  #explosionRadius;
  constructor() {
    console.log('Bomb constructor');
    this.#explosionRadius = 500;
  }

  throwBomb() {
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
    newBomb.classList.remove('hidden');

    // move bomb
    let topPosition = 0;
    let thownBombIntervalID = setInterval(function () {
      newBomb.style.top = `${topPosition}px`;
      topPosition += 2; // TODO: put steps into configuration files
      if (topPosition > window.innerHeight) {
        console.log('bomb will be removed');
        clearInterval(thownBombIntervalID);
        newBomb.remove();
      }
    }, 50);
    console.log('throw bomb()');
  }
}
