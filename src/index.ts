import { EventEmitter } from 'eventemitter3';
import { createApplication } from './app';
import { loadResources } from './resources';
import { Engine, GameEvents } from './engine';
import soundController from './controller/soundController';
import navigation from './navigation';

const app = createApplication(document.body);
const emitter = new EventEmitter<GameEvents>();

loadResources(app.loader, () => {
  const loading = document.querySelector<HTMLElement>('#loading');
  if (loading) {
    loading.style.display = 'none';
  }
  const engine: Engine = { app, emitter };
  soundController(engine);
  navigation(engine);
  engine.emitter.emit('show-menu');
});
