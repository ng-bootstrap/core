import {NgbTransitionStartFn} from '../util/transition/ngbTransition';

export const ngbAlertFadingTransition: NgbTransitionStartFn = ({classList}: HTMLElement) => {
  classList.remove('show');
};
