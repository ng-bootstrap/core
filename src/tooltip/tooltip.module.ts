import {NgModule} from '@angular/core';

import {NgbTooltip, NgbTooltipWindow} from './tooltip';

export {NgbTooltipConfig} from './tooltip-config';
export {NgbTooltip} from './tooltip';
export {Placement} from '../util/positioning';

@NgModule({declarations: [NgbTooltip, NgbTooltipWindow], exports: [NgbTooltip], entryComponents: [NgbTooltipWindow]})
export class NgbTooltipModule {
}
