import {Component} from '@angular/core';

@Component({templateUrl: './dropdown-position.component.html'})
export class DropdownPositionComponent {
  isInDom = true;
  placement = 'top-left';
  container: null | 'body' = null;

  togglePlacement(placement) { this.placement = placement; }

  toggleContainer(container) { this.container = container; }
}
