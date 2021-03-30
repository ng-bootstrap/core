import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbAlert} from './alert';

export {NgbAlert} from './alert';
export {NgbAlertConfig} from './alert-config';

@NgModule({declarations: [NgbAlert], exports: [NgbAlert], imports: [CommonModule], entryComponents: [NgbAlert]})
export class NgbAlertModule {
}
