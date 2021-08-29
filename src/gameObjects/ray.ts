import { Graphics } from '@pixi/graphics';
import { Container } from '@pixi/display';
import { Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';

export enum RayType {
  RED,
  BLUE,
  GREEN,
}
const gradTextures = {
  [RayType.RED]: createGradTexture('yellow', 'red'),
  [RayType.BLUE]: createGradTexture('yellow', 'blue'),
  [RayType.GREEN]: createGradTexture('yellow', 'green'),
};

export const createRay = (type: RayType) => {
  const container = new Container();
  const ray = new Sprite(gradTextures[type]);
  ray.width = 4;
  ray.height = 60;
  const rayBorderMask = new Graphics();
  rayBorderMask.beginFill(0xffffff);
  rayBorderMask.drawRoundedRect(0, 0, ray.width, ray.height, 3);
  rayBorderMask.endFill();
  ray.mask = rayBorderMask;
  container.addChild(ray, rayBorderMask);

  const mask = new Graphics();
  mask.beginFill(0xffffff);
  mask.drawRect(0, 0, ray.width, ray.height);
  mask.endFill();
  container.mask = mask;
  container.addChild(mask);

  mask.height = 100;
  container.x = 100;
  container.y = 100;

  container.scale.x = 1;
  container.scale.y = 1;

  container.rotation = -Math.PI / 3;

  return container;
};

function createGradTexture(color1: string, color2: string) {
  const quality = 256;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = quality;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Error create canvas 2d context');
  }
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const grd = ctx.createLinearGradient(0, 0, 0, quality);
  grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
  grd.addColorStop(0.4, color1);
  grd.addColorStop(0.8, color2);

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1, quality);

  return Texture.from(canvas);
}
