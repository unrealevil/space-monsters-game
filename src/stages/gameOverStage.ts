import { Engine } from '../engine';
import { createStarWrap } from '../gameObjects/starWarp';
import { createButton, createHeader, createScoreText } from '../ui';
import { score } from '../score';
import { appendHighScore } from '../gameObjects/score';

const gameOverStage = ({ app, emitter }: Engine) => {
  createStarWrap(app);
  const centerX = app.screen.width / 2;
  const centerY = app.screen.height / 2;
  const gameOver = createHeader('Game Over');
  const button = createButton('RESTART');
  const result = createScoreText(`Score: ${score.gameScore}`, 30);
  result.anchor.set(0.5, 0.5);
  result.position.set(centerX, centerY);

  gameOver.anchor.set(0.5, 1);
  gameOver.position.set(centerX, centerY - result.height);

  button.x = centerX - button.width / 2;
  button.y = centerY + result.height;

  button.on('pointerup', () => emitter.emit('show-menu'));

  app.stage.addChild(gameOver);
  app.stage.addChild(result);
  app.stage.addChild(button);
  appendHighScore(app);
};

export default gameOverStage;
