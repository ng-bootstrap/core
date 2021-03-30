import { Component } from '@angular/core';

@Component({
  selector: 'buttons-component',
  template: `
    <h5>Radio</h5>
    <div class="btn-group btn-group-toggle" ngbRadioGroup name="radioBasic" [(ngModel)]="radio">
      <label ngbButtonLabel class="btn-primary">
        <input ngbButton type="radio" [value]="1"> Left (pre-checked)
      </label>
      <label ngbButtonLabel class="btn-primary">
        <input ngbButton type="radio" value="middle"> Middle
      </label>
      <label ngbButtonLabel class="btn-primary">
        <input ngbButton type="radio" [value]="false"> Right
      </label>
    </div>

    <h5 class="mt-3">Checkbox</h5>
    <div class="btn-group btn-group-toggle">
      <label class="btn-primary" ngbButtonLabel>
        <input type="checkbox" ngbButton [(ngModel)]="checkbox.left"> Left (pre-checked)
      </label>
      <label class="btn-primary" ngbButtonLabel>
        <input type="checkbox" ngbButton [(ngModel)]="checkbox.middle"> Middle
      </label>
      <label class="btn-primary" ngbButtonLabel>
        <input type="checkbox" ngbButton [(ngModel)]="checkbox.right"> Right
      </label>
    </div>
  `
})
export class ButtonsComponent {
  radio = 1;
  checkbox = {
    left: true,
    middle: false,
    right: false
  };
}
