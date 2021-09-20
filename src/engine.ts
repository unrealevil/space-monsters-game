import { Application } from '@pixi/app';
import EventEmitter from 'eventemitter3';

export type Point = [number, number];

export enum RotateDirection {
  CW = 1,
  CCW = -1,
  NONE = 0,
}

export type GameEvents =
  | 'start-game'
  | 'jet-fire'
  | 'monster-explode'
  | 'ray-shoot'
  | 'jet-explode'
  | 'show-menu'
  | 'show-game'
  | 'show-game-over';

export interface Engine {
  app: Application;
  emitter: EventEmitter<GameEvents>;
}
