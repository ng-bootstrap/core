import {Component} from '@angular/core';

import {Snippet} from '../../../shared/code/snippet';
import {NgbdDemoList} from '../../shared';
import {NgbdOverview} from '../../shared/overview';


@Component({
  selector: 'ngbd-pagination-overview',
  templateUrl: './pagination-overview.component.html',
  host: {'[class.overview]': 'true'}
})
export class NgbdPaginationOverviewComponent {
  NGFOR = Snippet({
    lang: 'html',
    code: `
      <table>
        <tr *ngFor="let item of items | slice: (page-1) * pageSize : page * pageSize">
          <!-- content here -->
        </tr>
      </table>
    `,
  });

  NGB_PAGINATION = Snippet({
    lang: 'html',
    code: `
      <ngb-pagination
        [(page)]="page"
        [pageSize]="pageSize"
        [collectionSize]="items.length"></ngb-pagination>
    `,
  });

  CUSTOM_CSS = Snippet({
    lang: 'css',
    code: `
      ngb-pagination li {
        &:first-child a {
          span {
            display: none;
          }
          &:before {
            /* provide your content here */
          }
        }
      }
    `,
  });

  CUSTOM_TPL = Snippet({
    lang: 'html',
    code: `
      <ngb-pagination>
        <ng-template ngbPaginationFirst>First</ng-template>
        <ng-template ngbPaginationLast>Last</ng-template>
        <ng-template ngbPaginationPrevious>Prev</ng-template>
        <ng-template ngbPaginationNext>Next</ng-template>
        <ng-template ngbPaginationEllipsis>...</ng-template>
        <ng-template ngbPaginationNumber let-page>{{ page }}</ng-template>
      </ngb-pagination>
    `,
  });

  CUSTOM_TPL_PAGES = Snippet({
    lang: 'html',
    code: `
      <ngb-pagination>
        <ng-template ngbPaginationPages let-page let-pages="pages">
            <!-- render the "pages" collection here -->
        </ng-template>
      </ngb-pagination>
    `,
  });

  sections: NgbdOverview = {};

  constructor(demoList: NgbdDemoList) {
    this.sections = demoList.getOverviewSections('pagination');
  }
}
