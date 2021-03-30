import {Component, ContentChildren, Input, NgZone, QueryList} from '@angular/core';
import {NgbdPageHeaderComponent} from './page-header.component';
import {TableOfContents} from '../component-wrapper/component-wrapper.component';

@Component({
  selector: 'ngbd-page-wrapper',
  templateUrl: './page-wrapper.component.html'
})
export class PageWrapper {
  @Input() pageTitle: string;

  @ContentChildren(NgbdPageHeaderComponent) private _tableOfContents: QueryList<NgbdPageHeaderComponent>;

  sidebarCollapsed = true;
  isLargeScreenOrLess: boolean;

  constructor(ngZone: NgZone) {
    const largeScreenQL = matchMedia('(max-width: 1199.98px)');
    this.isLargeScreenOrLess = largeScreenQL.matches;
    // tslint:disable-next-line:deprecation
    largeScreenQL.addListener((event) => ngZone.run(() => this.isLargeScreenOrLess = event.matches));
  }

  get tableOfContents(): TableOfContents {
    return this._tableOfContents ? this._tableOfContents.toArray() : [];
  }
}
