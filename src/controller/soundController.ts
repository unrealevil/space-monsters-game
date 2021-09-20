import { Sound } from '@pixi/sound';
import { Engine } from '../engine';

const soundController = ({ app, emitter }: Engine) => {
  const bgMusic = Sound.from(app.loader.resources.bgMusic);
  bgMusic.loop = true;
  bgMusic.volume = 0.5;

  const laser = Sound.from(app.loader.resources.laser);
  const explode = Sound.from(app.loader.resources.explode);
  const jetExplode = Sound.from(app.loader.resources.jetExplode);

  emitter.on('start-game', () => {
    bgMusic.stop();
    bgMusic.play();
  });

  emitter.on('jet-fire', () => {
    laser.play();
  });

  emitter.on('monster-explode', () => {
    explode.play();
  });

  emitter.on('jet-explode', () => {
    jetExplode.play();
  });
};

export default soundController;
