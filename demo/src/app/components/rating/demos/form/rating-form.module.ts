import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdRatingForm } from './rating-form';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, NgbModule],
  declarations: [NgbdRatingForm],
  exports: [NgbdRatingForm],
  bootstrap: [NgbdRatingForm]
})
export class NgbdRatingFormModule {}
