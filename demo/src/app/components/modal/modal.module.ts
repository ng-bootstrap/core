import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbdModalBasic } from './demos/basic/modal-basic';
import { NgbdModalBasicModule } from './demos/basic/modal-basic.module';
import { NgbdModalComponent } from './demos/component/modal-component';
import { NgbdModalComponentModule } from './demos/component/modal-component.module';
import { NgbdModalConfig } from './demos/config/modal-config';
import { NgbdModalConfigModule } from './demos/config/modal-config.module';
import { NgbdModalFocus } from './demos/focus/modal-focus';
import { NgbdModalFocusModule } from './demos/focus/modal-focus.module';
import { NgbdModalOptions } from './demos/options/modal-options';
import { NgbdModalOptionsModule } from './demos/options/modal-options.module';
import { NgbdModalStacked } from './demos/stacked/modal-stacked';
import { NgbdModalStackedModule } from './demos/stacked/modal-stacked.module';

const DEMOS = {
  basic: {
    title: 'Modal with default options',
    type: NgbdModalBasic,
    code: require('!!raw-loader!./demos/basic/modal-basic').default,
    markup: require('!!raw-loader!./demos/basic/modal-basic.html').default
  },
  component: {
    title: 'Components as content',
    type: NgbdModalComponent,
    code: require('!!raw-loader!./demos/component/modal-component').default,
    markup: require('!!raw-loader!./demos/component/modal-component.html').default
  },
  focus: {
    title: 'Focus management',
    type: NgbdModalFocus,
    code: require('!!raw-loader!./demos/focus/modal-focus').default,
    markup: require('!!raw-loader!./demos/focus/modal-focus.html').default
  },
  options: {
    title: 'Modal with options',
    type: NgbdModalOptions,
    code: require('!!raw-loader!./demos/options/modal-options').default,
    markup: require('!!raw-loader!./demos/options/modal-options.html').default
  },
  stacked: {
    title: 'Stacked modals',
    type: NgbdModalStacked,
    code: require('!!raw-loader!./demos/stacked/modal-stacked').default,
    markup: require('!!raw-loader!./demos/stacked/modal-stacked.html').default
  },
  config: {
    title: 'Global configuration of modals',
    type: NgbdModalConfig,
    code: require('!!raw-loader!./demos/config/modal-config').default,
    markup: require('!!raw-loader!./demos/config/modal-config.html').default
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ComponentWrapper,
    data: {
      bootstrap: 'https://getbootstrap.com/docs/%version%/components/modal/'
    },
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
    NgbdModalBasicModule,
    NgbdModalComponentModule,
    NgbdModalOptionsModule,
    NgbdModalStackedModule,
    NgbdModalConfigModule,
    NgbdModalFocusModule
  ]
})
export class NgbdModalModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('modal', DEMOS);
  }
}
