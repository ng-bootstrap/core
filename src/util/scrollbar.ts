import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';


const noop = () => {};



/** Type for the callback used to revert the scrollbar compensation. */
export type CompensationReverter = () => void;



/**
 * Utility to handle the scrollbar.
 *
 * It allows to compensate the lack of a vertical scrollbar by adding an
 * equivalent padding on the right of the body, and to remove this compensation.
 */
@Injectable({providedIn: 'root'})
export class ScrollBar {
  constructor(@Inject(DOCUMENT) private _document: any) {}

  /**
   * To be called right before a potential vertical scrollbar would be removed:
   *
   * - if there was a scrollbar, adds some compensation padding to the body
   * to keep the same layout as when the scrollbar is there
   * - if there was none, there is nothing to do
   *
   * @return a callback used to revert the compensation (noop if there was none,
   * otherwise a function removing the padding)
   */
  compensate(): CompensationReverter {
    const width = this._getWidth();
    return !this._isPresent(width) ? noop : this._adjustBody(width);
  }

  /**
   * Adds a padding of the given width on the right of the body.
   *
   * @return a callback used to revert the padding to its previous value
   */
  private _adjustBody(scrollbarWidth: number): CompensationReverter {
    const body = this._document.body;
    const userSetPaddingStyle = body.style.paddingRight;
    const actualPadding = parseFloat(window.getComputedStyle(body)['padding-right']);
    body.style['padding-right'] = `${actualPadding + scrollbarWidth}px`;
    return () => body.style['padding-right'] = userSetPaddingStyle;
  }

  /**
   * Tells whether a scrollbar is currently present on the body.
   *
   * @return true if scrollbar is present, false otherwise
   */
  private _isPresent(scrollbarWidth: number): boolean {
    const rect = this._document.body.getBoundingClientRect();
    const bodyToViewportGap = window.innerWidth - (rect.left + rect.right);
    const uncertainty = 0.1 * scrollbarWidth;
    return bodyToViewportGap >= scrollbarWidth - uncertainty;
  }

  /**
   * Calculates and returns the width of a scrollbar.
   *
   * @return the width of a scrollbar on this page
   */
  private _getWidth(): number {
    const measurer = this._document.createElement('div');
    measurer.className = 'modal-scrollbar-measure';

    const body = this._document.body;
    body.appendChild(measurer);
    const width = measurer.getBoundingClientRect().width - measurer.clientWidth;
    body.removeChild(measurer);

    return width;
  }
}
