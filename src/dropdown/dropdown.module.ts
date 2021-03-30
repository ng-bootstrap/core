import {NgModule} from '@angular/core';
import {
  NgbDropdown,
  NgbDropdownAnchor,
  NgbDropdownToggle,
  NgbDropdownMenu,
  NgbDropdownItem,
  NgbNavbar
} from './dropdown';

export {
  NgbDropdown,
  NgbDropdownAnchor,
  NgbDropdownToggle,
  NgbDropdownMenu,
  NgbDropdownItem,
  NgbNavbar
} from './dropdown';
export {NgbDropdownConfig} from './dropdown-config';

const NGB_DROPDOWN_DIRECTIVES =
    [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbNavbar];

@NgModule({declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES})
export class NgbDropdownModule {
}
