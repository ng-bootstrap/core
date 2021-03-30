import { Component } from '@angular/core';

@Component({
  selector: 'tooltip-component',
  template: `
    <button type="button" class="btn btn-outline-secondary" ngbTooltip="Tooltip">
      Hover me
    </button>
  `
})
export class TooltipComponent {
}
