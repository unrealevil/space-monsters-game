import { Engine } from '../engine';
import { createStarWrap } from '../gameObjects/starWarp';
import { createButton, createHeader } from '../ui';
// eslint-disable-next-line import/no-cycle
import { createGameStage } from './gameStage';

export const createMenuStage = ({ app, emitter }: Engine) => {
  app.stage.removeAllListeners();
  app.stage.removeChildren();
  const toggleWrap = createStarWrap(app);
  const gameTitle = createHeader('Space Monsters');
  const button = createButton('START GAME');
  gameTitle.anchor.x = 0.5;
  gameTitle.anchor.y = 0.5;
  gameTitle.x = app.screen.width / 2;
  gameTitle.y = app.screen.height / 2 - (button.height + 10);
  app.stage.addChild(gameTitle);

  button.x = app.screen.width / 2 - button.width / 2;
  button.y = app.screen.height / 2;
  button.on('pointerup', () => {
    emitter.emit('start-game');
    toggleWrap();
    setTimeout(() => createGameStage({ app, emitter }), 3000);
    app.stage.removeChild(button);
    setTimeout(() => app.stage.removeChild(gameTitle), 1000);
    //;
  });
  app.stage.addChild(button);
};
