import { Container } from '@pixi/display';
import { moveToPoint } from '../animations';
import { createRandomMonster, Enemy } from '../gameObjects/monster';
import { Engine, Point } from '../engine';
import { score } from '../score';

const monsterController = ({ app }: Engine) => {
  const monsters: Enemy[] = [];
  const monsterContainer = new Container();
  app.stage.addChild(monsterContainer);

  app.ticker.add((delta) => {
    monsters.forEach((monster) => {
      const { sprite } = monster;
      if (undefined === monster.destinationPoint) {
        monster.destinationPoint = [
          Math.random() * (app.stage.width - sprite.width),
          Math.random() * (app.stage.height - sprite.height),
        ];
      }

      const [x, y] = moveToPoint([sprite.x, sprite.y], monster.destinationPoint, monster.speed, delta, () => {
        monster.destinationPoint = undefined;
      });
      sprite.position.set(x, y);
    });
  });

  const spawnMonsters = () => {
    setTimeout(spawnMonsters, 1000);
    if (monsters.length > 10 + score.current / 5) {
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
    monsters.push({
      sprite: monster.sprite,
      speed: score.current > 10 ? 1 + score.current / 30 : 1,
    });
  };
  spawnMonsters();
  return monsters;
};

export default monsterController;
