import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdApiDocs, NgbdApiDocsBadge, NgbdApiDocsClass, NgbdApiDocsConfig } from './api-docs';
import { NgbdApiPage } from './api-page/api.component';
import { NgbdWidgetDemoComponent } from './examples-page/demo.component';
import { NgbdExamplesPage } from './examples-page/examples.component';
import { NgbdOverviewDirective, NgbdOverviewSectionComponent } from './overview';

export * from './demo-list';

@NgModule({
  imports: [NgbdSharedModule],
  declarations: [
    NgbdApiDocsBadge,
    NgbdApiDocs,
    NgbdApiDocsClass,
    NgbdApiDocsConfig,
    NgbdOverviewDirective,
    NgbdOverviewSectionComponent,
    NgbdExamplesPage,
    NgbdApiPage,
    NgbdWidgetDemoComponent
  ],
  exports: [
    NgbdApiDocsBadge,
    NgbdApiDocs,
    NgbdApiDocsClass,
    NgbdApiDocsConfig,
    NgbdOverviewDirective,
    NgbdOverviewSectionComponent,
    NgbdExamplesPage,
    NgbdApiPage,
    NgbdWidgetDemoComponent
  ]
})
export class NgbdComponentsSharedModule {}
