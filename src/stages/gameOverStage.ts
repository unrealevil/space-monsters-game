import { Engine } from '../engine';
import { createStarWrap } from '../gameObjects/starWarp';
import { createButton, createHeader } from '../ui';
import { score } from '../score';
import { createScoreCaption } from '../gameObjects/scoreCaption';

const gameOverStage = ({ app, emitter }: Engine) => {
  createStarWrap(app);
  const centerX = app.screen.width / 2;
  const centerY = app.screen.height / 2;
  const gameOver = createHeader('Game Over');

  const result = createScoreCaption(app.ticker, () => `Score: ${score.gameScore}`, 30);
  result.position.set(centerX + result.width / 2, centerY);

  gameOver.anchor.set(0.5, 0.5);
  gameOver.position.set(centerX, centerY - result.height);

  const button = createButton('RESTART');
  button.x = centerX - button.width / 2;
  button.y = centerY + result.height + result.height / 2;
  button.on('pointerup', () => emitter.emit('show-menu'));

  const highScoreCaption = createScoreCaption(app.ticker, () => score.highScore);
  highScoreCaption.x = app.screen.width - 10;
  highScoreCaption.y = 5;

  app.stage.addChild(gameOver, result, button, highScoreCaption);
};

export default gameOverStage;
