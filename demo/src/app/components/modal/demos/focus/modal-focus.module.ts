import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NgbdModalConfirm,
  NgbdModalConfirmAutofocus,
  NgbdModalFocus
} from './modal-focus';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModalFocus, NgbdModalConfirm, NgbdModalConfirmAutofocus],
  exports: [NgbdModalFocus],
  bootstrap: [NgbdModalFocus],
  entryComponents: [NgbdModalConfirm, NgbdModalConfirmAutofocus]
})
export class NgbdModalFocusModule {}
