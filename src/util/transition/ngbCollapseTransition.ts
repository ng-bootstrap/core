import {NgbTransitionStartFn} from './ngbTransition';
import {reflow} from '../util';

export interface NgbCollapseCtx {
  direction: 'show' | 'hide';
  maxHeight?: string;
}

function measureCollapsingElementHeightPx(element: HTMLElement): string {
  // SSR fix for without injecting the PlatformId
  if (typeof navigator === 'undefined') {
    return '0px';
  }

  const {classList} = element;
  const hasShownClass = classList.contains('show');
  if (!hasShownClass) {
    classList.add('show');
  }

  element.style.height = '';
  const height = element.getBoundingClientRect().height + 'px';

  if (!hasShownClass) {
    classList.remove('show');
  }

  return height;
}

export const ngbCollapsingTransition: NgbTransitionStartFn<NgbCollapseCtx> =
    (element: HTMLElement, animation: boolean, context: NgbCollapseCtx) => {
      let {direction, maxHeight} = context;
      const {classList} = element;

      function setInitialClasses() {
        classList.add('collapse');
        if (direction === 'show') {
          classList.add('show');
        } else {
          classList.remove('show');
        }
      }

      // without animations we just need to set initial classes
      if (!animation) {
        setInitialClasses();
        return;
      }

      // No maxHeight -> running the transition for the first time
      if (!maxHeight) {
        maxHeight = measureCollapsingElementHeightPx(element);
        context.maxHeight = maxHeight;

        // Fix the height before starting the animation
        element.style.height = direction !== 'show' ? maxHeight : '0px';

        classList.remove('collapse');
        classList.remove('collapsing');
        classList.remove('show');

        reflow(element);

        // Start the animation
        classList.add('collapsing');
      }

      // Start or revert the animation
      element.style.height = direction === 'show' ? maxHeight : '0px';

      return () => {
        setInitialClasses();
        classList.remove('collapsing');
        element.style.height = '';
      };
    };
