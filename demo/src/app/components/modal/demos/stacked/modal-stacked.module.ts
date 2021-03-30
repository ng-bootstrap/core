import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NgbdModal1Content,
  NgbdModal2Content,
  NgbdModalStacked
} from './modal-stacked';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModalStacked, NgbdModal1Content, NgbdModal2Content],
  exports: [NgbdModalStacked],
  bootstrap: [NgbdModalStacked],
  entryComponents: [NgbdModal1Content, NgbdModal2Content]
})
export class NgbdModalStackedModule {}
