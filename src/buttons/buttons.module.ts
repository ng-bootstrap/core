import {NgModule} from '@angular/core';
import {NgbButtonLabel} from './label';
import {NgbCheckBox} from './checkbox';
import {NgbRadio, NgbRadioGroup} from './radio';

export {NgbButtonLabel} from './label';
export {NgbCheckBox} from './checkbox';
export {NgbRadio, NgbRadioGroup} from './radio';


const NGB_BUTTON_DIRECTIVES = [NgbButtonLabel, NgbCheckBox, NgbRadioGroup, NgbRadio];

@NgModule({declarations: NGB_BUTTON_DIRECTIVES, exports: NGB_BUTTON_DIRECTIVES})
export class NgbButtonsModule {
}
