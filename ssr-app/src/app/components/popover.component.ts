import { Component } from '@angular/core';

@Component({
  selector: 'popover-component',
  template: `
    <button type="button" class="btn btn-outline-secondary" ngbPopover="Hello" popoverTitle="Popover">
      Click me
    </button>
  `
})
export class PopoverComponent {
}
