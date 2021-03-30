import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbdDemoList} from '../demo-list';

@Component({
  template: `
    <ngbd-widget-demo
      *ngFor="let demo of demos"
      [id]="demo.id"
      [demoTitle]="demo.title"
      [code]="demo.code"
      [markup]="demo.markup"
      [component]="component"
      [files]="demo.files"
      [showCode]="demo.showCode"
      [showStackblitz]="demo.showStackblitz == null ? true : demo.showStackblitz"
    >
      <ng-template [ngComponentOutlet]="demo.type"></ng-template>
    </ngbd-widget-demo>
  `
})
export class NgbdExamplesPage {
  component: string;
  demos: any = [];

  constructor(route: ActivatedRoute, demoList: NgbdDemoList) {
    // We go up to parent route defining /components/:widget to read the widget name
    // This route is declared in root app.routing.ts.
    const componentName = (this.component =
      route.parent!.parent!.snapshot.url[1].path);
    if (componentName) {
      const demos = demoList.getDemos(componentName);
      if (demos) {
        this.demos = Object.keys(demos).map(id => {
          return { id, ...demos[id] };
        });
      }
    }
  }
}
