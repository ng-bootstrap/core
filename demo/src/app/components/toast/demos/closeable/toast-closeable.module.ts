import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdToastCloseable} from './toast-closeable';


@NgModule({imports: [BrowserModule, NgbModule], declarations: [NgbdToastCloseable], bootstrap: [NgbdToastCloseable]})
export class NgbdToastCloseableModule {
}
