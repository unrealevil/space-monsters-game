import { Application } from '@pixi/app';
import { Sprite } from '@pixi/sprite';
import backgroundImg from './assets/background.jpeg';
import { createJet } from './gameObjects/jet';
import { calculateDestinationAngle, findOptimalRotateDirection } from './utils/helpers';
import { animateRotation, moveByAngle } from './animations';
import { Point, RotateDirection } from './engine';

let destinationPoint: Point | null = null;

export const createJetStage = (app: Application) => {
  const bg = createBackground(app.screen.width, app.screen.height);
  const jet = createJet();
  jet.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(bg);
  app.stage.addChild(jet);

  bg.on('pointerdown', ({ data }) => {
    destinationPoint = [data.global.x, data.global.y];
    const destinationAngle = calculateDestinationAngle(jet.point, destinationPoint) + Math.PI / 2;
    jet.rotateDirection = findOptimalRotateDirection(jet.rotation, destinationAngle);
  });

  app.ticker.add((delta) => {
    if (!destinationPoint) {
      return;
    }

    const destinationAngle = calculateDestinationAngle(jet.point, destinationPoint) + Math.PI / 2;
    jet.rotation = animateRotation(
      jet.rotation,
      destinationAngle,
      jet.rotateDirection,
      jet.angleSpeed,
      delta,
      () => (jet.rotateDirection = RotateDirection.NONE),
    );
    jet.point = moveByAngle(jet.point, destinationPoint, jet.rotation - Math.PI / 2, jet.moveSpeed, delta);
  });
};

const createBackground = (width: number, height: number) => {
  const bg = Sprite.from(backgroundImg);
  bg.width = width;
  bg.height = height;
  bg.interactive = true;

  return bg;
};
