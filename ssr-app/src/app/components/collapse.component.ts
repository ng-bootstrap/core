import { Component } from '@angular/core';

@Component({
  selector: 'collapse-component',
  template: `
    <div [ngbCollapse]="isCollapsed">
      <div class="card">
        <div class="card-body">This is not collapsed</div>
      </div>
    </div>
  `
})
export class CollapseComponent {
  isCollapsed = false;
}
