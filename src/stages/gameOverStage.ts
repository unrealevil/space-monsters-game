import { Engine } from '../engine';
import { createStarWrap } from '../gameObjects/starWarp';
import { createButton, createHeader } from '../ui';
// eslint-disable-next-line import/no-cycle
import { createMenuStage } from './menuStage';

export const createGameOverStage = ({ app, emitter }: Engine) => {
  createStarWrap(app);

  const gameOver = createHeader('Game Over');
  const button = createButton('RESTART');
  gameOver.anchor.x = 0.5;
  gameOver.anchor.y = 0.5;
  gameOver.x = app.screen.width / 2;
  gameOver.y = app.screen.height / 2 - (button.height + 10);
  app.stage.addChild(gameOver);

  button.x = app.screen.width / 2 - button.width / 2;
  button.y = app.screen.height / 2;
  button.on('pointerup', () => createMenuStage({ app, emitter }));
  app.stage.addChild(button);
};
