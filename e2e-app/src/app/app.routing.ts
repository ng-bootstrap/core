import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DatepickerAutoCloseComponent} from './datepicker/autoclose/datepicker-autoclose.component';
import {DatepickerFocusComponent} from './datepicker/focus/datepicker-focus.component';
import {DatepickerMultipleComponent} from './datepicker/multiple/datepicker-multiple.component';
import {DropdownAutoCloseComponent} from './dropdown/autoclose/dropdown-autoclose.component';
import {DropdownClickComponent} from './dropdown/click/dropdown-click.component';
import {DropdownFocusComponent} from './dropdown/focus/dropdown-focus.component';
import {DropdownPositionComponent} from './dropdown/position/dropdown-position.component';
import {ModalAutoCloseComponent} from './modal/autoclose/modal-autoclose.component';
import {ModalFocusComponent} from './modal/focus/modal-focus.component';
import {ModalNestingComponent} from './modal/nesting/modal-nesting.component';
import {ModalStackComponent} from './modal/stack/modal-stack.component';
import {ModalStackConfirmationComponent} from './modal/stack-confirmation/modal-stack-confirmation.component';
import {PopoverAutocloseComponent} from './popover/autoclose/popover-autoclose.component';
import {TooltipAutocloseComponent} from './tooltip/autoclose/tooltip-autoclose.component';
import {TooltipFocusComponent} from './tooltip/focus/tooltip-focus.component';
import {TooltipPositionComponent} from './tooltip/position/tooltip-position.component';
import {TypeaheadAutoCloseComponent} from './typeahead/autoclose/typeahead-autoclose.component';
import {TypeaheadFocusComponent} from './typeahead/focus/typeahead-focus.component';
import {TimepickerFilterComponent} from './timepicker/filter/timepicker-filter.component';
import {TimepickerNavigationComponent} from './timepicker/navigation/timepicker-navigation.component';
import {TypeaheadValidationComponent} from './typeahead/validation/typeahead-validation.component';


export const routes: Routes = [
  {
    path: 'datepicker',
    children: [
      {path: 'focus', component: DatepickerFocusComponent},
      {path: 'autoclose', component: DatepickerAutoCloseComponent},
      {path: 'multiple', component: DatepickerMultipleComponent}
    ]
  },
  {
    path: 'modal',
    children: [
      {path: 'autoclose', component: ModalAutoCloseComponent},
      {path: 'focus', component: ModalFocusComponent},
      {path: 'nesting', component: ModalNestingComponent},
      {path: 'stack', component: ModalStackComponent},
      {path: 'stack-confirmation', component: ModalStackConfirmationComponent},
    ]
  },
  {
    path: 'dropdown',
    children: [
      {path: 'autoclose', component: DropdownAutoCloseComponent}, {path: 'click', component: DropdownClickComponent},
      {path: 'focus', component: DropdownFocusComponent}, {path: 'position', component: DropdownPositionComponent}
    ]
  },
  {path: 'popover', children: [{path: 'autoclose', component: PopoverAutocloseComponent}]},
  {
    path: 'tooltip',
    children: [
      {path: 'autoclose', component: TooltipAutocloseComponent}, {path: 'focus', component: TooltipFocusComponent},
      {path: 'position', component: TooltipPositionComponent}
    ]
  },
  {
    path: 'typeahead',
    children: [
      {path: 'focus', component: TypeaheadFocusComponent}, {path: 'autoclose', component: TypeaheadAutoCloseComponent},
      {path: 'validation', component: TypeaheadValidationComponent}
    ]
  },
  {
    path: 'timepicker',
    children: [
      {path: 'navigation', component: TimepickerNavigationComponent},
      {path: 'filter', component: TimepickerFilterComponent},
    ]
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, {useHash: true});
