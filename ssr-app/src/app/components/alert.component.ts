import { Component } from '@angular/core';

@Component({
  selector: 'alert-component',
  template: `
    <ngb-alert [dismissible]="false">Sample alert here</ngb-alert>
    <ngb-alert>Sample dismissible alert here</ngb-alert>
  `
})
export class AlertComponent {
}
