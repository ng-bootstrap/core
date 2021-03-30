import {Component} from '@angular/core';

@Component({selector: 'ngbd-collapse-navbar', templateUrl: './collapse-navbar.html'})
export class NgbdCollapseNavbar {
  // Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  public isMenuCollapsed = true;
}
