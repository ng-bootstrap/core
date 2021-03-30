import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdPopoverVisibility } from './popover-visibility';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdPopoverVisibility],
  exports: [NgbdPopoverVisibility],
  bootstrap: [NgbdPopoverVisibility]
})
export class NgbdPopoverVisibilityModule {}
