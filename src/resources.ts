import { Loader } from '@pixi/loaders';
import { Spritesheet } from '@pixi/spritesheet';
import { Texture } from '@pixi/core';
import backgroundImg from './assets/background.jpeg';
import jetImg from './assets/sprites/fighter.png';
import jetData from './assets/sprites/fighter.json';
import monstersImg from './assets/sprites/monsters.png';
import monstersData from './assets/sprites/monsters.json';
import laserSound from './assets/sounds/laser-gun.mp3';
import bgMusic from './assets/sounds/cosmic-glow.mp3';
import explodeSound from './assets/sounds/explode.mp3';
import jetExplosionSound from './assets/sounds/jet-explosion.mp3';
import star from './assets/sprites/star.png';
import explosionImg from './assets/sprites/mc.png';
import explosionData from './assets/sprites/mc.json';
import pixiImg from './assets/pixi.png';
import gitHubImg from './assets/GitHub-Mark-Light-64px.png';

// noinspection JSUnusedGlobalSymbols
export enum Monster {
  'EggHead' = 'eggHead.png',
  'FlowerTop' = 'flowerTop.png',
  'Helmlok' = 'helmlok.png',
  'Skully' = 'skully.png',
}

const jetFrames: Texture[] = [];
const monsters: { [key in Monster]?: Texture } = {};
const explosionFrames: Texture[] = [];

export const loadResources = (loader: Loader, onLoad: () => void) => {
  loader
    .add('bg', backgroundImg)
    .add('jet', jetImg)
    .add('monsters', monstersImg)
    .add('explosion', explosionImg)
    .add('star', star)
    .add('laser', laserSound)
    .add('bgMusic', bgMusic)
    .add('explode', explodeSound)
    .add('jetExplode', jetExplosionSound)
    .add('pixi', pixiImg)
    .add('github', gitHubImg)
    .load(() => {
      parseJetFrames(loader, () => parseMonsters(loader, () => parseExplosionFrames(loader, onLoad)));
    });
};

const parseJetFrames = (loader: Loader, next: () => void) => {
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
    next();
  });
};

const parseExplosionFrames = (loader: Loader, next: () => void) => {
  const texture = loader.resources.explosion.texture?.baseTexture;
  if (!texture) {
    throw new Error('explosion textures not found');
  }
  const sheet = new Spritesheet(texture, explosionData);
  sheet.parse(() => {
    for (let i = 0; i < 26; i++) {
      const texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
      explosionFrames.push(texture);
    }
    next();
  });
};

const parseMonsters = (loader: Loader, next: () => void) => {
  const texture = loader.resources.monsters.texture?.baseTexture;
  if (!texture) {
    throw new Error('monsters textures not found');
  }
  const sheet = new Spritesheet(texture, monstersData);
  sheet.parse(() => {
    Object.values(Monster).forEach((key) => {
      monsters[key] = Texture.from(key);
    });
    next();
  });
};

export const getJetFrames = (): Texture[] => {
  if (jetFrames.length === 0) {
    throw new Error('jet frames not load');
  }
  return jetFrames;
};

export const getExplosionFrames = (): Texture[] => {
  if (explosionFrames.length === 0) {
    throw new Error('explode frames not load');
  }
  return explosionFrames;
};
