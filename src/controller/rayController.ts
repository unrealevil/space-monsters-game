import { Sprite } from '@pixi/sprite';
import { Container, DisplayObject } from '@pixi/display';
import { createRay, RayType } from '../gameObjects/ray';
import { calculateDestinationAngle, objectHit } from '../utils/helpers';
import { Engine, Point } from '../engine';
import { moveByAngle } from '../animations';

const rayController = ({ app, emitter }: Engine) => {
  const rays: DisplayObject[] = [];

  const rayContainer = new Container();
  const visibleArea = new Sprite();
  visibleArea.width = app.screen.width;
  visibleArea.height = app.screen.height;

  emitter.on('ray-shoot', ([x, y]: Point, type: RayType, attackPoint: Point) => {
    const ray = createRay(type);
    ray.position.set(x, y);
    ray.rotation = calculateDestinationAngle([ray.x, ray.y], attackPoint) + Math.PI / 2;
    rayContainer.addChild(ray);
    rays.push(ray);
  });

  app.ticker.add((delta) => {
    rays.forEach((ray, index) => {
      const [x, y] = moveByAngle([ray.x, ray.y], ray.rotation - Math.PI / 2, 5, delta);
      ray.position.set(x, y);
      if (!objectHit(visibleArea, ray)) {
        rays.splice(index, 1);
        ray.destroy();
      }
    });
  });

  app.stage.addChild(rayContainer);
  app.stage.addChild(visibleArea);

  return rays;
};

export default rayController;
