import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdProgressbarStriped } from './progressbar-striped';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdProgressbarStriped],
  exports: [NgbdProgressbarStriped],
  bootstrap: [NgbdProgressbarStriped]
})
export class NgbdProgressbarStripedModule {}
