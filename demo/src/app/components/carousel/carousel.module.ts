import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbdCarouselBasic } from './demos/basic/carousel-basic';
import { NgbdCarouselBasicModule } from './demos/basic/carousel-basic.module';
import { NgbdCarouselConfig } from './demos/config/carousel-config';
import { NgbdCarouselConfigModule } from './demos/config/carousel-config.module';
import { NgbdCarouselNavigation } from './demos/navigation/carousel-navigation';
import { NgbdCarouselNavigationModule } from './demos/navigation/carousel-navigation.module';
import { NgbdCarouselPause } from './demos/pause/carousel-pause';
import { NgbdCarouselPauseModule } from './demos/pause/carousel-pause.module';

const DEMOS = {
  basic: {
    title: 'Carousel',
    type: NgbdCarouselBasic,
    code: require('!!raw-loader!./demos/basic/carousel-basic').default,
    markup: require('!!raw-loader!./demos/basic/carousel-basic.html').default
  },
  navigation: {
    title: 'Navigation arrows and indicators',
    type: NgbdCarouselNavigation,
    code: require('!!raw-loader!./demos/navigation/carousel-navigation').default,
    markup: require('!!raw-loader!./demos/navigation/carousel-navigation.html').default
  },
  pause: {
    title: 'Pause/cycle',
    type: NgbdCarouselPause,
    code: require('!!raw-loader!./demos/pause/carousel-pause').default,
    markup: require('!!raw-loader!./demos/pause/carousel-pause.html').default
  },
  config: {
    title: 'Global configuration of carousels',
    type: NgbdCarouselConfig,
    code: require('!!raw-loader!./demos/config/carousel-config').default,
    markup: require('!!raw-loader!./demos/config/carousel-config.html').default
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ComponentWrapper,
    data: {
      bootstrap: 'https://getbootstrap.com/docs/%version%/components/carousel/'
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
    NgbdCarouselBasicModule,
    NgbdCarouselConfigModule,
    NgbdCarouselNavigationModule,
    NgbdCarouselPauseModule
  ]
})
export class NgbdCarouselModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('carousel', DEMOS);
  }
}
