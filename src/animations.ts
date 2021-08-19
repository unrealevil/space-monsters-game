import { Point, RotateDirection } from './engine';
import { calculateDistance, normalizeAngle } from './utils/helpers';

const ANGLE_SPEED_MOD = 0.1;
const SPEED_MOD = 1;

export const animateRotation = (
  fromAngle: number,
  toAngle: number,
  direction: RotateDirection,
  speed: number,
  timeDelta: number,
  onFinish: null | (() => void) = null,
) => {
  if (fromAngle === toAngle) {
    return toAngle;
  }
  const from = normalizeAngle(fromAngle);
  const to = normalizeAngle(toAngle);

  const step = speed * ANGLE_SPEED_MOD * timeDelta * direction;
  if (Math.abs(step) > 2 * Math.PI) {
    return toAngle;
  }
  const newAngle = normalizeAngle(from + step);

  if (direction > 0 && newAngle > to && from < to) {
    onFinish?.();
    return toAngle;
  }
  if (direction < 0 && newAngle < to && from > to) {
    onFinish?.();
    return toAngle;
  }
  return newAngle;
};

export const moveByAngle = ([x, y]: Point, toPoint: Point, angle: number, speed: number, timeDelta: number): Point => {
  if ([x, y] === toPoint) {
    return toPoint;
  }
  const step = speed * SPEED_MOD * timeDelta;
  const dist = calculateDistance([x, y], toPoint);
  if (dist < step) {
    return toPoint;
  }
  const newX = x + step * Math.cos(angle);
  const newY = y + step * Math.sin(angle);

  return [newX, newY];
};
