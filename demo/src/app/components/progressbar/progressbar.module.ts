import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbdProgressbarBasic } from './demos/basic/progressbar-basic';
import { NgbdProgressbarBasicModule } from './demos/basic/progressbar-basic.module';
import { NgbdProgressbarConfig } from './demos/config/progressbar-config';
import { NgbdProgressbarConfigModule } from './demos/config/progressbar-config.module';
import { NgbdProgressbarHeight } from './demos/height/progressbar-height';
import { NgbdProgressbarHeightModule } from './demos/height/progressbar-height.module';
import { NgbdProgressbarLabels } from './demos/labels/progressbar-labels';
import { NgbdProgressbarLabelsModule } from './demos/labels/progressbar-labels.module';
import { NgbdProgressbarShowValueModule } from './demos/showvalue/progressbar-show-value.module';
import { NgbdProgressbarShowvalue } from './demos/showvalue/progressbar-showvalue';
import { NgbdProgressbarStriped } from './demos/striped/progressbar-striped';
import { NgbdProgressbarStripedModule } from './demos/striped/progressbar-striped.module';
import { NgbdProgressbarTextTypes } from './demos/texttypes/progressbar-texttypes';
import { NgbdProgressbarTextTypesModule } from './demos/texttypes/progressbar-texttypes.module';

const DEMOS = {
  basic: {
    title: 'Contextual progress bars',
    type: NgbdProgressbarBasic,
    code: require('!!raw-loader!./demos/basic/progressbar-basic').default,
    markup: require('!!raw-loader!./demos/basic/progressbar-basic.html').default
  },
  texttypes: {
    title: 'Contextual text progress bars',
    type: NgbdProgressbarTextTypes,
    code: require('!!raw-loader!./demos/texttypes/progressbar-texttypes').default,
    markup: require('!!raw-loader!./demos/texttypes/progressbar-texttypes.html').default
  },
  showvalue: {
    title: 'Progress bars with current value labels',
    type: NgbdProgressbarShowvalue,
    code: require('!!raw-loader!./demos/showvalue/progressbar-showvalue').default,
    markup: require('!!raw-loader!./demos/showvalue/progressbar-showvalue.html').default
  },
  striped: {
    title: 'Striped progress bars',
    type: NgbdProgressbarStriped,
    code: require('!!raw-loader!./demos/striped/progressbar-striped').default,
    markup: require('!!raw-loader!./demos/striped/progressbar-striped.html').default
  },
  labels: {
    title: 'Progress bars with custom labels',
    type: NgbdProgressbarLabels,
    code: require('!!raw-loader!./demos/labels/progressbar-labels').default,
    markup: require('!!raw-loader!./demos/labels/progressbar-labels.html').default
  },
  height: {
    title: 'Progress bars with height',
    type: NgbdProgressbarHeight,
    code: require('!!raw-loader!./demos/height/progressbar-height').default,
    markup: require('!!raw-loader!./demos/height/progressbar-height.html').default
  },
  config: {
    title: 'Global configuration of progress bars',
    type: NgbdProgressbarConfig,
    code: require('!!raw-loader!./demos/config/progressbar-config').default,
    markup: require('!!raw-loader!./demos/config/progressbar-config.html').default
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ComponentWrapper,
    data: {
      bootstrap: 'https://getbootstrap.com/docs/%version%/components/progress/'
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
    NgbdProgressbarBasicModule,
    NgbdProgressbarShowValueModule,
    NgbdProgressbarStripedModule,
    NgbdProgressbarConfigModule,
    NgbdProgressbarLabelsModule,
    NgbdProgressbarHeightModule,
    NgbdProgressbarTextTypesModule,
  ]
})
export class NgbdProgressbarModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('progressbar', DEMOS);
  }
}
