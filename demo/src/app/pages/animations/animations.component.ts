import {Component} from '@angular/core';
import {Snippet} from '../../shared/code/snippet';
import {versions} from '../../../environments/versions';

@Component({templateUrl: './animations.component.html'})
export class AnimationsPage {
  bsVersion = versions.bootstrap;

  config = Snippet({
    lang: 'typescript',
    code: `
    import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';

    export class AppComponent {
      constructor(ngbConfig: NgbConfig) {
        ngbConfig.animation = false;
      }
    }
    `
  });

  widgetConfig = Snippet({
    lang: 'typescript',
    code: `
    import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

    export class AppComponent {
      constructor(ngbAlertConfig: NgbAlertConfig) {
        ngbAlertConfig.animation = false;
      }
    }
    `
  });

  widget = Snippet({
    lang: 'html',
    code: `
    <ngb-alert [animation]="false">
      No animation for this alert
    </ngb-alert>
    `
  });

  alert = Snippet({lang: 'html', code: `<ngb-alert *ngIf="isOpen" (closed)="isOpen = false">I'm open</ngb-alert>`});

  recipeAccordion = Snippet({
    lang: 'html',
    code: `
    <ngb-accordion (shown)="onPanelShown($event)" (hidden)="onPanelHidden($event)">
      <ngb-panel id="one" (shown)="onPanelShown('one')" (hidden)="onPanelHidden('one')">
        ...
      </ngb-panel>
    </ngb-accordion>
    `
  });

  recipeAlertTpl = Snippet({
    lang: 'html',
    code: `
    <ngb-alert #a *ngIf="visible" (closed)="visible = false">...</ngb-alert>
    <button (click)="a.close()">Close</button>
    `
  });

  recipeAlertCmp = Snippet({
    lang: 'typescript',
    code: `
    alert.close().subscribe(() => {});
    `
  });

  recipeCarousel = Snippet({
    lang: 'html',
    code: `
    <ngb-carousel (slide)="onSlideEvent($event)" (slid)="onSlideEvent($event)">
      <ng-template ngbSlide id="one" (slid)="onSignleSlideEvent($event)">
      ...
      </ng-template>
    </ngb-carousel>
    `
  });

  recipeCollapse = Snippet({
    lang: 'html',
    code: `
    <div #c="ngbCollapse" [(ngbCollapse)]="isCollapsed"
        (shown)="onShown()" (hidden)="onHidden()">
      ...
    </div>
    <button (click)="c.toggle()">Toggle</button>
    `
  });

  recipeModal = Snippet({
    lang: 'typescript',
    code: `
    const modalRef = this.modalService.open(...);

    modalRef.closed.subscribe(result => {});
    modalRef.dismissed.subscribe(reason => {});
    modalRef.shown.subscribe(() => {});
    modalRef.hidden.subscribe(() => {});
    `
  });

  recipeNav = Snippet({
    lang: 'html',
    code: `
    <ul ngbNav class="nav-tabs" (shown)="onShown($event)" (hidden)="onHidden($event)">
      <li ngbNavItem="one" (shown)="onShown('one')" (hidden)="onHidden('one')">
        <a ngbNavLink>...</a>
        <ng-template ngbNavContent>...</ng-template>
      </li>
    </ul>
    `
  });

  recipePopoverTooltip = Snippet({
    lang: 'html',
    code: `
    <button ngbPopover="popover!" (shown)="onShown()" (hidden)="onHidden()"></button>
    <button ngbTooltip="tooltip!" (shown)="onShown()" (hidden)="onHidden()"></button>
    `
  });

  recipeToastTpl = Snippet({
    lang: 'html',
    code: `
    <ngb-toast *ngIf="visible" header="Hello" [autohide]="false"
        (shown)="onShown()" (hidden)="onHidden(); visible = false">
    ...
    </ngb-toast>
    `
  });

  recipeToastCmp = Snippet({
    lang: 'typescript',
    code: `
    toast.show().subscribe(() => {});
    toast.hide().subscribe(() => {});
    `
  });
}
