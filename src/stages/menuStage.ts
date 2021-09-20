import { Sprite } from '@pixi/sprite';
import { Loader } from '@pixi/loaders';
import { Container } from '@pixi/display';
import { Engine } from '../engine';
import { createStarWrap } from '../gameObjects/starWarp';
import { createButton, createHeader, createSimpleText } from '../ui';
import { appendHighScore } from '../gameObjects/score';

const menuStage = ({ app, emitter }: Engine) => {
  app.stage.removeAllListeners();
  app.stage.removeChildren();
  const toggleWrap = createStarWrap(app);
  const gameTitle = createHeader('Space Monsters');
  const button = createButton('START GAME');
  gameTitle.anchor.set(0.5, 0.5);
  gameTitle.x = app.screen.width / 2;
  gameTitle.y = app.screen.height / 2 - (button.height + 10);
  app.stage.addChild(gameTitle);
  button.x = app.screen.width / 2 - button.width / 2;
  button.y = app.screen.height / 2;
  button.on('pointerup', () => {
    emitter.emit('start-game');
    toggleWrap();
    setTimeout(() => emitter.emit('show-game'), 3000);
    button.destroy();
    setTimeout(() => {
      gameTitle.destroy();
      copyright.destroy();
      highScore.destroy();
    }, 1000);
  });
  app.stage.addChild(button);

  const copyright = createCopyright(createGitHubLogo(app.loader), createPixiLogo(app.loader));
  copyright.x = app.screen.width / 2;
  copyright.y = app.screen.height - 50;
  app.stage.addChild(copyright);

  const highScore = appendHighScore(app);
};

const createCopyright = (gitHubLogo: Sprite, pixiLogo: Sprite) => {
  const copyright = new Container();
  const author = createSimpleText('UnrealEvil (Yuri Bachkov) © ' + new Date().getFullYear());
  author.anchor.set(0.5, 0.5);
  copyright.addChild(author);
  gitHubLogo.x = author.width / 2 + 10;
  copyright.addChild(gitHubLogo);
  pixiLogo.x = -author.width / 2 - 10;
  copyright.addChild(pixiLogo);
  return copyright;
};

const createGitHubLogo = (loader: Loader) => {
  const texture = loader.resources.github.texture;
  if (!texture) {
    throw new Error('github logo npt found');
  }
  const logo = new Sprite(texture);
  logo.scale.set(0.4, 0.4);
  logo.interactive = true;
  logo.buttonMode = true;
  logo.anchor.set(0, 0.5);
  logo.on('pointerup', () => (window.location.href = 'https://github.com/unrealevil/space-monsters-game'));
  return logo;
};

const createPixiLogo = (loader: Loader) => {
  const texture = loader.resources.pixi.texture;
  if (!texture) {
    throw new Error('pixi logo npt found');
  }
  const logo = new Sprite(texture);
  logo.interactive = true;
  logo.buttonMode = true;
  logo.anchor.set(1, 0.5);
  logo.on('pointerup', () => (window.location.href = 'https://pixijs.com/'));
  return logo;
};

export default menuStage;
