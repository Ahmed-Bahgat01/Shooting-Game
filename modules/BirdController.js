export class BirdController {
  #birds = [
    {
      points: 10,
      htmlTemplate: document.querySelector('img.white-duck-template'),
    },
    {
      points: 5,
      htmlTemplate: document.querySelector('img.brown-duck-template'),
    },
    {
      points: -10,
      htmlTemplate: document.querySelector('img.red-sparrow-template'),
    },
  ];
  constructor() {
    console.log('Game constructor');
  }
  get birds() {
    return this.#birds;
  }
  flyRandomBird() {
    let randomBirdNumber = Math.floor(Math.random() * this.#birds.length);
    let newBird = this.#birds[randomBirdNumber].htmlTemplate.cloneNode();
    document.body.append(newBird);
    newBird.style.top = `${Math.floor(
      Math.random() * (window.innerHeight * 0.5)
    )}px`;
    newBird.classList.add('bird');

    // TODO: no need for those
    newBird.setAttribute('birdindex', `${randomBirdNumber}`);
    newBird.setAttribute('points', this.#birds[randomBirdNumber].points);

    newBird.addEventListener('click', () => {
      console.log('bird clicked');
      let killedScore = this.birds[randomBirdNumber].points;
      const killedevent = new CustomEvent('killedbird', {
        detail: killedScore,
        bubbles: true,
      });
      newBird.dispatchEvent(killedevent);
    });
    newBird.classList.remove('hidden');
    let leftPosition = 0;

    let flyBirdIntervalID = setInterval(function () {
      newBird.style.left = `${leftPosition}px`;
      leftPosition += 2;
      if (leftPosition > window.innerWidth) {
        clearInterval(flyBirdIntervalID);
        newBird.remove();
      }
    }, 50);
    console.log('fly bird()');
  }
}
