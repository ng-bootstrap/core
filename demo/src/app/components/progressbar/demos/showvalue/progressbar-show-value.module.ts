import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdProgressbarShowvalue } from './progressbar-showvalue';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdProgressbarShowvalue],
  exports: [NgbdProgressbarShowvalue],
  bootstrap: [NgbdProgressbarShowvalue]
})
export class NgbdProgressbarShowValueModule {}
