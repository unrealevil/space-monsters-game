import { animateRotation } from '../animations';
import { RotateDirection } from '../engine';

describe('game animation task test case', () => {
  test('animate rotation task', () => {
    expect(animateRotation(0, 1, RotateDirection.CW, 0.5, 0.5).toFixed(3)).toEqual('0.025');
    expect(animateRotation(0, 1, RotateDirection.CCW, 0.5, 0.5).toFixed(3)).toEqual('6.258');

    expect(animateRotation(0, 1, RotateDirection.CW, 0.5, 20.01)).toEqual(1);
    expect(animateRotation(0, 1, RotateDirection.CCW, 0.5, 20.1).toFixed(3)).toEqual('5.278');
    expect(animateRotation(0, 1, RotateDirection.CCW, 0.5, 1000)).toEqual(1);
    expect(animateRotation(-3, -1, RotateDirection.CW, 0.5, 10).toFixed(5)).toEqual('3.78319');
    expect(animateRotation(-1, 1, RotateDirection.CW, 0.5, 10).toFixed(5)).toEqual('5.78319');

    expect(animateRotation(-2, 1, RotateDirection.CW, 0.5, 10).toFixed(5)).toEqual('4.78319');
    expect(animateRotation(-2, 1, RotateDirection.CCW, 0.5, 10).toFixed(5)).toEqual('3.78319');
    expect(animateRotation(-4, -5, RotateDirection.CCW, 0.5, 10).toFixed(5)).toEqual('1.78319');
  });
});
