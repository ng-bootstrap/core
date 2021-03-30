import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgbdOverviewSection } from './overview';

@Component({
  selector: 'ngbd-overview-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'd-block'
  },
  template: `
    <h2>
      <a class="title-fragment" routerLink="." [fragment]="section.fragment" ngbdFragment>
        <img src="img/link-symbol.svg" />
      </a>
      {{ section.title }}
    </h2>

    <ng-content></ng-content>
  `
})
export class NgbdOverviewSectionComponent {
  @Input() section: NgbdOverviewSection;
}
