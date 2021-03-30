import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import docs from '../../../../api-docs';
import {ClassDesc, MethodDesc, signature} from './api-docs.model';
import {Analytics} from '../../../shared/analytics/analytics';

/**
 * Displays the API docs of a class, which is not a directive.
 *
 * For Config services, use NgbdApiDocsConfig instead.
 */
@Component({
  selector: 'ngbd-api-docs-class',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-docs-class.component.html',
  styles: [`
    .label-cell {
      width: 25%;
    }
    .content-cell {
      width: 75%;
    }
    `
  ]
})
export class NgbdApiDocsClass {
  apiDocs: ClassDesc;

  constructor(private _analytics: Analytics) {}

  @Input() set type(typeName: string) {
    this.apiDocs = docs[typeName];
  }

  methodSignature(method: MethodDesc): string { return signature(method); }

  trackSourceClick() {
    this._analytics.trackEvent('Source File View', this.apiDocs.className);
  }
}
