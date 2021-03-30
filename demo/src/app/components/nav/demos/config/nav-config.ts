import {Component} from '@angular/core';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-nav-config',
  templateUrl: './nav-config.html',
  providers: [NgbNavConfig] // add NgbNavConfig to the component providers
})
export class NgbdNavConfig {
  constructor(config: NgbNavConfig) {
    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
  }
}
