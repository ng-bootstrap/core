import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdCarouselBasic } from './carousel-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdCarouselBasic],
  exports: [NgbdCarouselBasic],
  bootstrap: [NgbdCarouselBasic]
})
export class NgbdCarouselBasicModule {}
