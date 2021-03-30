import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbProgressbar} from './progressbar';

export {NgbProgressbar} from './progressbar';
export {NgbProgressbarConfig} from './progressbar-config';

@NgModule({declarations: [NgbProgressbar], exports: [NgbProgressbar], imports: [CommonModule]})
export class NgbProgressbarModule {
}
