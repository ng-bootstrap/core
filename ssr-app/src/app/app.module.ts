import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccordionComponent } from './components/accordion.component';
import { AlertComponent } from './components/alert.component';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './components/buttons.component';
import { CarouselComponent } from './components/carousel.component';
import { CollapseComponent } from './components/collapse.component';
import { DatepickerComponent } from './components/datepicker.component';
import { DropdownComponent } from './components/dropdown.component';
import { ModalComponent } from './components/modal.component';
import { NavComponent } from './components/nav.component';
import { PaginationComponent } from './components/pagination.component';
import { PopoverComponent } from './components/popover.component';
import { ProgressComponent } from './components/progress.component';
import { RatingComponent } from './components/rating.component';
import { TimepickerComponent } from './components/timepicker.component';
import { TooltipComponent } from './components/tooltip.component';
import { TypeaheadComponent } from './components/typeahead.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AlertComponent,
    AppComponent,
    ButtonsComponent,
    CarouselComponent,
    CollapseComponent,
    DatepickerComponent,
    DropdownComponent,
    ModalComponent,
    NavComponent,
    PaginationComponent,
    PopoverComponent,
    ProgressComponent,
    RatingComponent,
    TimepickerComponent,
    TooltipComponent,
    TypeaheadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
