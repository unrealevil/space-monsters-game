import { calculateDistance, findOptimalRotateDirection, normalizeAngle } from '../../utils/helpers';
import { RotateDirection } from '../../engine';

describe('game helpers test case', () => {
  test('calculate distance', () => {
    expect(calculateDistance([0, 0], [5, 5]).toFixed(3)).toEqual('7.071');
    expect(calculateDistance([0, 0], [-5, -5]).toFixed(3)).toEqual('7.071');
    expect(calculateDistance([-5, -5], [0, 0]).toFixed(3)).toEqual('7.071');
    expect(calculateDistance([0, 0], [0, 0])).toEqual(0);
    expect(calculateDistance([5, 5], [5, 5])).toEqual(0);
  });

  test('normalize angle', () => {
    expect(normalizeAngle(1)).toEqual(1);
    expect(normalizeAngle(-1).toFixed(4)).toEqual('5.2832');
    expect(normalizeAngle(Math.PI * -10)).toEqual(-0);
    expect(normalizeAngle(Math.PI * 4)).toEqual(0);
    expect(normalizeAngle(Math.PI * -11).toFixed(5)).toEqual(Math.PI.toFixed(5));
    expect(normalizeAngle(Math.PI * 11).toFixed(5)).toEqual(Math.PI.toFixed(5));
  });

  test('finding rotate direaction', () => {
    [
      [0, 1, RotateDirection.CW],
      [1, 0, RotateDirection.CCW],
      [-1, 1, RotateDirection.CW],
      [3, -3, RotateDirection.CW],
      [-3, 3, RotateDirection.CCW],
      [-3, -2, RotateDirection.CW],
      [-2, 2, RotateDirection.CCW],
    ].forEach(([from, to, expected]) => {
      expect(findOptimalRotateDirection(from, to)).toEqual(expected);
    });
  });
});
