import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbdNavBasic } from './demos/basic/nav-basic';
import { NgbdNavBasicModule } from './demos/basic/nav-basic.module';
import { NgbdNavMarkup } from './demos/markup/nav-markup';
import { NgbdNavMarkupModule } from './demos/markup/nav-markup.module';
import { NgbdNavConfig } from './demos/config/nav-config';
import { NgbdNavConfigModule } from './demos/config/nav-config.module';
import { NgbdNavCustomStyle } from './demos/custom-style/nav-custom-style';
import { NgbdNavCustomStyleModule } from './demos/custom-style/nav-custom-style.module';
import { NgbdNavSelection } from './demos/selection/nav-selection';
import { NgbdNavSelectionModule } from './demos/selection/nav-selection.module';
import { NgbdNavDynamic } from './demos/dynamic/nav-dynamic';
import { NgbdNavDynamicModule } from './demos/dynamic/nav-dynamic.module';
import { NgbdNavKeep } from './demos/keep-content/nav-keep-content';
import { NgbdNavKeepModule } from './demos/keep-content/nav-keep-content.module';
import { NgbdNavOverviewComponent } from './overview/nav-overview.component';
import { NgbdNavVertical } from './demos/vertical/nav-vertical';
import { NgbdNavVerticalModule } from './demos/vertical/nav-vertical.module';

const OVERVIEW = {
  'basic-usage': 'Basic Usage',
  customization: 'Customization',
  routing: 'Router integration',
  'keyboard-shortcuts': 'Keyboard shortcuts'
};

const DEMOS = {
  basic: {
    title: 'Basic navs',
    type: NgbdNavBasic,
    code: require('!!raw-loader!./demos/basic/nav-basic').default,
    markup: require('!!raw-loader!./demos/basic/nav-basic.html').default
  },
  markup: {
    title: 'Alternative markup',
    type: NgbdNavMarkup,
    code: require('!!raw-loader!./demos/markup/nav-markup').default,
    markup: require('!!raw-loader!./demos/markup/nav-markup.html').default
  },
  vertical: {
    title: 'Vertical pills',
    type: NgbdNavVertical,
    code: require('!!raw-loader!./demos/vertical/nav-vertical').default,
    markup: require('!!raw-loader!./demos/vertical/nav-vertical.html').default
  },
  selection: {
    title: 'Selecting navs',
    type: NgbdNavSelection,
    code: require('!!raw-loader!./demos/selection/nav-selection').default,
    markup: require('!!raw-loader!./demos/selection/nav-selection.html').default
  },
  'keep-content': {
    title: 'Keep content',
    type: NgbdNavKeep,
    code: require('!!raw-loader!./demos/keep-content/nav-keep-content').default,
    markup: require('!!raw-loader!./demos/keep-content/nav-keep-content.html').default
  },
  dynamic: {
    title: 'Dynamic navs',
    type: NgbdNavDynamic,
    code: require('!!raw-loader!./demos/dynamic/nav-dynamic').default,
    markup: require('!!raw-loader!./demos/dynamic/nav-dynamic.html').default
  },
  'custom-style': {
    title: 'Custom style',
    type: NgbdNavCustomStyle,
    code: require('!!raw-loader!./demos/custom-style/nav-custom-style').default,
    markup: require('!!raw-loader!./demos/custom-style/nav-custom-style.html').default
  },
  config: {
    title: 'Global configuration of navs',
    type: NgbdNavConfig,
    code: require('!!raw-loader!./demos/config/nav-config').default,
    markup: require('!!raw-loader!./demos/config/nav-config.html').default
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: '',
    component: ComponentWrapper,
    data: {
      bootstrap: 'https://getbootstrap.com/docs/%version%/components/navs/'
    },
    children: [
      { path: 'overview', component: NgbdNavOverviewComponent },
      { path: 'examples', component: NgbdExamplesPage },
      { path: 'api', component: NgbdApiPage }
    ]
  }
];

@NgModule({
  imports: [
    NgbdSharedModule,
    NgbdComponentsSharedModule,
    NgbdNavBasicModule,
    NgbdNavMarkupModule,
    NgbdNavSelectionModule,
    NgbdNavKeepModule,
    NgbdNavDynamicModule,
    NgbdNavCustomStyleModule,
    NgbdNavConfigModule,
    NgbdNavVerticalModule,
  ],
  declarations: [NgbdNavOverviewComponent]
})
export class NgbdNavModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('nav', DEMOS, OVERVIEW);
  }
}
