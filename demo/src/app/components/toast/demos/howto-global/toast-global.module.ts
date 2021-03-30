import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdToastGlobal } from './toast-global.component';
import { ToastsContainer } from './toasts-container.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdToastGlobal, ToastsContainer],
  bootstrap: [NgbdToastGlobal]
})
export class NgbdToastGlobalModule {}
