import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdRatingBasic } from './rating-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdRatingBasic],
  exports: [NgbdRatingBasic],
  bootstrap: [NgbdRatingBasic]
})
export class NgbdRatingBasicModule {}
