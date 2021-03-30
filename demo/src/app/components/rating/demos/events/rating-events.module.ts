import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdRatingEvents } from './rating-events';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdRatingEvents],
  exports: [NgbdRatingEvents],
  bootstrap: [NgbdRatingEvents]
})
export class NgbdRatingEventsModule {}
