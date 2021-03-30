import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbdTooltipAutoclose } from './demos/autoclose/tooltip-autoclose';
import { NgbdTooltipAutocloseModule } from './demos/autoclose/tooltip-autoclose.module';
import { NgbdTooltipBasic } from './demos/basic/tooltip-basic';
import { NgbdTooltipBasicModule } from './demos/basic/tooltip-basic.module';
import { NgbdTooltipConfig } from './demos/config/tooltip-config';
import { NgbdTooltipConfigModule } from './demos/config/tooltip-config.module';
import { NgbdTooltipContainer } from './demos/container/tooltip-container';
import { NgbdTooltipContainerModule } from './demos/container/tooltip-container.module';
import { NgbdTooltipCustomClassModule } from './demos/customclass/tooltip-custom-class.module';
import { NgbdTooltipCustomclass } from './demos/customclass/tooltip-customclass';
import { NgbdTooltipDelay } from './demos/delay/tooltip-delay';
import { NgbdTooltipDelayModule } from './demos/delay/tooltip-delay.module';
import { NgbdTooltipTplContentModule } from './demos/tplcontent/tooltip-tpl-content.module';
import { NgbdTooltipTplcontent } from './demos/tplcontent/tooltip-tplcontent';
import { NgbdTooltipTplWithContextModule } from './demos/tplwithcontext/tooltip-tpl-with-context.module';
import { NgbdTooltipTplwithcontext } from './demos/tplwithcontext/tooltip-tplwithcontext';
import { NgbdTooltipTriggers } from './demos/triggers/tooltip-triggers';
import { NgbdTooltipTriggersModule } from './demos/triggers/tooltip-triggers.module';

const DEMOS = {
  basic: {
    title: 'Quick and easy tooltips',
    type: NgbdTooltipBasic,
    code: require('!!raw-loader!./demos/basic/tooltip-basic').default,
    markup: require('!!raw-loader!./demos/basic/tooltip-basic.html').default
  },
  tplcontent: {
    title: 'HTML and bindings in tooltips',
    type: NgbdTooltipTplcontent,
    code: require('!!raw-loader!./demos/tplcontent/tooltip-tplcontent').default,
    markup: require('!!raw-loader!./demos/tplcontent/tooltip-tplcontent.html').default
  },
  triggers: {
    title: 'Custom and manual triggers',
    type: NgbdTooltipTriggers,
    code: require('!!raw-loader!./demos/triggers/tooltip-triggers').default,
    markup: require('!!raw-loader!./demos/triggers/tooltip-triggers.html').default
  },
  autoclose: {
    title: 'Automatic closing with keyboard and mouse',
    type: NgbdTooltipAutoclose,
    code: require('!!raw-loader!./demos/autoclose/tooltip-autoclose').default,
    markup: require('!!raw-loader!./demos/autoclose/tooltip-autoclose.html').default
  },
  tplwithcontext: {
    title: 'Context and manual triggers',
    type: NgbdTooltipTplwithcontext,
    code: require('!!raw-loader!./demos/tplwithcontext/tooltip-tplwithcontext').default,
    markup: require('!!raw-loader!./demos/tplwithcontext/tooltip-tplwithcontext.html').default
  },
  delay: {
    title: 'Open and close delays',
    type: NgbdTooltipDelay,
    code: require('!!raw-loader!./demos/delay/tooltip-delay').default,
    markup: require('!!raw-loader!./demos/delay/tooltip-delay.html').default
  },
  container: {
    title: 'Append tooltip in the body',
    type: NgbdTooltipContainer,
    code: require('!!raw-loader!./demos/container/tooltip-container').default,
    markup: require('!!raw-loader!./demos/container/tooltip-container.html').default
  },
  customclass: {
    title: 'Tooltip with custom class',
    type: NgbdTooltipCustomclass,
    code: require('!!raw-loader!./demos/customclass/tooltip-customclass').default,
    markup: require('!!raw-loader!./demos/customclass/tooltip-customclass.html').default
  },
  config: {
    title: 'Global configuration of tooltips',
    type: NgbdTooltipConfig,
    code: require('!!raw-loader!./demos/config/tooltip-config').default,
    markup: require('!!raw-loader!./demos/config/tooltip-config.html').default
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ComponentWrapper,
    data: {
      bootstrap: 'https://getbootstrap.com/docs/%version%/components/tooltips/'
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
    NgbdTooltipBasicModule,
    NgbdTooltipContainerModule,
    NgbdTooltipCustomClassModule,
    NgbdTooltipDelayModule,
    NgbdTooltipTplContentModule,
    NgbdTooltipTriggersModule,
    NgbdTooltipAutocloseModule,
    NgbdTooltipConfigModule,
    NgbdTooltipTplWithContextModule
  ]
})
export class NgbdTooltipModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('tooltip', DEMOS);
  }
}
