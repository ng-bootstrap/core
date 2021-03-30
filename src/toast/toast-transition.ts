import {NgbTransitionStartFn} from '../util/transition/ngbTransition';
import {reflow} from '../util/util';

export const ngbToastFadeInTransition: NgbTransitionStartFn = (element: HTMLElement, animation: true) => {
  const {classList} = element;

  if (!animation) {
    classList.add('show');
    return;
  }

  classList.remove('hide');
  reflow(element);
  classList.add('showing');

  return () => {
    classList.remove('showing');
    classList.add('show');
  };
};

export const ngbToastFadeOutTransition: NgbTransitionStartFn = ({classList}: HTMLElement) => {
  classList.remove('show');
  return () => { classList.add('hide'); };
};
