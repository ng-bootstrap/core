import {Component} from '@angular/core';
import {environment} from '../../environments/environment';
import { Snippet } from '../shared/code/snippet';

@Component({
  selector: 'ngbd-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent {
  public version: string = environment.version;

  installation = Snippet({
    lang: 'ts',
    code: `// Installation for Angular CLI
ng add @ng-bootstrap/ng-bootstrap`
  });
}
