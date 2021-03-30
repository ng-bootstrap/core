import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import {
  DEMO_CALENDAR_MODULES,
  NgbdDatepickerCalendarsComponent
} from './calendars/datepicker-calendars.component';
import { NgbdDatepickerAdapter } from './demos/adapter/datepicker-adapter';
import { NgbdDatepickerAdapterModule } from './demos/adapter/datepicker-adpater.module';
import { NgbdDatepickerBasic } from './demos/basic/datepicker-basic';
import { NgbdDatepickerBasicModule } from './demos/basic/datepicker-basic.module';
import { NgbdDatepickerConfig } from './demos/config/datepicker-config';
import { NgbdDatepickerConfigModule } from './demos/config/datepicker-config.module';
import { NgbdDatepickerCustomday } from './demos/customday/datepicker-customday';
import { NgbdDatepickerCustomdayModule } from './demos/customday/datepicker-customday.module';
import { NgbdDatepickerDisabled } from './demos/disabled/datepicker-disabled';
import { NgbdDatepickerDisabledModule } from './demos/disabled/datepicker-disabled.module';
import { NgbdDatepickerFooterTemplateModule } from './demos/footertemplate/datepicker-footer-template.module';
import { NgbdDatepickerFootertemplate } from './demos/footertemplate/datepicker-footertemplate';
import { NgbdDatepickerI18n } from './demos/i18n/datepicker-i18n';
import { NgbdDatepickerI18nModule } from './demos/i18n/datepicker-i18n.module';
import { NgbdDatepickerCustommonth } from './demos/custommonth/datepicker-custommonth';
import { NgbdDatepickerCustommonthModule } from './demos/custommonth/datepicker-custommonth.module';
import { NgbdDatepickerMultiple } from './demos/multiple/datepicker-multiple';
import { NgbdDatepickerMultipleModule } from './demos/multiple/datepicker-multiple.module';
import { NgbdDatepickerPopup } from './demos/popup/datepicker-popup';
import { NgbdDatepickerPopupModule } from './demos/popup/datepicker-popup.module';
import { NgbdDatepickerRange } from './demos/range/datepicker-range';
import { NgbdDatepickerRangeModule } from './demos/range/datepicker-range.module';
import { NgbdDatepickerRangePopup } from './demos/range-popup/datepicker-range-popup';
import { NgbdDatepickerRangePopupModule } from './demos/range-popup/datepicker-range-popup.module';
import { NgbdDatepickerOverviewComponent } from './overview/datepicker-overview.component';
import { NgbdDatepickerOverviewDemoComponent } from './overview/demo/datepicker-overview-demo.component';
import { NgbdDatepickerPositiontargetModule } from './demos/positiontarget/datepicker-position-target.module';
import { NgbdDatepickerPositiontarget } from './demos/positiontarget/datepicker-positiontarget';
import { NgbdDatepickerKeyboard } from './demos/keyboard/datepicker-keyboard';
import { NgbdDatepickerKeyboardModule } from './demos/keyboard/datepicker-keyboard.module';

const OVERVIEW = {
  'basic-usage': 'Basic Usage',
  'getting-date': 'Getting/setting a date',
  'date-model': 'Date model and format',
  navigation: 'Moving around',
  'limiting-dates': 'Disabling and limiting dates',
  'day-template': 'Day display customization',
  today: 'Today\'s date',
  'content-template': 'Content Template',
  'footer-template': 'Custom footer',
  range: 'Range selection',
  i18n: 'Internationalization',
  'keyboard-shortcuts': 'Keyboard shortcuts'
};

const DEMOS = {
  basic: {
    title: 'Basic datepicker',
    type: NgbdDatepickerBasic,
    code: require('!!raw-loader!./demos/basic/datepicker-basic').default,
    markup: require('!!raw-loader!./demos/basic/datepicker-basic.html').default
  },
  popup: {
    title: 'Datepicker in a popup',
    type: NgbdDatepickerPopup,
    code: require('!!raw-loader!./demos/popup/datepicker-popup').default,
    markup: require('!!raw-loader!./demos/popup/datepicker-popup.html').default
  },
  multiple: {
    title: 'Multiple months',
    type: NgbdDatepickerMultiple,
    code: require('!!raw-loader!./demos/multiple/datepicker-multiple').default,
    markup: require('!!raw-loader!./demos/multiple/datepicker-multiple.html').default
  },
  range: {
    title: 'Range selection',
    type: NgbdDatepickerRange,
    code: require('!!raw-loader!./demos/range/datepicker-range').default,
    markup: require('!!raw-loader!./demos/range/datepicker-range.html').default
  },
  'range-popup': {
    title: 'Range selection in a popup',
    type: NgbdDatepickerRangePopup,
    code: require('!!raw-loader!./demos/range-popup/datepicker-range-popup').default,
    markup: require('!!raw-loader!./demos/range-popup/datepicker-range-popup.html').default
  },
  disabled: {
    title: 'Disabled datepicker',
    type: NgbdDatepickerDisabled,
    code: require('!!raw-loader!./demos/disabled/datepicker-disabled').default,
    markup: require('!!raw-loader!./demos/disabled/datepicker-disabled.html').default
  },
  adapter: {
    title: 'Custom date adapter and formatter',
    type: NgbdDatepickerAdapter,
    code: require('!!raw-loader!./demos/adapter/datepicker-adapter').default,
    markup: require('!!raw-loader!./demos/adapter/datepicker-adapter.html').default
  },
  i18n: {
    title: 'Internationalization of datepickers',
    type: NgbdDatepickerI18n,
    code: require('!!raw-loader!./demos/i18n/datepicker-i18n').default,
    markup: require('!!raw-loader!./demos/i18n/datepicker-i18n.html').default
  },
  customday: {
    title: 'Custom day view',
    type: NgbdDatepickerCustomday,
    code: require('!!raw-loader!./demos/customday/datepicker-customday').default,
    markup: require('!!raw-loader!./demos/customday/datepicker-customday.html').default
  },
  custommonth: {
    title: 'Custom month layout',
    type: NgbdDatepickerCustommonth,
    code: require('!!raw-loader!./demos/custommonth/datepicker-custommonth').default,
    markup: require('!!raw-loader!./demos/custommonth/datepicker-custommonth.html').default
  },
  footertemplate: {
    title: 'Footer template',
    type: NgbdDatepickerFootertemplate,
    code: require('!!raw-loader!./demos/footertemplate/datepicker-footertemplate').default,
    markup: require('!!raw-loader!./demos/footertemplate/datepicker-footertemplate.html').default
  },
  positiontarget: {
    title: 'Position target',
    type: NgbdDatepickerPositiontarget,
    code: require('!!raw-loader!./demos/positiontarget/datepicker-positiontarget').default,
    markup: require('!!raw-loader!./demos/positiontarget/datepicker-positiontarget.html').default
  },
  keyboard: {
    title: 'Custom keyboard navigation',
    type: NgbdDatepickerKeyboard,
    code: require('!!raw-loader!./demos/keyboard/datepicker-keyboard').default,
    markup: require('!!raw-loader!./demos/keyboard/datepicker-keyboard.html').default
  },
  config: {
    title: 'Global configuration of datepickers',
    type: NgbdDatepickerConfig,
    code: require('!!raw-loader!./demos/config/datepicker-config').default,
    markup: require('!!raw-loader!./demos/config/datepicker-config.html').default
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: '',
    component: ComponentWrapper,
    children: [
      { path: 'overview', component: NgbdDatepickerOverviewComponent },
      { path: 'examples', component: NgbdExamplesPage },
      { path: 'calendars', component: NgbdDatepickerCalendarsComponent },
      { path: 'api', component: NgbdApiPage }
    ]
  }
];

@NgModule({
  imports: [
    NgbdSharedModule,
    NgbdComponentsSharedModule,
    NgbdDatepickerBasicModule,
    NgbdDatepickerPopupModule,
    NgbdDatepickerDisabledModule,
    NgbdDatepickerI18nModule,
    NgbdDatepickerCustomdayModule,
    NgbdDatepickerFooterTemplateModule,
    NgbdDatepickerConfigModule,
    NgbdDatepickerPositiontargetModule,
    NgbdDatepickerMultipleModule,
    NgbdDatepickerRangeModule,
    NgbdDatepickerRangePopupModule,
    NgbdDatepickerAdapterModule,
    NgbdDatepickerKeyboardModule,
    NgbdDatepickerCustommonthModule,
    ...DEMO_CALENDAR_MODULES
  ],
  declarations: [
    NgbdDatepickerCalendarsComponent,
    NgbdDatepickerOverviewComponent,
    NgbdDatepickerOverviewDemoComponent
  ]
})
export class NgbdDatepickerModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('datepicker', DEMOS, OVERVIEW);
  }
}
