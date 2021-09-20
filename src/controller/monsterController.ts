import { Container } from '@pixi/display';
import { moveToPoint } from '../animations';
import { createRandomMonster, Enemy } from '../gameObjects/monster';
import { Engine, Point } from '../engine';

const monsterController = ({ app }: Engine) => {
  const mosters: Enemy[] = [];
  const monsterContainer = new Container();
  app.stage.addChild(monsterContainer);

  app.ticker.add((delta) => {
    mosters.forEach((moster) => {
      const { sprite } = moster;
      if (undefined === moster.destinationPoint) {
        moster.destinationPoint = [
          Math.random() * (app.stage.width - sprite.width),
          Math.random() * (app.stage.height - sprite.height),
        ];
      }

      const [x, y] = moveToPoint([sprite.x, sprite.y], moster.destinationPoint, 1, delta, () => {
        moster.destinationPoint = undefined;
      });
      sprite.position.set(x, y);
    });
  });

  const spawnMonters = () => {
    setTimeout(spawnMonters, 1000);
    if (mosters.length > 10) {
      return;
    }
    const monster = createRandomMonster();
    const spawnPoint: Point = [-monster.sprite.width, -monster.sprite.height];
    const spawnSide = Math.round(Math.random() * 3);
    switch (spawnSide) {
      case 0:
      case 1:
        spawnPoint[0] = Math.random() * (app.stage.width + monster.sprite.width);
        if (1 === spawnSide) {
          spawnPoint[1] = app.stage.height + monster.sprite.height;
        }
        break;
      case 2:
      case 3:
        spawnPoint[1] = Math.random() * (app.stage.height + monster.sprite.height);
        if (3 === spawnSide) {
          spawnPoint[0] = app.stage.width + monster.sprite.width;
        }
        break;
      default:
        break;
    }

    monster.sprite.position.set(spawnPoint[0], spawnPoint[1]);

    monsterContainer.addChild(monster.sprite);
    mosters.push({
      sprite: monster.sprite,
    });
  };
  spawnMonters();
  return mosters;
};

export default monsterController;
