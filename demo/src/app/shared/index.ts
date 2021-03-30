import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {Analytics} from './analytics/analytics';
import {CodeHighlightService} from './code/code-highlight.service';
import {NgbdCodeComponent} from './code/code.component';
import {ComponentWrapper} from './component-wrapper/component-wrapper.component';
import {NgbdFragment} from './fragment/fragment.directive';
import {NgbdIcons} from './icons/icons.component';
import {NgbdPageHeaderComponent} from './page-wrapper/page-header.component';
import {PageWrapper} from './page-wrapper/page-wrapper.component';
import {SideNavComponent} from './side-nav/side-nav.component';

export {componentsList} from './side-nav/side-nav.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [
    CommonModule, RouterModule, ComponentWrapper, PageWrapper, NgbdPageHeaderComponent, NgbdFragment, SideNavComponent,
    NgbdCodeComponent, NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbdIcons
  ],
  declarations: [
    ComponentWrapper, PageWrapper, NgbdPageHeaderComponent, NgbdFragment, SideNavComponent, NgbdCodeComponent, NgbdIcons
  ],
  providers: [Analytics, CodeHighlightService]
})
export class NgbdSharedModule {
}
