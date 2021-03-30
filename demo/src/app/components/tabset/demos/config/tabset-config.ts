// tslint:disable:deprecation
import {Component} from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-tabset-config',
  templateUrl: './tabset-config.html',
  providers: [NgbTabsetConfig] // add NgbTabsetConfig to the component providers
})
export class NgbdTabsetConfig {
  constructor(config: NgbTabsetConfig) {
    // customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills';
  }
}
