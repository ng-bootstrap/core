import {NgModule} from '@angular/core';

import {NgbdSharedModule} from '../../../app/shared';
import {ComponentWrapper} from '../../shared/component-wrapper/component-wrapper.component';
import {NgbdComponentsSharedModule, NgbdDemoList} from '../shared';
import {NgbdApiPage} from '../shared/api-page/api.component';
import {NgbdExamplesPage} from '../shared/examples-page/examples.component';
import {NgbdToastCloseable} from './demos/closeable/toast-closeable';
import {NgbdToastCloseableModule} from './demos/closeable/toast-closeable.module';
import {NgbdToastCustomHeader} from './demos/custom-header/toast-custom-header';
import {NgbdToastCustomHeaderModule} from './demos/custom-header/toast-custom-header.module';
import {NgbdToastGlobal} from './demos/howto-global/toast-global.component';
import {NgbdToastGlobalModule} from './demos/howto-global/toast-global.module';
import {NgbdToastInline} from './demos/inline/toast-inline';
import {NgbdToastInlineModule} from './demos/inline/toast-inline.module';
import {NgbdToastPreventAutohide} from './demos/prevent-autohide/toast-prevent-autohide';
import {NgbdToastPreventAutohideModule} from './demos/prevent-autohide/toast-prevent-autohide.module';
import {NgbdToastOverviewComponent} from './overview/toast-overview.component';
import {versions} from '../../../environments/versions';

const OVERVIEW = {
  'inline-usage': 'Declarative usage',
  'toast-service': 'Building a toast management service'
};

const DEMOS = {
  inline: {
    title: 'Declarative inline usage',
    type: NgbdToastInline,
    code: require('!!raw-loader!./demos/inline/toast-inline').default,
    markup: require('!!raw-loader!./demos/inline/toast-inline.html').default
  },
  'custom-header': {
    title: 'Using a Template as header',
    type: NgbdToastCustomHeader,
    files: [
      {
        name: 'toast-custom-header.html',
        source: require('!!raw-loader!./demos/custom-header/toast-custom-header.html').default
      },
      {
        name: 'toast-custom-header.ts',
        source: require('!!raw-loader!./demos/custom-header/toast-custom-header').default}
    ]
  },
  closeable: {
    title: 'Closeable toast',
    type: NgbdToastCloseable,
    files: [
      {
        name: 'toast-closeable.html',
        source: require('!!raw-loader!./demos/closeable/toast-closeable.html').default},
      {
        name: 'toast-closeable.ts',
        source: require('!!raw-loader!./demos/closeable/toast-closeable.ts').default}
    ]
  },
  'prevent-autohide': {
    title: 'Prevent autohide on mouseover',
    type: NgbdToastPreventAutohide,
    files: [
      {
        name: 'toast-prevent-autohide.html',
        source: require('!!raw-loader!./demos/prevent-autohide/toast-prevent-autohide.html').default
      },
      {
        name: 'toast-prevent-autohide.ts',
        source: require('!!raw-loader!./demos/prevent-autohide/toast-prevent-autohide.ts').default
      }
    ]
  },
  'howto-global': {
    title: 'Toast management service',
    type: NgbdToastGlobal,
    files: [
      {
        name: 'toast-service.ts',
        source: require('!!raw-loader!./demos/howto-global/toast-service.ts').default
      },
      {
        name: 'toast-global.component.html',
        source: require('!!raw-loader!./demos/howto-global/toast-global.component.html').default
      },
      {
        name: 'toast-global.component.ts',
        source: require('!!raw-loader!./demos/howto-global/toast-global.component').default
      },
      {
        name: 'toasts-container.component.ts',
        source: require('!!raw-loader!./demos/howto-global/toasts-container.component').default
      }
    ]
  }
};

const bsVersion = versions.bootstrap;

export const ROUTES = [
  {path: '', pathMatch: 'full', redirectTo: 'overview'}, {
    path: '',
    component: ComponentWrapper,
    data: {
      bootstrap: `https://getbootstrap.com/docs/${bsVersion}/components/toasts/`
    },
    children: [
      {path: 'overview', component: NgbdToastOverviewComponent}, {path: 'examples', component: NgbdExamplesPage},
      {path: 'api', component: NgbdApiPage}
    ]
  }
];

@NgModule({
  imports: [
    NgbdSharedModule, NgbdComponentsSharedModule, NgbdToastInlineModule, NgbdToastCloseableModule,
    NgbdToastCustomHeaderModule, NgbdToastPreventAutohideModule, NgbdToastGlobalModule
  ],
  declarations: [NgbdToastOverviewComponent]
})
export class NgbdToastModule {
  constructor(demoList: NgbdDemoList) { demoList.register('toast', DEMOS, OVERVIEW); }
}
