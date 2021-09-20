import { Sprite } from '@pixi/sprite';
import { Container } from '@pixi/display';
import { Texture } from '@pixi/core';
import { objectHit } from '../utils/helpers';
import { Engine } from '../engine';
import { createExplosion } from '../gameObjects/explosion';
import jetController from '../controller/jetController';
import rayController from '../controller/rayController';
import monsterController from '../controller/monsterController';
// eslint-disable-next-line import/no-cycle
import { createGameOverStage } from './gameOverStage';

export const createGameStage = ({ app, emitter }: Engine) => {
  app.stage.removeAllListeners();
  app.stage.removeChildren();
  const bg = createBackground(app.screen.width, app.screen.height, app.loader.resources.bg.texture);
  const explosionContainer = new Container();

  app.stage.addChild(bg);
  app.stage.addChild(explosionContainer);

  const jet = jetController({ app, emitter });
  const rays = rayController({ app, emitter });
  const enemes = monsterController({ app, emitter });

  app.ticker.add(() => {
    rays.forEach((ray) => {
      enemes.forEach((enemy, index) => {
        if (objectHit(enemy.sprite, ray)) {
          enemes.splice(index, 1);
          const explosion = createExplosion(enemy.sprite.width * 3, enemy.sprite.height * 3);
          explosion.position = enemy.sprite.position;
          explosionContainer.addChild(explosion);
          enemy.sprite.destroy();
          emitter.emit('monster-explode');
        }
      });
    });

    enemes.forEach((enemy) => {
      if (!jet.destroyed && objectHit(enemy.sprite, jet, 0.5)) {
        const { width, height, x, y } = jet;
        const jetExplode = () => {
          const explosion = createExplosion(width * 3, height * 3);
          explosion.x = x + Math.random() * width - width / 2;
          explosion.y = y + Math.random() * height - height / 2;
          explosionContainer.addChild(explosion);
          emitter.emit('jet-explode');
        };
        jet.destroy();
        const countExplosion = 5;
        for (let i = 0; i < countExplosion; i++) {
          setTimeout(jetExplode, i * 120);
        }
        setTimeout(() => createGameOverStage({ app, emitter }), countExplosion * 120);
      }
    });
  });
};

const createBackground = (width: number, height: number, image?: Texture) => {
  if (!image) {
    throw new Error('Background image not found');
  }
  const bg = Sprite.from(image);
  bg.width = width;
  bg.height = height;
  return bg;
};
