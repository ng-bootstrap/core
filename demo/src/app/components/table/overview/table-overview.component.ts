import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

import { NgbdDemoList } from '../../shared';
import { NgbdOverview } from '../../shared/overview';

@Component({
  selector: 'ngbd-table-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-overview.component.html',
  host: {
    '[class.overview]': 'true'
  }
})
export class NgbdTableOverviewComponent {

  bootstrapVersion = environment.bootstrap;

  sections: NgbdOverview = {};

  constructor(demoList: NgbdDemoList) {
    this.sections = demoList.getOverviewSections('table');
  }
}
