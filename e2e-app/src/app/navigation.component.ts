import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {routes} from './app.routing';
import {NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-navigation',
  template: `
  <a role="button" class="btn btn-outline-primary ml-3" id="navigate-home" href="#/">Menu</a>
  <div [hidden]="isHidden">
    <div *ngFor="let route of routes" class="card m-1 d-inline-block" style="width: 290px;">
      <div class="card-header">{{route.path}}</div>
      <ul class="list-group list-group-flush">
        <li *ngFor="let childRoute of route.children" class="list-group-item">
           <a href="#{{route.path}}/{{childRoute.path}}" id="navigate-{{route.path}}-{{childRoute.path}}"
            class="list-group-link">{{childRoute.path}}</a>
        </li>
      </ul>
    </div>
  </div>
  `
})

export class NavigationComponent {
  routes;
  isHidden = false;

  constructor(public router: Router) {
    this.routes = routes;

    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.isHidden = evt.url !== '/';
      }
    });
  }
}
