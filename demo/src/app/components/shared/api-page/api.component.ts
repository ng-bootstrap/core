import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import apiDocs from '../../../../api-docs';

export function getApis(component: string) {
  const components: any[]  = [];
  const classes: any[] = [];
  const configs: any[] = [];
  Object.values(apiDocs)
    .filter(entity => entity.fileName.startsWith(`src/${component}`))
    .forEach(entity => {
      switch (entity.type) {
        case 'Directive':
        case 'Component':
          components.push(entity.className);
          break;

        case 'Service':
          if (entity.className.endsWith('Config')) {
            configs.push(entity.className);
          } else {
            classes.push(entity.className);
          }
          break;
        default:
          classes.push(entity.className);
          break;
      }
    });
  return { components, classes, configs };
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ngbd-api-docs *ngFor="let component of components" [directive]="component"></ngbd-api-docs>
    <ngbd-api-docs-class *ngFor="let klass of classes" [type]="klass"></ngbd-api-docs-class>
    <ngbd-api-docs-config *ngFor="let config of configs" [type]="config"></ngbd-api-docs-config>
  `
})
export class NgbdApiPage {
  classes: string[];
  components: string[];
  configs: string[];

  constructor(route: ActivatedRoute) {
    const component = route.parent!.parent!.snapshot.url[1].path;
    const apis = getApis(component);
    this.components = apis.components.sort();
    this.classes = apis.classes.sort();
    this.configs = apis.configs.sort();
  }
}
