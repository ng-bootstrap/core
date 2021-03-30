import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({templateUrl: './dropdown-autoclose.component.html', changeDetection: ChangeDetectionStrategy.OnPush})
export class DropdownAutoCloseComponent {
  autoClose: boolean | 'inside' | 'outside' = true;
  container: null | 'body';
}
