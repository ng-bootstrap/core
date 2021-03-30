import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdNavCustomStyle } from './nav-custom-style';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdNavCustomStyle],
  exports: [NgbdNavCustomStyle],
  bootstrap: [NgbdNavCustomStyle]
})
export class NgbdNavCustomStyleModule {}
