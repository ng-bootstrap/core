import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ComponentWrapper } from '../../shared/component-wrapper/component-wrapper.component';
import { NgbdComponentsSharedModule, NgbdDemoList } from '../shared';
import { NgbdApiPage } from '../shared/api-page/api.component';
import { NgbdExamplesPage } from '../shared/examples-page/examples.component';
import { NgbdButtonsCheckbox } from './demos/checkbox/buttons-checkbox';
import { NgbdButtonsCheckboxModule } from './demos/checkbox/buttons-checkbox.module';
import { NgbdButtonsCheckboxReactiveModule } from './demos/checkboxreactive/buttons-checkbox-reactive.module';
import { NgbdButtonsCheckboxreactive } from './demos/checkboxreactive/buttons-checkboxreactive';
import { NgbdButtonsRadio } from './demos/radio/buttons-radio';
import { NgbdButtonsRadioModule } from './demos/radio/buttons-radio.module';
import { NgbdButtonsRadioReactiveModule } from './demos/radioreactive/buttons-radio-reactive.module';
import { NgbdButtonsRadioreactive } from './demos/radioreactive/buttons-radioreactive';

const DEMOS = {
  checkbox: {
    title: 'Checkbox buttons',
    type: NgbdButtonsCheckbox,
    code: require('!!raw-loader!./demos/checkbox/buttons-checkbox').default,
    markup: require('!!raw-loader!./demos/checkbox/buttons-checkbox.html').default
  },
  checkboxreactive: {
    title: 'Checkbox buttons (Reactive Forms)',
    type: NgbdButtonsCheckboxreactive,
    code: require('!!raw-loader!./demos/checkboxreactive/buttons-checkboxreactive').default,
    markup: require('!!raw-loader!./demos/checkboxreactive/buttons-checkboxreactive.html').default
  },
  radio: {
    title: 'Radio buttons',
    type: NgbdButtonsRadio,
    code: require('!!raw-loader!./demos/radio/buttons-radio').default,
    markup: require('!!raw-loader!./demos/radio/buttons-radio.html').default
  },
  radioreactive: {
    title: 'Radio buttons (Reactive Forms)',
    type: NgbdButtonsRadioreactive,
    code: require('!!raw-loader!./demos/radioreactive/buttons-radioreactive').default,
    markup: require('!!raw-loader!./demos/radioreactive/buttons-radioreactive.html').default
  }
};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: ComponentWrapper,
    data: {
      bootstrap: 'https://getbootstrap.com/docs/%version%/components/buttons/#checkbox-and-radio-buttons'
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
    NgbdButtonsCheckboxModule,
    NgbdButtonsCheckboxReactiveModule,
    NgbdButtonsRadioModule,
    NgbdButtonsRadioReactiveModule
  ]
})
export class NgbdButtonsModule {
  constructor(demoList: NgbdDemoList) {
    demoList.register('buttons', DEMOS);
  }
}
