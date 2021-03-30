import { Component } from '@angular/core';

@Component({
  selector: 'accordion-component',
  template: `
    <ngb-accordion activeIds="ngb-panel-0">
      <ngb-panel title="Title one">
        <ng-template ngbPanelContent>Panel one</ng-template>
      </ngb-panel>
      <ngb-panel>
        <ng-template ngbPanelTitle>
          <span><b>Title</b> two</span>
        </ng-template>
        <ng-template ngbPanelContent>Panel two</ng-template>
      </ngb-panel>
      <ngb-panel title="Title three" [disabled]="true">
        <ng-template ngbPanelContent>Panel three</ng-template>
      </ngb-panel>
    </ngb-accordion>
  `
})
export class AccordionComponent {
}
