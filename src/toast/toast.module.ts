import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgbToast, NgbToastHeader} from './toast';

export {NgbToast, NgbToastHeader} from './toast';
export {NgbToastConfig, NgbToastOptions} from './toast-config';

@NgModule({declarations: [NgbToast, NgbToastHeader], imports: [CommonModule], exports: [NgbToast, NgbToastHeader]})
export class NgbToastModule {
}
