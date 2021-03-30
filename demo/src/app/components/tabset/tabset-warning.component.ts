import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ngbd-tabset-warning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ngb-alert type="danger" [dismissible]="false" class="mb-5 d-flex flex-row">
      <div class="mr-2">
        <svg:svg ngbdIcon="lightbulb" fill="currentColor" />
      </div>
      <div>
        Tabset is deprecated since version <span class="badge badge-info">6.0.0</span>
        and is removed in <span class="badge badge-info">8.0.0</span>.
        Please use <a routerLink="/components/nav">Nav directives</a> as a more flexible alternative.
      </div>
    </ngb-alert>
  `
})
export class NgbdTabsetWarningComponent {
}
