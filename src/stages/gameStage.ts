import { Sprite } from '@pixi/sprite';
import { Container } from '@pixi/display';
import { Texture } from '@pixi/core';
import { objectHit } from '../utils/helpers';
import { Engine } from '../engine';
import { createExplosion } from '../gameObjects/explosion';
import jetController from '../controller/jetController';
import rayController from '../controller/rayController';
import monsterController from '../controller/monsterController';
import { appendScore } from '../gameObjects/score';
import { score } from '../score';

const gameStage = ({ app, emitter }: Engine) => {
  score.reset();
  app.stage.removeAllListeners();
  app.stage.removeChildren();
  const bg = createBackground(app.screen.width, app.screen.height, app.loader.resources.bg.texture);
  const explosionContainer = new Container();

  app.stage.addChild(bg);
  app.stage.addChild(explosionContainer);
  const scoreCaption = appendScore(app);

  const jet = jetController({ app, emitter });
  const rays = rayController({ app, emitter });
  const enemies = monsterController({ app, emitter });

  app.ticker.add(() => {
    rays.forEach((ray) => {
      enemies.forEach((enemy, index) => {
        if (objectHit(enemy.sprite, ray)) {
          enemies.splice(index, 1);
          const explosion = createExplosion(enemy.sprite.width * 3, enemy.sprite.height * 3);
          explosion.position = enemy.sprite.position;
          explosionContainer.addChild(explosion);
          enemy.sprite.destroy();
          emitter.emit('monster-explode');
          score.add();
        }
      });
    });

    enemies.forEach((enemy) => {
      if (!jet.destroyed && objectHit(enemy.sprite, jet, 0.8)) {
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
        setTimeout(() => {
          scoreCaption.destroy();
          emitter.emit('show-game-over');
        }, countExplosion * 120);
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

export default gameStage;
