import { Container } from '@pixi/display';
import { Ticker } from '@pixi/ticker';
import { createScoreText } from '../ui';

export const createScoreCaption = (ticker: Ticker, scoreGetter: () => string, fontSize = 20) => {
  const container = new Container();
  let previousScore: string | null = null;
  const update = () => {
    if (previousScore !== scoreGetter()) {
      previousScore = scoreGetter();
      container.removeChildren();
      container.addChild(scoreCaption(scoreGetter(), fontSize));
    }
  };
  update();
  ticker.add(update);
  return container;
};

const scoreCaption = (text: string, fontSize: number) => {
  const caption = createScoreText(text, fontSize);
  caption.anchor.set(1, 0);
  return caption;
};
