import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import docs from '../../../../api-docs';
import {ClassDesc} from './api-docs.model';
import {Analytics} from '../../../shared/analytics/analytics';

const CONFIG_SUFFIX_LENGTH = 'Config'.length;

/**
 * Displays the API docs of a Config service. A Config service for a component Foo is named, by convention,
 * FooConfig, and only has properties, whose name matches with an input of the directive.
 * In order to avoid cluttering the demo pages, the only things displayed by this component
 * is the description of the Config service and the list of its properties, whose documentation and
 * default value is documented in the directive itself.
 */
@Component({
  selector: 'ngbd-api-docs-config',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './api-docs-config.component.html'
})
export class NgbdApiDocsConfig {
  apiDocs: ClassDesc;
  directiveName: string;

  constructor(private _analytics: Analytics) {}

  @Input() set type(typeName: string) {
    this.apiDocs = docs[typeName];
    this.directiveName = typeName.slice(0, -CONFIG_SUFFIX_LENGTH);
  }

  trackSourceClick() {
    this._analytics.trackEvent('Source File View', this.apiDocs.className);
  }
}
