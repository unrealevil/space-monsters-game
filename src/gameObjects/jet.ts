import { AnimatedSprite } from '@pixi/sprite-animated';
import { Point, RotateDirection } from '../engine';
import { getJetFrames } from '../resources';

export class Jet extends AnimatedSprite {
  public angleSpeed = 0;
  public moveSpeed = 0;
  private _rotateDirection = RotateDirection.NONE;

  get rotateDirection() {
    return this._rotateDirection;
  }

  set rotateDirection(direction: RotateDirection) {
    this._rotateDirection = direction;
    if (direction === RotateDirection.NONE) {
      if (this.currentFrame < 21) {
        this.animationSpeed = -Math.abs(this.animationSpeed);
        this.play();
      } else {
        this.animationSpeed = Math.abs(this.animationSpeed);
        this.play();
      }
    } else if (this.currentFrame !== 9 && this.currentFrame !== 21) {
      this.animationSpeed = Math.abs(this.animationSpeed) * direction;
      this.play();
    }
  }

  get point(): Point {
    return [this.x, this.y];
  }

  set point([x, y]) {
    this.position.set(x, y);
  }

  onFrameChange = (currentNumber: number) => {
    const { rotateDirection } = this;

    if (rotateDirection === RotateDirection.NONE && currentNumber === 0) {
      this.stop();
    }
    if (currentNumber === 9) {
      this.stop();
    }
    if (currentNumber === 21) {
      this.stop();
    }
  };
}

export const createJet = (): Jet => {
  const jet = new Jet(getJetFrames());
  jet.scale.x = 0.4;
  jet.scale.y = 0.4;
  jet.anchor.set(0.5);
  jet.animationSpeed = 0.3;
  jet.angleSpeed = 0.5;
  jet.moveSpeed = 1;
  jet.gotoAndStop(0);
  return jet;
};
