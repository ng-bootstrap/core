import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalComponent, NgbdModalContent } from './modal-component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModalComponent, NgbdModalContent],
  exports: [NgbdModalComponent],
  bootstrap: [NgbdModalComponent]
  // entryComponents: [NgbdModalContent] // this line would be needed in Angular 8 or older
})
export class NgbdModalComponentModule {}
