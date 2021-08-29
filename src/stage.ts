import { Application } from '@pixi/app';
import { Sprite } from '@pixi/sprite';
import { DisplayObject } from 'pixi.js';
import backgroundImg from './assets/background.jpeg';
import { createJet } from './gameObjects/jet';
import { calculateDestinationAngle, findOptimalRotateDirection, objectHit } from './utils/helpers';
import { animateRotation, moveByAngle, moveByAngleToPoint } from './animations';
import { Point, RotateDirection } from './engine';
import { createJetControl, onSetAttackPoint, onSetDestinationPoint } from './jetControl';
import { createRay, RayType } from './gameObjects/ray';

let destinationPoint: Point | null = null;
let attackPoint: Point | null = null;

const rays: DisplayObject[] = [];

export const createJetStage = (app: Application) => {
  const bg = createBackground(app.screen.width, app.screen.height);
  const jet = createJet();
  jet.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(bg);
  app.stage.addChild(jet);

  const setDestinationPoint = (point: Point) => {
    destinationPoint = point;
    const destinationAngle = calculateDestinationAngle(jet.point, destinationPoint) + Math.PI / 2;
    jet.rotateDirection = findOptimalRotateDirection(jet.rotation, destinationAngle);
  };
  onSetDestinationPoint.add({ setDestinationPoint });

  const setAttackPoint = (point: Point) => {
    if (attackPoint) {
      return;
    }
    attackPoint = point;
    const destinationAngle = calculateDestinationAngle(jet.point, attackPoint) + Math.PI / 2;
    jet.rotateDirection = findOptimalRotateDirection(jet.rotation, destinationAngle);
  };

  const fire = (attackPoint: Point) => {
    const jetWidth = jet.width / jet.scale.x;
    const jetHeight = jet.height / jet.scale.y;
    const posHead = jet.toGlobal({ x: 0, y: -jetHeight / 2 });
    const leftGun = jet.toGlobal({ x: -jetWidth * 0.24, y: -jetHeight * 0.1 });
    const rightGun = jet.toGlobal({ x: jetWidth * 0.24, y: -jetHeight * 0.1 });

    [
      {
        position: posHead,
        rayType: RayType.RED,
      },
      {
        position: leftGun,
        rayType: RayType.GREEN,
      },
      {
        position: rightGun,
        rayType: RayType.BLUE,
      },
    ].forEach(({ position, rayType }) => {
      const ray = createRay(rayType);
      ray.position.set(position.x, position.y);
      ray.rotation = calculateDestinationAngle([ray.x, ray.y], attackPoint) + Math.PI / 2;
      app.stage.addChild(ray);
      rays.push(ray);
    });
  };

  onSetAttackPoint.add({ setAttackPoint });

  createJetControl(app.stage);
  app.ticker.add((delta) => {
    const anglePoint = attackPoint ?? destinationPoint;
    if (!anglePoint) {
      return;
    }

    const destinationAngle = calculateDestinationAngle(jet.point, anglePoint) + Math.PI / 2;
    jet.rotation = animateRotation(jet.rotation, destinationAngle, jet.rotateDirection, jet.angleSpeed, delta, () => {
      jet.rotateDirection = RotateDirection.NONE;
      if (attackPoint) {
        fire(attackPoint);
        attackPoint = null;
        destinationPoint && setDestinationPoint(destinationPoint);
      }
    });
    if (destinationPoint) {
      jet.point = moveByAngleToPoint(jet.point, destinationPoint, jet.rotation - Math.PI / 2, jet.moveSpeed, delta);
    }
  });
  app.ticker.add((delta) => {
    rays.forEach((ray, index) => {
      const [x, y] = moveByAngle([ray.x, ray.y], ray.rotation - Math.PI / 2, 5, delta);
      ray.position.set(x, y);
      if (!objectHit(bg, ray)) {
        rays.splice(index, 1);
        ray.destroy();
      }
    });
  });
};

const createBackground = (width: number, height: number) => {
  const bg = Sprite.from(backgroundImg);
  bg.width = width;
  bg.height = height;
  return bg;
};
