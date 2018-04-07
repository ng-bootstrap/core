import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  NgbAccordion,
  NgbPanel,
  NgbPanelTitle,
  NgbPanelContent,
  NgbPanelChangeEvent,
  Heading,
  Region
} from './accordion';
import {NgbAccordionConfig} from './accordion-config';

export {NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, NgbPanelChangeEvent} from './accordion';
export {NgbAccordionConfig} from './accordion-config';

const NGB_ACCORDION_DIRECTIVES = [NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, Heading, Region];

@NgModule({declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [CommonModule]})
export class NgbAccordionModule {
  static forRoot(): ModuleWithProviders { return {ngModule: NgbAccordionModule, providers: [NgbAccordionConfig]}; }
}
