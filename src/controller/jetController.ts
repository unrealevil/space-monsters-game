import { animateRotation, moveByAngleToPoint } from '../animations';
import { Engine, Point, RotateDirection } from '../engine';
import { createJet } from '../gameObjects/jet';
import { RayType } from '../gameObjects/ray';
import { createJetControl, onSetAttackPoint, onSetDestinationPoint } from '../jetControl';
import { calculateDestinationAngle, findOptimalRotateDirection } from '../utils/helpers';

const jetController = ({ app, emitter }: Engine) => {
  let destinationPoint: Point | null = null;
  let attackPoint: Point | null = null;
  const jet = createJet();
  jet.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(jet);
  let isDestroyed = false;

  emitter.on('jet-explode', () => {
    isDestroyed = true;
    destinationPoint = null;
    attackPoint = null;
  });

  const setDestinationPoint = (point: Point) => {
    if (isDestroyed) {
      return;
    }
    destinationPoint = point;
    const destinationAngle = calculateDestinationAngle(jet.point, destinationPoint) + Math.PI / 2;
    jet.rotateDirection = findOptimalRotateDirection(jet.rotation, destinationAngle);
  };
  onSetDestinationPoint.add({ setDestinationPoint });

  const setAttackPoint = (point: Point) => {
    if (attackPoint || isDestroyed) {
      return;
    }
    attackPoint = point;
    const destinationAngle = calculateDestinationAngle(jet.point, attackPoint) + Math.PI / 2;
    jet.rotateDirection = findOptimalRotateDirection(jet.rotation, destinationAngle);
  };

  const fire = (attackPoint: Point) => {
    emitter.emit('jet-fire');
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
      const point: Point = [position.x, position.y];
      emitter.emit('ray-shoot', point, rayType, attackPoint);
    });
  };

  onSetAttackPoint.add({ setAttackPoint });

  createJetControl(app.stage);

  // JET controller
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

  return jet;
};

export default jetController;
