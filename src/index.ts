import { EventEmitter } from 'eventemitter3';
import { createMenuStage } from './stages/menuStage';
import { createApplication } from './app';
import { loadResources } from './resources';
import { Engine } from './engine';
import { GameEvents } from './events';
import soundController from './controller/soundController';

const app = createApplication(document.body);
const emitter = new EventEmitter<GameEvents>();

loadResources(app.loader, () => {
  const loading = document.querySelector<HTMLElement>('#loading');
  if (loading) {
    loading.style.display = 'none';
  }
  const engine: Engine = { app, emitter };
  soundController(engine);
  createMenuStage(engine);
});
