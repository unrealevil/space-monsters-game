import { Sprite } from '@pixi/sprite';
import { Point } from '../engine';
import { Monster } from '../resources';

export interface Enemy {
  sprite: Sprite;
  destinationPoint?: Point;
}

export const createRandomMonster = () => {
  const monters = Object.values(Monster);
  return createMonster(monters[Math.round(Math.random() * (monters.length - 1))]);
};

export const createMonster = (name: Monster): Enemy => {
  const sprite = Sprite.from(name);
  sprite.scale.x = 0.3;
  sprite.scale.y = 0.3;

  return { sprite };
};
