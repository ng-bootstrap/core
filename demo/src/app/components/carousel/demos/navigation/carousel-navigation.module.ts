import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdCarouselNavigation } from './carousel-navigation';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdCarouselNavigation],
  exports: [NgbdCarouselNavigation],
  bootstrap: [NgbdCarouselNavigation]
})
export class NgbdCarouselNavigationModule {}
