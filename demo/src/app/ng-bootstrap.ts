// tslint:disable:deprecation
import {NgModule} from '@angular/core';

import {NgbTabsetModule} from '../../../src/tabset/tabset.module';
import {NgbModule as NgbOriginalModule} from '../../../src';

// Tabset is deprecated and not a part of ng-bootstrap anymore,
// but we want to keep it in the demo and be able to continue
// using `imports: [NgbModule]` and having `import {NgbTabset} from '@ng-bootstrap/ng-bootstrap'`
//
// So we're:
// 1. Re-exporting Tabset + public API of ng-bootstrap for the demo app
export {NgbTabsetModule, NgbTab, NgbTabChangeEvent, NgbTabContent, NgbTabset, NgbTabsetConfig, NgbTabTitle} from '../../../src/tabset/tabset.module';
export * from '../../../src';

// 2. Patching `NgbModule` content
@NgModule({
  imports: [NgbOriginalModule],
  exports: [NgbOriginalModule, NgbTabsetModule]
})
export class NgbModule {
}
