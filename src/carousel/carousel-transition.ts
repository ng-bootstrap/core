import {NgbTransitionStartFn} from '../util/transition/ngbTransition';
import {reflow} from '../util/util';

/**
 * Defines the carousel slide transition direction.
 */
export enum NgbSlideEventDirection {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface NgbCarouselCtx { direction: 'left' | 'right'; }

const isBeingAnimated = ({classList}: HTMLElement) => {
  return classList.contains('carousel-item-left') || classList.contains('carousel-item-right');
};

const removeDirectionClasses = (classList: DOMTokenList) => {
  classList.remove('carousel-item-left');
  classList.remove('carousel-item-right');
};

const removeClasses = (classList: DOMTokenList) => {
  removeDirectionClasses(classList);
  classList.remove('carousel-item-prev');
  classList.remove('carousel-item-next');
};

export const ngbCarouselTransitionIn: NgbTransitionStartFn<NgbCarouselCtx> =
    (element: HTMLElement, animation: boolean, {direction}: NgbCarouselCtx) => {
      const {classList} = element;

      if (!animation) {
        removeDirectionClasses(classList);
        removeClasses(classList);
        classList.add('active');
        return;
      }

      if (isBeingAnimated(element)) {
        // Revert the transition
        removeDirectionClasses(classList);
      } else {
        // For the 'in' transition, a 'pre-class' is applied to the element to ensure its visibility
        classList.add('carousel-item-' + (direction === NgbSlideEventDirection.LEFT ? 'next' : 'prev'));
        reflow(element);
        classList.add('carousel-item-' + direction);
      }

      return () => {
        removeClasses(classList);
        classList.add('active');
      };
    };

export const ngbCarouselTransitionOut: NgbTransitionStartFn<NgbCarouselCtx> =
    (element: HTMLElement, animation: boolean, {direction}: NgbCarouselCtx) => {
      const {classList} = element;

      if (!animation) {
        removeDirectionClasses(classList);
        removeClasses(classList);
        classList.remove('active');
        return;
      }

      //  direction is left or right, depending on the way the slide goes out.
      if (isBeingAnimated(element)) {
        // Revert the transition
        removeDirectionClasses(classList);
      } else {
        classList.add('carousel-item-' + direction);
      }

      return () => {
        removeClasses(classList);
        classList.remove('active');
      };
    };
