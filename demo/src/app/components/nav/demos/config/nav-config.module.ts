import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdNavConfig } from './nav-config';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdNavConfig],
  exports: [NgbdNavConfig],
  bootstrap: [NgbdNavConfig]
})
export class NgbdNavConfigModule {}
