import {NgModule} from '@angular/core';

import {NgbPopover, NgbPopoverWindow} from './popover';
import {CommonModule} from '@angular/common';

export {NgbPopover} from './popover';
export {NgbPopoverConfig} from './popover-config';
export {Placement} from '../util/positioning';

@NgModule({
  declarations: [NgbPopover, NgbPopoverWindow],
  exports: [NgbPopover],
  imports: [CommonModule],
  entryComponents: [NgbPopoverWindow]
})
export class NgbPopoverModule {
}
