import { Application } from '@pixi/app';
import { Container } from '@pixi/display';
import { createScoreText } from '../ui';
import { score } from '../score';

export const appendScore = (app: Application) => {
  const container = new Container();
  container.x = app.screen.width - 10;
  container.y = 5;
  app.stage.addChild(container);
  let previousScore: string | null = null;
  app.ticker.add(() => {
    if (previousScore !== score.gameScore) {
      previousScore = score.gameScore;
      container.removeChildren();
      container.addChild(scoreCaption(score.gameScore));
    }
  });
  return container;
};

export const appendHighScore = (app: Application) => {
  const container = new Container();
  container.x = app.screen.width - 10;
  container.y = 5;
  app.stage.addChild(container);
  let previousScore: string | null = null;
  app.ticker.add(() => {
    if (previousScore !== score.highScore) {
      previousScore = score.highScore;
      container.removeChildren();
      container.addChild(scoreCaption(`High Score: ${score.highScore}`));
    }
  });
  return container;
};

const scoreCaption = (text: string) => {
  const caption = createScoreText(text);
  caption.anchor.set(1, 0);
  return caption;
};
