import { DisplayObject } from '@pixi/display';
import { InteractionEvent } from '@pixi/interaction';
import { Runner } from '@pixi/runner';

export const onSetDestinationPoint = new Runner('setDestinationPoint');
export const onSetAttackPoint = new Runner('setAttackPoint');

const doubleClick = ({ data }: InteractionEvent) => {
  onSetAttackPoint.emit([data.global.x, data.global.y]);
};

const click = ({ data }: InteractionEvent) => {
  onSetDestinationPoint.emit([data.global.x, data.global.y]);
};

export const createJetControl = (target: DisplayObject) => {
  target.interactive = true;
  let clickCount = 0;
  target.on('pointerup', (event: InteractionEvent) => {
    clickCount++;
    setTimeout(() => {
      if (clickCount === 0) {
        return;
      }
      if (clickCount > 1) {
        doubleClick(event);
      } else {
        click(event);
      }
      clickCount = 0;
    }, 200);
  });
};
