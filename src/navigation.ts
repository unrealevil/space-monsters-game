import { Engine } from './engine';
import menuStage from './stages/menuStage';
import gameStage from './stages/gameStage';
import gameOverStage from './stages/gameOverStage';

const navigation = (engine: Engine) => {
  engine.emitter.on('show-menu', () => {
    menuStage(engine);
  });
  engine.emitter.on('show-game', () => {
    gameStage(engine);
  });
  engine.emitter.on('show-game-over', () => {
    gameOverStage(engine);
  });
};

export default navigation;
