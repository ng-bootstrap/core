import {NgModule} from '@angular/core';

import {NgbdSharedModule} from '../../shared';
import {ComponentWrapper} from '../../shared/component-wrapper/component-wrapper.component';
import {NgbdComponentsSharedModule, NgbdDemoList} from '../shared';
import {NgbdApiPage} from '../shared/api-page/api.component';
import {NgbdExamplesPage} from '../shared/examples-page/examples.component';
import {NgbdTypeaheadBasic} from './demos/basic/typeahead-basic';
import {NgbdTypeaheadBasicModule} from './demos/basic/typeahead-basic.module';
import {NgbdTypeaheadConfig} from './demos/config/typeahead-config';
import {NgbdTypeaheadConfigModule} from './demos/config/typeahead-config.module';
import {NgbdTypeaheadFocus} from './demos/focus/typeahead-focus';
import {NgbdTypeaheadFocusModule} from './demos/focus/typeahead-focus.module';
import {NgbdTypeaheadFormat} from './demos/format/typeahead-format';
import {NgbdTypeaheadFormatModule} from './demos/format/typeahead-format.module';
import {NgbdTypeaheadHttp} from './demos/http/typeahead-http';
import {NgbdTypeaheadHttpModule} from './demos/http/typeahead-http.module';
import {NgbdTypeaheadTemplate} from './demos/template/typeahead-template';
import {NgbdTypeaheadTemplateModule} from './demos/template/typeahead-template.module';
import {NgbdTypeaheadPreventManualEntry} from './demos/prevent-manual-entry/typeahead-prevent-manual-entry';
import {NgbdTypeaheadPreventManualEntryModule} from './demos/prevent-manual-entry/typeahead-prevent-manual-entry.module';

const DEMOS = {
  basic: {
    title: 'Simple Typeahead',
    type: NgbdTypeaheadBasic,
    code: require('!!raw-loader!./demos/basic/typeahead-basic').default,
    markup: require('!!raw-loader!./demos/basic/typeahead-basic.html').default
  },
  focus: {
    title: 'Open on focus',
    type: NgbdTypeaheadFocus,
    code: require('!!raw-loader!./demos/focus/typeahead-focus').default,
    markup: require('!!raw-loader!./demos/focus/typeahead-focus.html').default
  },
  format: {
    title: 'Formatted results',
    type: NgbdTypeaheadFormat,
    code: require('!!raw-loader!./demos/format/typeahead-format').default,
    markup: require('!!raw-loader!./demos/format/typeahead-format.html').default
  },
  http: {
    title: 'Wikipedia search',
    type: NgbdTypeaheadHttp,
    code: require('!!raw-loader!./demos/http/typeahead-http').default,
    markup: require('!!raw-loader!./demos/http/typeahead-http.html').default
  },
  template: {
    title: 'Template for results',
    type: NgbdTypeaheadTemplate,
    code: require('!!raw-loader!./demos/template/typeahead-template').default,
    markup: require('!!raw-loader!./demos/template/typeahead-template.html').default
  },
  'prevent-manual-entry': {
    title: 'Prevent manual entry',
    type: NgbdTypeaheadPreventManualEntry,
    code: require('!!raw-loader!./demos/prevent-manual-entry/typeahead-prevent-manual-entry').default,
    markup: require('!!raw-loader!./demos/prevent-manual-entry/typeahead-prevent-manual-entry.html').default
  },
  config: {
    title: 'Global configuration of typeaheads',
    type: NgbdTypeaheadConfig,
    code: require('!!raw-loader!./demos/config/typeahead-config').default,
    markup: require('!!raw-loader!./demos/config/typeahead-config.html').default
  }
};

export const ROUTES = [
  {path: '', pathMatch: 'full', redirectTo: 'examples'}, {
    path: '',
    component: ComponentWrapper,
    children: [{path: 'examples', component: NgbdExamplesPage}, {path: 'api', component: NgbdApiPage}]
  }
];

@NgModule({
  imports: [
    NgbdSharedModule, NgbdComponentsSharedModule, NgbdTypeaheadFormatModule, NgbdTypeaheadHttpModule,
    NgbdTypeaheadBasicModule, NgbdTypeaheadFocusModule, NgbdTypeaheadTemplateModule, NgbdTypeaheadConfigModule,
    NgbdTypeaheadPreventManualEntryModule
  ]
})
export class NgbdTypeaheadModule {
  constructor(demoList: NgbdDemoList) { demoList.register('typeahead', DEMOS); }
}
