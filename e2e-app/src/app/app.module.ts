import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {routing} from './app.routing';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation.component';

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


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DatepickerAutoCloseComponent,
    DatepickerFocusComponent,
    DatepickerMultipleComponent,
    DropdownAutoCloseComponent,
    DropdownFocusComponent,
    DropdownClickComponent,
    DropdownPositionComponent,
    ModalAutoCloseComponent,
    ModalFocusComponent,
    ModalNestingComponent,
    ModalStackComponent,
    ModalStackConfirmationComponent,
    PopoverAutocloseComponent,
    TooltipAutocloseComponent,
    TooltipFocusComponent,
    TooltipPositionComponent,
    TypeaheadFocusComponent,
    TypeaheadValidationComponent,
    TypeaheadAutoCloseComponent,
    TimepickerFilterComponent,
    TimepickerNavigationComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, routing, NgbModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
