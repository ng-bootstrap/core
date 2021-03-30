import {NgbTransitionStartFn} from '../util/transition/ngbTransition';
import {reflow} from '../util/util';

export const ngbNavFadeOutTransition: NgbTransitionStartFn = ({classList}) => {
  classList.remove('show');
  return () => classList.remove('active');
};

export const ngbNavFadeInTransition: NgbTransitionStartFn = (element: HTMLElement, animation: boolean) => {
  if (animation) {
    reflow(element);
  }
  element.classList.add('show');
};
