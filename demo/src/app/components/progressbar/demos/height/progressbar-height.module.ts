import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdProgressbarHeight } from './progressbar-height';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdProgressbarHeight],
  exports: [NgbdProgressbarHeight],
  bootstrap: [NgbdProgressbarHeight]
})
export class NgbdProgressbarHeightModule {}
