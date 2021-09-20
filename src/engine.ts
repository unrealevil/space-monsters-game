import { Application } from '@pixi/app';
import EventEmitter from 'eventemitter3';
import { GameEvents } from './events';

export type Point = [number, number];

export enum RotateDirection {
  CW = 1,
  CCW = -1,
  NONE = 0,
}

export interface Engine {
  app: Application;
  emitter: EventEmitter<GameEvents>;
}
