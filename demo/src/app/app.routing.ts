import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ROUTES as ACCORDION_ROUTES} from './components/accordion/accordion.module';
import {ROUTES as ALERT_ROUTES} from './components/alert/alert.module';
import {ROUTES as BUTTONS_ROUTES} from './components/buttons/buttons.module';
import {ROUTES as CAROUSEL_ROUTES} from './components/carousel/carousel.module';
import {ROUTES as COLLAPSE_ROUTES} from './components/collapse/collapse.module';
import {ROUTES as DATEPICKER_ROUTES} from './components/datepicker/datepicker.module';
import {ROUTES as DROPDOWN_ROUTES} from './components/dropdown/dropdown.module';
import {ROUTES as MODAL_ROUTES} from './components/modal/modal.module';
import {ROUTES as NAV_ROUTES} from './components/nav/nav.module';
import {ROUTES as PAGINATION_ROUTES} from './components/pagination/pagination.module';
import {ROUTES as POPOVER_ROUTES} from './components/popover/popover.module';
import {ROUTES as PROGRESSBAR_ROUTES} from './components/progressbar/progressbar.module';
import {ROUTES as RATING_ROUTES} from './components/rating/rating.module';
import {ROUTES as TABLE_ROUTES} from './components/table/table.module';
import {ROUTES as TABSET_ROUTES} from './components/tabset/tabset.module';
import {ROUTES as TIMEPICKER_ROUTES} from './components/timepicker/timepicker.module';
import {ROUTES as TOAST_ROUTES} from './components/toast/toast.module';
import {ROUTES as TOOLTIP_ROUTES} from './components/tooltip/tooltip.module';
import {ROUTES as TYPEAHEAD_ROUTES} from './components/typeahead/typeahead.module';
import {DefaultComponent} from './default';
import {GettingStartedPage} from './pages/getting-started/getting-started.component';
import {AnimationsPage} from './pages/animations/animations.component';
import {I18nPage} from './pages/i18n/i18n.component';
import {PositioningPage} from './pages/positioning/positioning.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: DefaultComponent},
  {path: 'getting-started', component: GettingStartedPage},
  {path: 'animations', redirectTo: 'guides/animations'},
  {path: 'positioning', redirectTo: 'guides/positioning'},
  {path: 'guides',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'animations'},
      {path: 'animations', component: AnimationsPage },
      {path: 'i18n', component: I18nPage },
      {path: 'positioning', component: PositioningPage},
    ]
  },
  {path: 'components', pathMatch: 'full', redirectTo: 'components/accordion'},
  {path: 'components/accordion', children: ACCORDION_ROUTES},
  {path: 'components/alert', children: ALERT_ROUTES},
  {path: 'components/buttons', children: BUTTONS_ROUTES},
  {path: 'components/carousel', children: CAROUSEL_ROUTES},
  {path: 'components/collapse', children: COLLAPSE_ROUTES},
  {path: 'components/datepicker', children: DATEPICKER_ROUTES},
  {path: 'components/dropdown', children: DROPDOWN_ROUTES},
  {path: 'components/modal', children: MODAL_ROUTES},
  {path: 'components/nav', children: NAV_ROUTES},
  {path: 'components/pagination', children: PAGINATION_ROUTES},
  {path: 'components/popover', children: POPOVER_ROUTES},
  {path: 'components/progressbar', children: PROGRESSBAR_ROUTES},
  {path: 'components/rating', children: RATING_ROUTES},
  {path: 'components/table', children: TABLE_ROUTES},
  {path: 'components/tabset', children: TABSET_ROUTES},
  {path: 'components/toast', children: TOAST_ROUTES},
  {path: 'components/timepicker', children: TIMEPICKER_ROUTES},
  {path: 'components/tooltip', children: TOOLTIP_ROUTES},
  {path: 'components/typeahead', children: TYPEAHEAD_ROUTES},
  {path: '**', redirectTo: 'home'}
];

export const routing: ModuleWithProviders<RouterModule> =
    RouterModule.forRoot(routes, { enableTracing: false, useHash: true, scrollPositionRestoration: 'enabled' });
