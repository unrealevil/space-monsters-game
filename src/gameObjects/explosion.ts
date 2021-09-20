import { AnimatedSprite } from '@pixi/sprite-animated';
import { getExplosionFrames } from '../resources';

export const createExplosion = (width: number, height: number) => {
  const explosion = new AnimatedSprite(getExplosionFrames());
  explosion.anchor.set(0.5);

  explosion.width = width;
  explosion.height = height;
  explosion.onFrameChange = (currentNumber: number) => {
    if (currentNumber === 25) {
      explosion.destroy();
    }
  };
  explosion.play();
  return explosion;
};
