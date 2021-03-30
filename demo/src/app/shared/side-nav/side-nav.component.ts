import {Component} from '@angular/core';
import {Router} from '@angular/router';

export const componentsList = [
  'Accordion', 'Alert', 'Buttons', 'Carousel', 'Collapse', 'Datepicker', 'Dropdown', 'Modal', 'Nav', 'Pagination',
  'Popover', 'Progressbar', 'Rating', 'Table', 'Timepicker', 'Toast', 'Tooltip', 'Typeahead'
];

export const deprecatedComponentList = ['Tabset'];

@Component({
  selector: 'ngbd-side-nav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  components = componentsList;
  deprecatedComponents = deprecatedComponentList;

  constructor(private router: Router) {}

  isActive(currentRoute: any[], exact = true): boolean {
    return this.router.isActive(this.router.createUrlTree(currentRoute), exact);
  }
}
