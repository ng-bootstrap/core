import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbdAlertBasic } from './demos/basic/alert-basic';
import { NgbdAlertBasicModule } from './demos/basic/alert-basic.module';
import { NgbdAlertCloseable } from './demos/closeable/alert-closeable';
import { NgbdAlertCloseableModule } from './demos/closeable/alert-closeable.module';
import { NgbdAlertConfig } from './demos/config/alert-config';
import { NgbdAlertConfigModule } from './demos/config/alert-config.module';
import { NgbdAlertCustom } from './demos/custom/alert-custom';
import { NgbdAlertCustomModule } from './demos/custom/alert-custom.module';
import { NgbdAlertSelfclosing } from './demos/selfclosing/alert-selfclosing';
import { NgbdAlertSelfclosingModule } from './demos/selfclosing/alert-selfclosing.module';

const DEMOS = {
  basic: {
    title: 'Basic Alert',
    type: NgbdAlertBasic,
    files: [
      {
        name: 'alert-basic.html',
        source: require('!!raw-loader!./demos/basic/alert-basic.html').default
      },
      {
        name: 'alert-basic.ts',
        source: require('!!raw-loader!./demos/basic/alert-basic').default
      }
    ]
  },
  closeable: {
    title: 'Closable Alert',
    type: NgbdAlertCloseable,
    files: [
      {
        name: 'alert-closeable.html',
        source: require('!!raw-loader!./demos/closeable/alert-closeable.html').default
      },
      {
        name: 'alert-closeable.ts',
        source: require('!!raw-loader!./demos/closeable/alert-closeable').default
      }
    ]
  },
  selfclosing: {
    title: 'Self closing alert',
    type: NgbdAlertSelfclosing,
    files: [
      {
        name: 'alert-selfclosing.html',
        source: require('!!raw-loader!./demos/selfclosing/alert-selfclosing.html').default
      },
      {
        name: 'alert-selfclosing.ts',
        source: require('!!raw-loader!./demos/selfclosing/alert-selfclosing').default
      }
    ]
  },
  custom: {
    title: 'Custom alert',
    type: NgbdAlertCustom,
    files: [
      {
        name: 'alert-custom.html',
        source: require('!!raw-loader!./demos/custom/alert-custom.html').default
      },
      {
        name: 'alert-custom.ts',
        source: require('!!raw-loader!./demos/custom/alert-custom').default
      }
    ]
  },
  config: {
    title: 'Global configuration of alerts',
    type: NgbdAlertConfig,
    files: [
      {
        name: 'alert-config.html',
        source: require('!!raw-loader!./demos/config/alert-config.html').default
      },
      {
        name: 'alert-config.ts',
        source: require('!!raw-loader!./demos/config/alert-config').default
      }
    ]
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ComponentWrapper,
    data: { bootstrap: 'https://getbootstrap.com/docs/%version%/components/alerts/' },
    children: [
      { path: 'examples', component: NgbdExamplesPage },
      { path: 'api', component: NgbdApiPage }
    ]
  }
];

@NgModule({
  imports: [
    NgbdSharedModule,
    NgbdComponentsSharedModule,
    NgbdAlertBasicModule,
    NgbdAlertCloseableModule,
    NgbdAlertCustomModule,
    NgbdAlertConfigModule,
    NgbdAlertSelfclosingModule
  ]
})
export class NgbdAlertModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('alert', DEMOS);
  }
}
