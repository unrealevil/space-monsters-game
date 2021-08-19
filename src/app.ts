import { Application } from '@pixi/app';
import { BatchRenderer, Renderer } from '@pixi/core';
import { TickerPlugin } from '@pixi/ticker';
import { InteractionManager } from '@pixi/interaction';
import { AppLoaderPlugin } from '@pixi/loaders';

Renderer.registerPlugin('batch', BatchRenderer);
Renderer.registerPlugin('interaction', InteractionManager);
Application.registerPlugin(TickerPlugin);
Application.registerPlugin(AppLoaderPlugin);

export const createApplication = (parent: HTMLElement) => {
  const app = new Application({
    resizeTo: parent,
    //resolution: window.devicePixelRatio
  });
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  parent.appendChild(app.view);

  return app;
};
