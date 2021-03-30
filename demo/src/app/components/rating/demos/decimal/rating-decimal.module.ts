import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdRatingDecimal } from './rating-decimal';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdRatingDecimal],
  exports: [NgbdRatingDecimal],
  bootstrap: [NgbdRatingDecimal]
})
export class NgbdRatingDecimalModule {}
