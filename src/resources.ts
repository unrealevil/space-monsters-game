import { Loader } from '@pixi/loaders';
import { Spritesheet } from '@pixi/spritesheet';
import { Texture } from '@pixi/core';
import backgroundImg from './assets/background.jpeg';
import jetImg from './assets/sprites/fighter.png';
import jetData from './assets/sprites/fighter.json';

const jetFrames: Texture[] = [];

export const loadResources = (loader: Loader, onLoad: () => void) => {
  loader
    .add('bg', backgroundImg)
    .add('jet', jetImg)
    .load(() => {
      const texture = loader.resources.jet.texture?.baseTexture;
      if (!texture) {
        throw new Error('jet textures not found');
      }
      const sheet = new Spritesheet(texture, jetData);
      sheet.parse(() => {
        for (let i = 0; i < 30; i++) {
          const value = i < 10 ? `0${i}` : i;
          jetFrames.push(Texture.from(`rollSequence00${value}.png`));
        }
        onLoad();
      });
    });
};

export const getJetFrames = (): Texture[] => {
  if (jetFrames.length === 0) {
    throw new Error('jet frames not load');
  }
  return jetFrames;
};
