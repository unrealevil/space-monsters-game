import { Text, TextStyle } from '@pixi/text';
import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';

export const createHeader = (text: string) => {
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 40,
    fontWeight: 'bold',
    fill: ['#ffffff', '#1e7520'], // gradient
    stroke: '#4a1850',
    strokeThickness: 10,
    dropShadow: true,
    dropShadowColor: '#f6f7b0',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI,
    dropShadowDistance: 1,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
  });
  return new Text(text, style);
};

export const createText = (text: string) => {
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fill: '#ffffff',
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
  });

  return new Text(text, style);
};

export const createButton = (caption: string) => {
  const button = new Container();
  button.interactive = true;
  button.buttonMode = true;
  const text = createText(caption);
  const border = new Graphics();
  border.lineStyle(2, 0x4a1850, 1);
  border.drawRect(-5, -5, text.width + 10, text.height + 10);
  border.endFill();
  button.addChild(border);
  button.addChild(text);
  return button;
};
