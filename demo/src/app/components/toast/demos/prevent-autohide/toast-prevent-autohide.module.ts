import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdToastPreventAutohide} from './toast-prevent-autohide';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdToastPreventAutohide],
  bootstrap: [NgbdToastPreventAutohide]
})
export class NgbdToastPreventAutohideModule {
}
