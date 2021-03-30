import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({templateUrl: './tooltip-autoclose.component.html', changeDetection: ChangeDetectionStrategy.OnPush})
export class TooltipAutocloseComponent {
  autoClose: boolean | 'inside' | 'outside' = true;
}
