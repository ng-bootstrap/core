import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Angulartics2, Angulartics2On} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';

import {SideNavComponent} from './shared';
import { NGB_COLLAPSE_DIRECTIVES } from '@ng-bootstrap/ng-bootstrap';

import '../style/app.scss';

@Component({
  selector: 'ngbd-app',
  providers: [Angulartics2GoogleAnalytics],
  directives: [...ROUTER_DIRECTIVES, Angulartics2On, SideNavComponent, NGB_COLLAPSE_DIRECTIVES],
  templateUrl: './app.component.html'
})
export class AppComponent {
  isCollapsed = false;
  constructor(angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
}
