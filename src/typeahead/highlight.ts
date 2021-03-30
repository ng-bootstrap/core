import {Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {regExpEscape, toString, removeAccents} from '../util/util';

/**
 * A component that helps with text highlighting.
 *
 * If splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
@Component({
  selector: 'ngb-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
      `<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>` +
      `</ng-template>`,  // template needs to be formatted in a certain way so we don't add empty text nodes
  styleUrls: ['./highlight.scss']
})
export class NgbHighlight implements OnChanges {
  parts: string[];

  /**
   * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
   */
  @Input() highlightClass = 'ngb-highlight';

  /**
   * The text highlighting is added to.
   *
   * If the `term` is found inside this text, it will be highlighted.
   * If the `term` contains array then all the items from it will be highlighted inside the text.
   */
  @Input() result?: string | null;

  /**
   * The term or array of terms to be highlighted.
   * Since version `v4.2.0` term could be a `string[]`
   */
  @Input() term: string | readonly string[];

  /**
   * Boolean option to determine if the highlighting should be sensitive to accents or not.
   *
   * This feature is only available for browsers that implement the `String.normalize` function
   * (typically not Internet Explorer).
   * If you want to use this feature in a browser that does not implement `String.normalize`,
   * you will have to include a polyfill in your application (`unorm` for example).
   *
   * @since 9.1.0
   */
  @Input() accentSensitive = true;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.accentSensitive && !String.prototype.normalize) {
      console.warn(
          'The `accentSensitive` input in `ngb-highlight` cannot be set to `false` in a browser ' +
          'that does not implement the `String.normalize` function. ' +
          'You will have to include a polyfill in your application to use this feature in the current browser.');
      this.accentSensitive = true;
    }
    const result = toString(this.result);

    const terms = Array.isArray(this.term) ? this.term : [this.term];
    const prepareTerm = term => this.accentSensitive ? term : removeAccents(term);
    const escapedTerms = terms.map(term => regExpEscape(prepareTerm(toString(term)))).filter(term => term);
    const toSplit = this.accentSensitive ? result : removeAccents(result);

    const parts = escapedTerms.length ? toSplit.split(new RegExp(`(${escapedTerms.join('|')})`, 'gmi')) : [result];

    if (this.accentSensitive) {
      this.parts = parts;
    } else {
      let offset = 0;
      this.parts = parts.map(part => result.substring(offset, offset += part.length));
    }
  }
}
