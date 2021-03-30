import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

const BADGES = {
  'Directive': 'success',
  'Component': 'success',
  'Service': 'primary',
  'Configuration': 'primary',
  'Class': 'danger',
  'Interface': 'danger'
};

@Component({
  selector: 'ngbd-api-docs-badge',
  template: `
    <h5>
      <span *ngIf="deprecated" class="badge badge-secondary" >Deprecated {{ deprecated.version }}</span>&ngsp;
      <span *ngIf="since" class="badge badge-info" >Since {{ since.version }}</span>&ngsp;
      <span class="badge" [ngClass]="badgeClass">{{text}}</span>
    </h5>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgbdApiDocsBadge {

  badgeClass: string;
  text: string;

  @Input() deprecated?: {version: string};

  @Input() since?: {version: string};

  @Input()
  set type(type: string) {
    this.text = type;
    this.badgeClass = `badge-${BADGES[type] || 'secondary'}`;
  }
}
