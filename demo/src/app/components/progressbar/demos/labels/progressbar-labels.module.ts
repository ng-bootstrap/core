import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdProgressbarLabels } from './progressbar-labels';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdProgressbarLabels],
  exports: [NgbdProgressbarLabels],
  bootstrap: [NgbdProgressbarLabels]
})
export class NgbdProgressbarLabelsModule {}
