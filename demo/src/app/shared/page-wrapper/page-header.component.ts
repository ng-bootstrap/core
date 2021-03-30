import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgbdOverviewSection} from '../../components/shared/overview';

@Component({
  selector: 'ngbd-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'd-block'
  },
  template: `
    <h2>
      <a routerLink="." [fragment]="fragment" ngbdFragment>
        <img src="img/link-symbol.svg" />
      </a>
      {{ title }}
    </h2>
  `,
})
export class NgbdPageHeaderComponent implements NgbdOverviewSection {
  @Input() title: string;
  @Input() fragment: string;
}
