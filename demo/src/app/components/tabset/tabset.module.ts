import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbdTabsetBasic } from './demos/basic/tabset-basic';
import { NgbdTabsetBasicModule } from './demos/basic/tabset-basic.module';
import { NgbdTabsetConfig } from './demos/config/tabset-config';
import { NgbdTabsetConfigModule } from './demos/config/tabset-config.module';
import { NgbdTabsetJustify } from './demos/justify/tabset-justify';
import { NgbdTabsetJustifyModule } from './demos/justify/tabset-justify.module';
import { NgbdTabsetOrientation } from './demos/orientation/tabset-orientation';
import { NgbdTabsetOrientationModule } from './demos/orientation/tabset-orientation.module';
import { NgbdTabsetPills } from './demos/pills/tabset-pills';
import { NgbdTabsetPillsModule } from './demos/pills/tabset-pills.module';
import { NgbdTabsetPreventChangeModule } from './demos/preventchange/tabset-prevent-change.module';
import { NgbdTabsetPreventchange } from './demos/preventchange/tabset-preventchange';
import { NgbdTabsetSelectbyid } from './demos/selectbyid/tabset-selectbyid';
import { NgbdTabsetSelectbyidModule } from './demos/selectbyid/tabset-selectbyid.module';
import { NgbdTabsetWarningComponent } from './tabset-warning.component';

const DEMOS = {
  basic: {
    title: 'Tabset',
    type: NgbdTabsetBasic,
    code: require('!!raw-loader!./demos/basic/tabset-basic').default,
    markup: require('!!raw-loader!./demos/basic/tabset-basic.html').default,
    showStackblitz: false
  },
  pills: {
    title: 'Pills',
    type: NgbdTabsetPills,
    code: require('!!raw-loader!./demos/pills/tabset-pills').default,
    markup: require('!!raw-loader!./demos/pills/tabset-pills.html').default,
    showStackblitz: false
  },
  selectbyid: {
    title: 'Select an active tab by id',
    type: NgbdTabsetSelectbyid,
    code: require('!!raw-loader!./demos/selectbyid/tabset-selectbyid').default,
    markup: require('!!raw-loader!./demos/selectbyid/tabset-selectbyid.html').default,
    showStackblitz: false
  },
  preventchange: {
    title: 'Prevent tab change',
    type: NgbdTabsetPreventchange,
    code: require('!!raw-loader!./demos/preventchange/tabset-preventchange').default,
    markup: require('!!raw-loader!./demos/preventchange/tabset-preventchange.html').default,
    showStackblitz: false
  },
  justify: {
    title: 'Nav justification',
    type: NgbdTabsetJustify,
    code: require('!!raw-loader!./demos/justify/tabset-justify').default,
    markup: require('!!raw-loader!./demos/justify/tabset-justify.html').default,
    showStackblitz: false
  },
  orientation: {
    title: 'Nav orientation',
    type: NgbdTabsetOrientation,
    code: require('!!raw-loader!./demos/orientation/tabset-orientation').default,
    markup: require('!!raw-loader!./demos/orientation/tabset-orientation.html').default,
    showStackblitz: false
  },
  config: {
    title: 'Global configuration of tabs',
    type: NgbdTabsetConfig,
    code: require('!!raw-loader!./demos/config/tabset-config').default,
    markup: require('!!raw-loader!./demos/config/tabset-config.html').default,
    showStackblitz: false
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ComponentWrapper,
    data: {
      header: NgbdTabsetWarningComponent
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
    NgbdTabsetBasicModule,
    NgbdTabsetPillsModule,
    NgbdTabsetPreventChangeModule,
    NgbdTabsetSelectbyidModule,
    NgbdTabsetConfigModule,
    NgbdTabsetJustifyModule,
    NgbdTabsetOrientationModule
  ],
  declarations: [NgbdTabsetWarningComponent],
  entryComponents: [NgbdTabsetWarningComponent]
})
export class NgbdTabsetModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('tabset', DEMOS);
  }
}
