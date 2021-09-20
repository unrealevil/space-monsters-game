import { DisplayObject } from '@pixi/display';
import { Point, RotateDirection } from '../engine';

export const calculateDistance = ([x1, y1]: Point, [x2, y2]: Point) => {
  if (x1 === x2 && y1 === y2) {
    return 0;
  }
  const dx = x1 - x2;
  const dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);
};

export const normalizeAngle = (angle: number) => {
  const normalized = Math.abs(angle) > 2 * Math.PI ? angle % Math.PI : angle;
  return normalized < 0 ? 2 * Math.PI + normalized : normalized;
};

export const calculateDestinationAngle = ([sx, sy]: Point, [dx, dy]: Point) => {
  return normalizeAngle(Math.atan2(dy - sy, dx - sx));
};

export const findOptimalRotateDirection = (fromAngle: number, toAngle: number): RotateDirection => {
  if (fromAngle === toAngle) {
    return RotateDirection.NONE;
  }
  const from = normalizeAngle(fromAngle);
  const to = normalizeAngle(toAngle);
  const angle1 = Math.abs(to - from);
  const angle2 = 2 * Math.PI - angle1;
  if (angle1 < angle2) {
    return Math.sign(to - from);
  }
  return Math.sign(from - to);
};

export const objectHit = (object1: DisplayObject, object2: DisplayObject, accuracity = 1) => {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width * accuracity &&
    bounds1.x + bounds1.width * accuracity > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height * accuracity &&
    bounds1.y + bounds1.height * accuracity > bounds2.y
  );
};
