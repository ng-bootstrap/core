import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdToastInline } from './toast-inline';

@NgModule({ imports: [BrowserModule, NgbModule], declarations: [NgbdToastInline], bootstrap: [NgbdToastInline] })
export class NgbdToastInlineModule {}
