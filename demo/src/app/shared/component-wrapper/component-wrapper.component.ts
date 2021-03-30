import {Component, NgZone, OnDestroy, Type} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { filter, pluck, map } from 'rxjs/operators';

import { NgbdApiPage } from '../../components/shared/api-page/api.component';
import { NgbdExamplesPage } from '../../components/shared/examples-page/examples.component';

import { environment } from '../../../environments/environment';

export type TableOfContents = {fragment: string, title: string}[];

@Component({
  selector: 'component-wrapper',
  templateUrl: 'component-wrapper.component.html'
})

export class ComponentWrapper implements OnDestroy {
  private _routerSubscription: Subscription;

  activeTab = 'examples';

  component: string;

  headerComponentType$: Observable<Type<any>>;
  bootstrapUrl$: Observable<String>;

  isLargeScreenOrLess: boolean;
  isSmallScreenOrLess: boolean;

  sidebarCollapsed = true;

  tableOfContents: TableOfContents = [];

  constructor(public route: ActivatedRoute, private _router: Router, ngZone: NgZone) {
    // This component is used in route definition 'components'
    // So next child route will always be ':componentType' & next one will always be ':pageType' (or tab)

    this._routerSubscription = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const parentRoute = this.route.snapshot.parent;
      const tabRoute = this.route.snapshot.firstChild;

      this.component = parentRoute!.url[1].path;
      this.activeTab = tabRoute!.url[0].path;
    });

    this.headerComponentType$ = this.route.data.pipe(pluck('header'));
    this.bootstrapUrl$ = this.route.data.pipe(pluck('bootstrap'), map(url => (url && url.replace('%version%', environment.bootstrap))));

    // information extracted from https://getbootstrap.com/docs/4.1/layout/overview/
    // TODO: we should implements our own mediamatcher, according to bootstrap layout.
    const smallScreenQL = matchMedia('(max-width: 767.98px)');
    // tslint:disable-next-line:deprecation
    smallScreenQL.addListener((event) => ngZone.run(() => this.isSmallScreenOrLess = event.matches));
    this.isSmallScreenOrLess = smallScreenQL.matches;

    const largeScreenQL = matchMedia('(max-width: 1199.98px)');
    this.isLargeScreenOrLess = largeScreenQL.matches;
    // tslint:disable-next-line:deprecation
    largeScreenQL.addListener((event) => ngZone.run(() => this.isLargeScreenOrLess = event.matches));
  }

  ngOnDestroy() {
    this._routerSubscription.unsubscribe();
  }

  updateNavigation(component: NgbdExamplesPage | NgbdApiPage | any) {
    const getLinks = (typeCollection: string[]) => {
      return typeCollection.map(item => ({
        fragment: item,
        title: item
      }));
    };
    this.tableOfContents = [];
    if (component instanceof NgbdExamplesPage) {
      this.tableOfContents = component.demos.map(demo => {
        return {
          fragment: demo.id,
          title: demo.title
        };
      });
    } else if (component instanceof NgbdApiPage) {
      let toc = getLinks(component.components);

      if (component.classes.length > 0) {
        const klasses = getLinks(component.classes);
        toc = toc.concat(toc.length > 0  ? [<any>{}, ...klasses] : klasses);
      }

      if (component.configs.length > 0) {
        const configs = getLinks(component.configs);
        toc = toc.concat(toc.length > 0  ? [<any>{}, ...configs] : configs);
      }

      this.tableOfContents = toc;

    } else /* Overview */ {
      // TODO: maybe we should also have an abstract class to test instanceof
      this.tableOfContents = Object.values(component.sections).map(section => section) as TableOfContents;
    }
  }
}
